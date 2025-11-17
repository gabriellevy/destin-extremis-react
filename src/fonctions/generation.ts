import {getRandomEnumValue} from "./aleatoire";
import {Carriere} from "../types/metiers/Metier";
import {Coterie, COTERIES_NON_DEVELOPPEES} from "../types/Coterie";
import {getSexeOppose, Perso, Sexe} from "../types/perso/Perso";
import {anneesToJours, getAge} from "../types/Date";
import {lieuAleatoire} from "../types/lieux/Lieu";
import {viceVertuDeBase} from "../types/ViceVertu";
import {PNJ} from "../types/perso/PNJ";
import {getNom, getPrenom} from "./noms";
import {NiveauRelationAmoureuse} from "../types/perso/Amour";
import {MetiersEnum} from "../donnees/metiers";

export function getCarriereAleatoire(): Carriere {
    let metierAleatoire: MetiersEnum = getRandomEnumValue(MetiersEnum);

    return {
        metier: metierAleatoire,
        intitule: metierAleatoire.toString(),
        duree: 0,
        competence: 25,
        actif: true,
        nbDeTestsFaits: 0,
    };
}

export function genererPNJAmourableDePerso(perso: Perso):PNJ {
    const sexe: Sexe = getSexeOppose(perso.sexe);
    const minAge: number = getAge(perso)/2 + 9 ;
    const maxAge: number = getAge(perso)*2 - 18 ;
    const age = minAge + Math.random() * (maxAge - minAge);
    const dateNaissance: number = perso.date - anneesToJours(age);
    return genererPNJ(perso, sexe, dateNaissance, undefined);
}

export function genererPNJ(perso: Perso, sexe:Sexe, dateNaissance: number|undefined, coterie:Coterie|undefined):PNJ {
    const cot: Coterie = coterie ?? getCoterieAleatoireSauf([]);
    const carriere: Carriere = getCarriereAleatoire();
    const nom: string = getNom(cot, sexe);
    const prenom: string = getPrenom(cot, sexe);
    return {
        prenom: prenom,
        nom: nom,
        sexe: Sexe.male,
        dateNaissance: dateNaissance ?? 0,
        dateDerniereInteration: perso.date,
        lieu: lieuAleatoire(),
        coterie: cot,
        carriere: carriere,
        viceVertu:  viceVertuDeBase(),
        mort: false,
        niveauRelationAmoureuse: NiveauRelationAmoureuse.rien,
    }
}

/**
 * Renvoie une coterie saléatoires en excluant :
 * - les coteries précisées dans le paramètre 'coteriesExclues'
 * - les COTERIES_NON_DEVELOPPEES cad ayant trop peu d'éléments pour l'instant pour mériter d'être sélectionénes
 * @param coteriesExclues
 */
export function getCoterieAleatoireSauf(coteriesExclues: (Coterie|undefined)[]): Coterie {
    let coterieAleatoire: Coterie = getRandomEnumValue(Coterie);
    coteriesExclues = coteriesExclues.filter(cot => cot !== undefined)
    coteriesExclues = [
        ...COTERIES_NON_DEVELOPPEES,
        ...coteriesExclues
    ];
    while (coteriesExclues.includes(coterieAleatoire)) {
        coterieAleatoire = getRandomEnumValue(Coterie);
    }
    return coterieAleatoire;
}
