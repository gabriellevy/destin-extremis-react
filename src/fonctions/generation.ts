import {getRandomEnumValue} from "./random";
import {Carriere} from "../types/metiers/Metier";
import {Coterie} from "../types/Coterie";
import {getSexeOppose, Perso, Sexe} from "../types/perso/Perso";
import {anneesToJours, calculeAge} from "../types/Date";
import {lieuParDefaut} from "../types/lieux/Lieu";
import {viceVertuDeBase} from "../types/BonMauvais";
import {PNJ} from "../types/perso/PNJ";
import {getNom, getPrenom} from "./noms";
import {NiveauRelationAmoureuse} from "../types/perso/Amour";
import {metiersEnum, metiersObjs} from "../donnees/metiers";

export function getCarriereAleatoire(): Carriere {
    let metierAleatoire: metiersEnum = getRandomEnumValue(metiersEnum);

    return {
        metier: metiersObjs[metierAleatoire],
        duree: 0,
        competence: 1,
        actif: true,
        nbDeTestsFaits: 0,
    };
}

export function genererPNJAmourableDePerso(perso: Perso):PNJ {
    const sexe: Sexe = getSexeOppose(perso.sexe);
    const minAge: number = calculeAge(perso)/2 + 9 ;
    const maxAge: number = calculeAge(perso)*2 - 18 ;
    const age = minAge + Math.random() * (maxAge - minAge);
    const dateNaissance: number = perso.date - anneesToJours(age);
    return genererPNJ(sexe, dateNaissance);
}

export function genererPNJ(sexe:Sexe, dateNaissance: number):PNJ {
    const cot: Coterie = getCoterieAleatoireSauf([]);
    const carriere: Carriere = getCarriereAleatoire();
    const nom: string = getNom(cot, sexe);
    const prenom: string = getPrenom(cot, sexe);
    return {
        prenom: prenom,
        nom: nom,
        sexe: Sexe.male,
        dateNaissance: dateNaissance,
        lieu: lieuParDefaut,
        coterie: cot,
        carriere: carriere,
        viceVertu:  viceVertuDeBase(),
        mort: false,
        niveauRelationAmoureuse: NiveauRelationAmoureuse.rien,
    }
}

export function getCoterieAleatoireSauf(coteriesExclues: Coterie[]): Coterie {
    coteriesExclues.push(Coterie.aucune);
    let coterieAleatoire: Coterie = getRandomEnumValue(Coterie);
    while (coteriesExclues.includes(coterieAleatoire)) {
        coterieAleatoire = getRandomEnumValue(Coterie);
    }
    return coterieAleatoire;
}
