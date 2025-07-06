import {Coterie} from "../types/Coterie";
import {
    ROMAINS_cognomen_M2,
    ROMAINS_NOMS_F,
    ROMAINS_NOMS_M1,
    ROMAINS_PRENOMS_F,
    ROMAINS_PRENOMS_M
} from "../donnees/coteries/romains/noms_romains";
import {getRandomInt} from "./random";
import {Sexe} from "../types/Perso";
import {CELTES_PRENOMS_F, CELTES_PRENOMS_M} from "../donnees/coteries/celtes/noms_celtes";
import {PARTIE_NOM_SKAVEN1, PARTIE_NOM_SKAVEN2, PARTIE_NOM_SKAVEN3} from "../donnees/coteries/skavens/noms_skavens";
import {NOM, PRENOM_F, PRENOM_M} from "../donnees/coteries/aucune/noms_francais";

export function getNom(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_NOMS_M1[getRandomInt(ROMAINS_NOMS_M1.length)] :
            ROMAINS_NOMS_F[getRandomInt(ROMAINS_NOMS_F.length)];
        case Coterie.celtes:
        case Coterie.skavens:
            return ""; // les celtes n'ont pas de noms de familles
        // noms français :
        case Coterie.aucune:
        case Coterie.jacobins:
            return NOM[getRandomInt(NOM.length)];
    }
    return "pas de noms pour cette coterie : " + coterie;
}

export function getPrenom(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_PRENOMS_M[getRandomInt(ROMAINS_PRENOMS_M.length)] :
            ROMAINS_PRENOMS_F[getRandomInt(ROMAINS_PRENOMS_F.length)];
        case Coterie.celtes : return sexe === Sexe.male ?
            CELTES_PRENOMS_M[getRandomInt(CELTES_PRENOMS_M.length)] :
            CELTES_PRENOMS_F[getRandomInt(CELTES_PRENOMS_F.length)];
        case Coterie.skavens: return PARTIE_NOM_SKAVEN1[getRandomInt(PARTIE_NOM_SKAVEN1.length)]
            + PARTIE_NOM_SKAVEN2[getRandomInt(PARTIE_NOM_SKAVEN3.length)]
            + PARTIE_NOM_SKAVEN3[getRandomInt(PARTIE_NOM_SKAVEN3.length)];
        // noms français :
        case Coterie.aucune:
        case Coterie.jacobins:
        case Coterie.templiers:
            return sexe === Sexe.male ?
                PRENOM_M[getRandomInt(PRENOM_M.length)] :
                PRENOM_F[getRandomInt(PRENOM_F.length)];
    }
    return "pas de prénoms pour cette coterie : " + coterie;
}

export function getCognomen(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_cognomen_M2[getRandomInt(ROMAINS_cognomen_M2.length)] :
            '';
    }
    return "";// pas forcément de cognomen
}

export function getPatronyme(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return getPrenom(coterie, sexe)
                                    + " " + getNom(coterie, sexe)
                                        // cognomen romain
                                    + " " +  getCognomen(coterie, sexe);
        case Coterie.celtes :
        case Coterie.skavens :
        case Coterie.templiers:
            return getPrenom(coterie, sexe);

        case Coterie.aucune:
        case Coterie.jacobins:
            return getPrenom(coterie, sexe)
                + " " + getNom(coterie, sexe)
    }
    return "pas de patronyme pour cette coterie : " + coterie;
}