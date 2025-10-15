import {Carriere, Metier} from "../../types/metiers/Metier";
import {Perso, PersoCommon} from "../../types/perso/Perso";
import {seuils, TypeCompetence} from "../../types/perso/comps/Comps";
import {anneesToJours} from "../../types/Date";
import {metiersEnum, metiersObjs} from "../../donnees/metiers";
import {PhaseLycee} from "../../types/lycee/StadeUniversite";
import {getRandomEnumValue} from "../random";
import {getValeurVertu, getValeurVice, Vertu, Vice} from "../../types/ViceVertu";
import {metierDetestesParCoterie, metierFavorisesParCoterie} from "../../donnees/coteries/affiniteMetier";
import {Coterie} from "../../types/Coterie";
import {auBordDuneRuche, auBordDuneZone} from "../../types/lieux/Lieu";
import {modifierStatut, statut1SuperieurOuEgalAStatut2} from "../perso/statut";
import {ResultatTest} from "../../types/LancerDe";
import {testComp, testVice} from "../des";
import {Possession} from "../../donnees/possessions/Possession";

// seulement les carrières actives
export function aUneCarriere(perso: Perso): boolean {
    let trouve: boolean = false;
    Array.from(perso.carrieres.values()).forEach((carriere: Carriere) => {
        if (carriere.actif && carriere.metier !== metiersEnum.non_travailleur) trouve = true;
    });
    if (perso.bilanLycee.phaseActuelle !== PhaseLycee.finie && perso.bilanLycee.coterieActuelle !== undefined) {
        // considéré comme travaillant tant qu'il n'a pas fini son lycée
        trouve = true;
    }
    return trouve;
}

export function getCarriere(perso: Perso, metiersEnum: metiersEnum): Carriere|undefined {
    const carrieres: Carriere[] = Array.from(perso.carrieres.values());
    for(let i = 0; i < carrieres.length; i++) {
        const carriere = carrieres[i];
        if (carriere.metier === metiersEnum) return carriere;
    }
    return undefined;
}

export function getCarriereActive(perso: Perso): Carriere {
    const carrieres: Carriere[] = Array.from(perso.carrieres.values());
    for(let i = 0; i < carrieres.length; i++) {
        const carriere = carrieres[i];
        if (carriere.actif) return carriere;
    }

    let carriereChomeur: Carriere|undefined = getCarriere(perso, metiersEnum.non_travailleur);
    if (carriereChomeur) {
        carriereChomeur.actif = true;
        return carriereChomeur;
    }

    // pas de carrière active : lui ajouter une carrière de chômeur ou réactiver une ancienne :
    const chomeur: Carriere = {
        metier: metiersEnum.non_travailleur,
        intitule: "chômeur",
        duree: 0,
        competence: 25,
        actif: true,
        nbDeTestsFaits: 0,
    };
    perso.carrieres.push(chomeur);
    return chomeur;
}
export function suitUneCarriereDe(perso: Perso, metiersEnum: metiersEnum): boolean {
    let trouve: boolean = false;
    Array.from(perso.carrieres.values()).forEach(carriere => {
        if (carriere.metier === metiersEnum && carriere.actif) {
            trouve = true;
        }
    });
    return trouve;
}

/**
 * renvoie true si le perso travaille actuellement sur cette carrière, donc si il la suit mais aussi qu'il n'est pas en vacances, malade, en voyage...
 */
export function travailleEnCeMomentComme(perso: Perso, metier: metiersEnum): boolean {
    return suitUneCarriereDe(perso, metier) && !perso.lieu.enVoyage;
}
export function neSuitPasUneCarriereDe(perso: Perso, metiersEnum: metiersEnum): boolean {
    let trouve: boolean = false;
    Array.from(perso.carrieres.values()).forEach(carriere => {
        if (carriere.metier === metiersEnum && carriere.actif) {
            trouve = true;
        }
    });
    return !trouve;
}

/**
 *
 * @param perso
 * @param metiersEnum si undefined signifie n'importe quelle carrière
 * @param dureeEnAnnees
 */
export function suitUneCarriereDepuis(perso: Perso, metiersEnum: metiersEnum|undefined, dureeEnAnnees: number): boolean {
    let trouve: boolean = false;
    if (perso.carrieres) {
        Array.from(perso.carrieres.values()).forEach(carriere => {
            if ((metiersEnum === undefined || carriere.metier === metiersEnum)
                && carriere.actif && carriere.duree >= anneesToJours(dureeEnAnnees)) {
                trouve = true;
            }
        });
    }
    return trouve;
}

