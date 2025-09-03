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
        if (carriere.actif && carriere.metier.nom !== metiersEnum.non_travailleur) trouve = true;
    });
    if (perso.bilanLycee.phaseActuelle !== PhaseLycee.finie && perso.bilanLycee.coterieActuelle !== undefined) {
        // considéré comme travaillant tant qu'il n'a pas fini son lycée
        trouve = true;
    }
    return trouve;
}

export function getCarriereActive(perso: Perso): Carriere|undefined {
    const carrieres = Array.from(perso.carrieres.values());
    for(let i = 0; i < carrieres.length; i++) {
        const carriere = carrieres[i];
        if (carriere.actif) return carriere;
    }
    return undefined;
}
export function suitUneCarriereDe(perso: Perso, metier: metiersEnum): boolean {
    let trouve: boolean = false;
    Array.from(perso.carrieres.values()).forEach(carriere => {
        if (carriere.metier.nom === metier && carriere.actif) {
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
export function neSuitPasUneCarriereDe(perso: Perso, metier: metiersEnum): boolean {
    let trouve: boolean = false;
    Array.from(perso.carrieres.values()).forEach(carriere => {
        if (carriere.metier.nom === metier && carriere.actif) {
            trouve = true;
        }
    });
    return !trouve;
}

/**
 *
 * @param perso
 * @param metier si undefined signifie n'importe quelle carrière
 * @param dureeEnAnnees
 */
export function suitUneCarriereDepuis(perso: Perso, metier: metiersEnum|undefined, dureeEnAnnees: number): boolean {
    let trouve: boolean = false;
    if (perso.carrieres) {
        Array.from(perso.carrieres.values()).forEach(carriere => {
            if ((metier === undefined || carriere.metier.nom === metier)
                && carriere.actif && carriere.duree >= anneesToJours(dureeEnAnnees)) {
                trouve = true;
            }
        });
    }
    return trouve;
}

export function getCompetenceMetier(perso: Perso, metier: metiersEnum): number {
    let competence: number = 0;
    if (perso.carrieres) {
        Array.from(perso.carrieres.values()).forEach(carriere => {
            if (carriere.metier.nom === metier) {
                competence = carriere.competence;
            }
        });
    }
    return competence;
}
export function augmenterNbDeTestsFaitsMetier(perso: Perso, metier: metiersEnum): string {
    const carriere: Carriere | undefined = perso.carrieres.get(metier);
    if (carriere !== undefined) {
        const nbTests: number = carriere.nbDeTestsFaits + 1;
        carriere.nbDeTestsFaits = nbTests;
        if (seuils.includes(nbTests)) {
            // gain d'un point de compétence :
            carriere.competence += 1;
            return "+1 en " + metier.toString() + ". ";
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

export function commencerCarriere(perso: Perso, metier: metiersEnum, groupeLieu: string): void {
    // passer les autres en inactives
    Array.from(perso.carrieres.values()).forEach((carriere: Carriere) => {
        carriere.actif = false;
    });

    // récupérer valeurs de ce métier si déjà pratiqué par le passé
    let nivCompetence: number = 25;
    let nbDeTestsFaits: number = 0;
    const cetteCarriereDejaFaite: Carriere|undefined = perso.carrieres.get(metier);
    if (cetteCarriereDejaFaite) {
        // réactiver
        cetteCarriereDejaFaite.actif = true;
    } else {
        // commencer la nouvelle
        perso.carrieres.set(metier, {
            metier: metiersObjs[metier],
            groupeLieu: groupeLieu,
            duree: 0,
            competence: nivCompetence,
            actif: true,
            nbDeTestsFaits : nbDeTestsFaits,
        });
    }
}

export function arreterCarriere(perso: Perso, metier: metiersEnum): void {
    // passer en inactif
    const carriere =  perso.carrieres.get(metier);
    if (carriere) {
        carriere.actif = false;
    }
}

/**
 * devient meilleur à un métier mais sans commencer la carrière pour autant
 */
export function plusUnEnCompetenceMetier(perso: Perso, metier: metiersEnum): void {
    // récupérer valeurs de ce métier si déjà pratiqué par le passé
    let nivCompetence: number = 25; // niveau débutant
    let nbDeTestsFaits: number = 0;
    let metierActif = false;
    let duree = 0;
    const cetteCarriereDejaFaite: Carriere|undefined = perso.carrieres.get(metier);
    if (cetteCarriereDejaFaite) {
        nivCompetence = cetteCarriereDejaFaite.competence;
        nbDeTestsFaits = cetteCarriereDejaFaite.nbDeTestsFaits;
        metierActif = cetteCarriereDejaFaite.actif;
        duree = cetteCarriereDejaFaite.duree;
    }
    // commencer la nouvelle
    perso.carrieres.set(metier, {
        metier: metiersObjs[metier],
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
export function compatibiliteCarriere(perso: Perso, metier: Metier): number {

    let compatibilite: number = 0;
    metier.vicesCompatibles.forEach((vice: Vices)=> {
        compatibilite += getValeurVice(perso, vice);
    })
    metier.vertusCompatibles.forEach((vertu: Vertus)=> {
        compatibilite += getValeurVertu(perso, vertu);
    })
    console.log("Mathieu compatibilite : " + compatibilite);

    return compatibilite;
}



