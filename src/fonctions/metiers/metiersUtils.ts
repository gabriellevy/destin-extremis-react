import {Carriere, Metier} from "../../types/metiers/Metier";
import {Perso, PersoCommon} from "../../types/perso/Perso";
import {seuils} from "../../types/perso/comps/Comps";
import {anneesToJours} from "../../types/Date";
import {metiersEnum, metiersObjs} from "../../donnees/metiers";
import {PhaseLycee} from "../../types/lycee/StadeUniversite";
import {getRandomEnumValue} from "../random";
import {getValeurVertu, getValeurVice, Vertus, Vices} from "../../types/ViceVertu";

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

    // pas de carrière active : lui ajouter nune carrière de chômeur ou réactiver une ancienne :
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
            carriere.competence += 1;
            return "+1 en " + metiersEnum.toString() + ". ";
        }
    }
    return "";
}

/**
 * métier aléatoire en fonction des caracs du perso et en particulier de sa coterie
 */
export function metierAleatoire(_perso: PersoCommon): metiersEnum {
    const probasMetiers = new Map<metiersEnum, number>();

    Object.entries(metiersObjs).forEach(([_key, metier]) => {
        // Ajouter une entrée dans la Map avec nom comme clé et proba comme valeur
        probasMetiers.set(metier.nom, metier.proba);
    });

    // TODO : moduler selon lieu
    // TODO : moduler selon coterie (virer métiers interdits etc)
    // const cot: Coterie = _perso.coterie;

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

export function commencerCarriereAleatoire(perso: Perso): void {
    let metier: metiersEnum = metierAleatoire(perso);
    commencerCarriere(perso, metier, "");
}

export function commencerCarriere(perso: Perso, metiersEnum: metiersEnum, groupeLieu: string): void {
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
}

export function arreterCarriere(perso: Perso, metiersEnum: metiersEnum): void {
    // passer en inactif
    const carriere =  perso.carrieres.find((carriere: Carriere) => carriere.metier === metiersEnum);
    if (carriere) {
        carriere.actif = false;
    }
}

/**
 * devient meilleur à un métier mais sans commencer la carrière pour autant
 */
export function plusUnEnCompetenceMetier(perso: Perso, metiersEnum: metiersEnum): void {
    // récupérer valeurs de ce métier si déjà pratiqué par le passé
    let nivCompetence: number = 25; // niveau débutant
    let nbDeTestsFaits: number = 0;
    let metierActif = false;
    let duree = 0;
    const cetteCarriereDejaFaite: Carriere|undefined = perso.carrieres.find((carriere: Carriere) => carriere.metier === metiersEnum);
    if (cetteCarriereDejaFaite) {
        nivCompetence = cetteCarriereDejaFaite.competence;
        nbDeTestsFaits = cetteCarriereDejaFaite.nbDeTestsFaits;
        metierActif = cetteCarriereDejaFaite.actif;
        duree = cetteCarriereDejaFaite.duree;
    }
    // commencer la nouvelle
    perso.carrieres.push({
        metier: metiersEnum,
        intitule: metiersObjs.toString(),
        duree: duree,
        competence: nivCompetence + 1,
        actif: metierActif,
        nbDeTestsFaits : nbDeTestsFaits,
    });
}

/**
 * return une valeur environ de -5 à +5 qui définit la compatibilité du personnage avec ce métier
 * en fonction de ses vices et vertus
 * cad essentielleemnt si il veut exercer ce métier, indépendament de ses compéteces réelles
 */
export function compatibiliteCarriere(perso: Perso, metier: Metier|undefined): number {
    if (!metier) {
        metier = metiersObjs[metiersEnum.non_travailleur];
    }
    let compatibilite: number = 0;
    metier.vicesCompatibles.forEach((vice: Vices)=> {
        compatibilite += getValeurVice(perso, vice);
    })
    metier.vertusCompatibles.forEach((vertu: Vertus)=> {
        compatibilite += getValeurVertu(perso, vertu);
    })

    return compatibilite;
}