export function getCompetenceMetier(perso: Perso, metiersEnum: metiersEnum): number {
    let competence: number = 0;
    if (perso.carrieres) {
        Array.from(perso.carrieres.values()).forEach(carriere => {
            if (carriere.metier === metiersEnum) {
                competence = carriere.competence;
            }
        });
    }
    return competence;
}
export function augmenterNbDeTestsFaitsMetier(perso: Perso, metiersEnum: metiersEnum): string {
    const carriere: Carriere | undefined = perso.carrieres.find((carriere: Carriere) => carriere.metier === metiersEnum);
    if (carriere !== undefined) {
        const nbTests: number = carriere.nbDeTestsFaits + 1;
        carriere.nbDeTestsFaits = nbTests;
        if (seuils.includes(nbTests)) {
            // gain d'un point de compétence :
            return augmenterCompetenceMetier(perso, metiersEnum, 1);
        }
    }
    return "";
}

export function augmenterCompetenceMetier(perso: Perso, metiersEnum: metiersEnum, val: number): string {
    const carriere: Carriere | undefined = perso.carrieres.find((carriere: Carriere) => carriere.metier === metiersEnum);
    if (carriere !== undefined) {
        carriere.competence += val;
        return "<b>" + (val> 0 ? "+" : "") + val + " " + metiersEnum.toString() + ".</b><br/>";
    } else {
        console.warn("Impossible de modifier la valeur de la compétence : " + metiersEnum + " de " + val);
    }
    return "Impossible de modifier la valeur de la compétence : " + metiersEnum + " de " + val;
}

/**
 * métier aléatoire en fonction des caracs du perso et en particulier de sa coterie
 */
export function metierAleatoire(perso: PersoCommon): metiersEnum {
    const probasMetiers = new Map<metiersEnum, number>();

    Object.entries(metiersObjs).forEach(([_key, metier]) => {
        // Ajouter une entrée dans la Map avec nom comme clé et proba comme valeur
        probasMetiers.set(metier.nom, metier.proba);
    });

    // moduler selon lieu
    if (auBordDuneRuche(perso)) {
        const proba = (probasMetiers.get(metiersEnum.pilleur_de_ruche) ?? 0) + 0.9;
        probasMetiers.set(metiersEnum.pilleur_de_ruche, proba);
    }
    if (auBordDuneZone(perso)) {
        const proba = (probasMetiers.get(metiersEnum.stalker) ?? 0) + 0.9;
        probasMetiers.set(metiersEnum.stalker, proba);
    }
    
    // ------- moduler selon coterie
    const cot: Coterie|undefined = perso.coterie;
    if (cot) {
        // -- virer métiers interdits
        metierDetestesParCoterie[cot].forEach((metierDeteste:metiersEnum) => {
            probasMetiers.delete(metierDeteste);
        })
        // -- métiers plus favorisésS
        metierFavorisesParCoterie[cot].forEach((metier:metiersEnum) => {
            const proba = probasMetiers.get(metier);
            if (proba) {
                probasMetiers.set(metier, proba * 3);
            }
        })
    }

    let completeProba: number = 0;
    probasMetiers.values().forEach( proba => {
            completeProba += proba;
    });
    let randomProba: number = Math.random() * completeProba;
    for (const [metier, proba] of Array.from(probasMetiers)) {
        randomProba -= proba;
        if (randomProba <= 0) {
            return metier;
        }
    }

    return getRandomEnumValue(metiersEnum);
}

export function commencerCarriereAleatoire(perso: Perso): string {
    let metier: metiersEnum = metierAleatoire(perso);
    return commencerCarriere(perso, metier, "");
}

