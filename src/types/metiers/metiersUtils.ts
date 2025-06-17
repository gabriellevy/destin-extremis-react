import {Carriere, metiersEnum, metiersObjs} from "./metiers";
import {Perso} from "../Perso";
import {seuils} from "../comps/Comps";
import {anneesToJours} from "../Date";

// seulement les carrières actives
export function aUneCarriere(perso: Perso): boolean {
    let trouve: boolean = false;
    Array.from(perso.carrieres.values()).forEach((carriere: Carriere) => {
        if (carriere.actif) trouve = true;
    });
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

export function suitUneCarriereDepuis(perso: Perso, metier: metiersEnum, dureeEnAnnees: number): boolean {
    let trouve: boolean = false;
    if (perso.carrieres) {
        Array.from(perso.carrieres.values()).forEach(carriere => {
            if (carriere.metier.nom === metier && carriere.actif && carriere.duree >= anneesToJours(dureeEnAnnees)) {
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

export function commencerCarriere(perso: Perso, metier: metiersEnum, groupeLieu: string): void {
    // passer les autres en inactives
    Array.from(perso.carrieres.values()).forEach((carriere: Carriere) => {
        carriere.actif = false;
    });

    // récupérer valeurs de ce métier si déjà pratiqué par le passé
    let nivCompetence: number = 1;
    let nbDeTestsFaits: number = 0;
    const cetteCarriereDejaFaite: Carriere|undefined = perso.carrieres.get(metier);
    if (cetteCarriereDejaFaite) {
        nivCompetence = cetteCarriereDejaFaite.competence;
        nbDeTestsFaits = cetteCarriereDejaFaite.nbDeTestsFaits;
    }
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