export function commencerCarriere(perso: Perso, metiersEnum: metiersEnum, groupeLieu: string): string {
    if (getCarriereActive(perso).metier === metiersEnum) {
        console.error("Commence une carrière qu'il a déjà !! : ", metiersEnum);
    }
    // passer les autres en inactives
    Array.from(perso.carrieres.values()).forEach((carriere: Carriere) => {
        carriere.actif = false;
    });

    // récupérer valeurs de ce métier si déjà pratiqué par le passé
    let nivCompetence: number = 25;
    let nbDeTestsFaits: number = 0;
    const cetteCarriereDejaFaite: Carriere|undefined = perso.carrieres.find((carriere: Carriere) => carriere.metier === metiersEnum);
    if (cetteCarriereDejaFaite) {
        // réactiver
        cetteCarriereDejaFaite.actif = true;
    } else {
        // commencer la nouvelle
        perso.carrieres.push({
            metier: metiersEnum,
            intitule: metiersObjs + groupeLieu ? " à " + groupeLieu : "",
            groupeLieu: groupeLieu,
            duree: 0,
            competence: nivCompetence,
            actif: true,
            nbDeTestsFaits : nbDeTestsFaits,
        });
    }
    let texte = "Vous êtes maintenant " + metiersEnum.toString() + ".";
    if (!statut1SuperieurOuEgalAStatut2(perso.statut, metiersObjs[getCarriereActive(perso)?.metier].statutMax)) {
        // tentative de négociation
        const resultatTestMarch:ResultatTest = testComp(perso, {comp: TypeCompetence.marchandage, bonusMalus: 20});
        texte += resultatTestMarch.resume + "<br/>";
        if (resultatTestMarch.reussi) {
            texte += "Vous négociez très bien votre salaire de départ. ";
            if (resultatTestMarch.critical) {
                texte += modifierStatut(perso, 2);
            } else {
                texte += modifierStatut(perso, 1);
            }
        }
    }
    return texte;
}

export function arreterCarriere(perso: Perso, metiersEnum: metiersEnum, vire: boolean): string {
    // passer en inactif
    let texte: string = "";
    const carriere =  perso.carrieres.find((carriere: Carriere) => carriere.metier === metiersEnum);
    if (carriere) {
        carriere.actif = false;
    }
    if (vire) {
        texte += "Vous êtes viré.<br/>";
        const resTestColere:ResultatTest = testVice(perso, Vice.colerique, -30);
        texte += resTestColere.resume;
        if (resTestColere.reussi) {
            if (perso.possessions.includes(Possession.armes_lourdes)) {
                texte += "Avant de partir vous vous dites que c'est l'occasion ou jamais de leur faire comprendre à tous à quel point vous les haissez de tout votre coeur. "
                    + "Très tôt le matin vous passez devant les locaux et les faites sauter au lance-roquette. ";
            } else if (perso.possessions.includes(Possession.pistolet)) {
                texte += "Vous perdez la tête et vous mettez à abattre votrepatron et vos collègues les plus détestés. ";
                // TODO : police etc
            } else {
                texte += "Avant de partir vous faites un scandale et insultez tous ceux que vous détestez. Ce la est défoulant mais mauvais pour les indemnités de licenciement.";
                texte += modifierStatut(perso, -1);
            }
        }
    }
    return texte;
}

/**
 * devient meilleur à un métier mais sans commencer la carrière pour autant
 */
export function plusUnEnCompetenceMetier(perso: Perso, metiersEnum: metiersEnum): string {
    // récupérer valeurs de ce métier si déjà pratiqué par le passé
    let nivCompetence: number = 25; // niveau débutant
    let nbDeTestsFaits: number = 0;
    let metierActif = false;
    let duree = 0;
    const cetteCarriereDejaFaite: Carriere|undefined = perso.carrieres.find((carriere: Carriere) => carriere.metier === metiersEnum);
    if (cetteCarriereDejaFaite) {
        cetteCarriereDejaFaite.competence += 1;
    }
    // sinon commencer comme une nouvelle
    else {
        perso.carrieres.push({
            metier: metiersEnum,
            intitule: metiersObjs.toString(),
            duree: duree,
            competence: nivCompetence + 1,
            actif: metierActif,
            nbDeTestsFaits : nbDeTestsFaits,
        });
    }
    return "+1 en " + metiersEnum.toString();
}

/**
 * return une valeur environ de -5 à +5 qui définit la compatibilité du personnage avec ce métier
 * en fonction de ses vices et vertus
 * cad essentiellement si il veut exercer ce métier, indépendamment de ses compétences réelles
 */
export function compatibiliteCarriere(perso: Perso, metier: Metier|undefined): number {
    if (!metier) {
        metier = metiersObjs[metiersEnum.non_travailleur];
    }
    let compatibilite: number = 0;
    // selon vice & vertus
    metier.vicesCompatibles.forEach((vice: Vice)=> {
        compatibilite += getValeurVice(perso, vice);
    })
    metier.vertusCompatibles.forEach((vertu: Vertu)=> {
        compatibilite += getValeurVertu(perso, vertu);
    })
    // selon coterie
    if (perso.coterie) {
        if (metierFavorisesParCoterie[perso.coterie].includes(metier.nom)) {
            compatibilite += 4;
        } else if (metierDetestesParCoterie[perso.coterie].includes(metier.nom)) {
            compatibilite -= 4;
        }
    }

    return compatibilite;
}
