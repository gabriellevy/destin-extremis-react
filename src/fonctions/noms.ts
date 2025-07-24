import {Coterie} from "../types/Coterie";
import {
    ROMAINS_cognomen_M2,
    ROMAINS_NOMS_F,
    ROMAINS_NOMS_M1,
    ROMAINS_PRENOMS_F,
    ROMAINS_PRENOMS_M
} from "../donnees/coteries/romains/noms_romains";
import {getRandomInt} from "./random";
import {Sexe} from "../types/perso/Perso";
import {CELTES_PRENOMS_F, CELTES_PRENOMS_M} from "../donnees/coteries/celtes/noms_celtes";
import {PARTIE_NOM_SKAVEN1, PARTIE_NOM_SKAVEN2, PARTIE_NOM_SKAVEN3} from "../donnees/coteries/skavens/noms_skavens";
import {NOM, PRENOM_F, PRENOM_M} from "../donnees/coteries/aucune/noms_francais";
import {DEMOKRATOS_PRENOMS_F, DEMOKRATOS_PRENOMS_M} from "../donnees/coteries/demokratos/noms_demokratos";
import {
    NOM_ANGL,
    PRENOM_ANGL70_F, PRENOM_ANGL70_M,
    PRENOM_ANGL90_F,
    PRENOM_ANGL90_M
} from "../donnees/coteries/transhumanistes/noms_anglais";
import {NOM_SCHWEIZER, PRENOM_SCHWEIZER_F, PRENOM_SCHWEIZER_M} from "../donnees/coteries/schweizer/noms_schweizer";
import {NOM_OGRE1, NOM_OGRE2, NOM_OGRE3} from "../donnees/coteries/ogres/noms_ogres";

export function getNom(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_NOMS_M1[getRandomInt(ROMAINS_NOMS_M1.length)] :
            ROMAINS_NOMS_F[getRandomInt(ROMAINS_NOMS_F.length)];
        case Coterie.celtes:
        case Coterie.demokratos:
        case Coterie.skavens:
        case Coterie.templiers:
        case Coterie.ogres:
            return ""; // les celtes n'ont pas de noms de familles
        // noms français :
        case Coterie.aucune:
        case Coterie.jacobins:
        case Coterie.libertins:
            return NOM[getRandomInt(NOM.length)];
        case Coterie.performeurs:
        case Coterie.transhumanistes:
            return NOM_ANGL[getRandomInt(NOM_ANGL.length)];
        case Coterie.schweizer:
            return NOM_SCHWEIZER[getRandomInt(NOM_SCHWEIZER.length)];
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
        case Coterie.demokratos : return sexe === Sexe.male ?
            DEMOKRATOS_PRENOMS_M[getRandomInt(DEMOKRATOS_PRENOMS_M.length)] :
            DEMOKRATOS_PRENOMS_F[getRandomInt(DEMOKRATOS_PRENOMS_F.length)];
        case Coterie.skavens: return PARTIE_NOM_SKAVEN1[getRandomInt(PARTIE_NOM_SKAVEN1.length)]
            + PARTIE_NOM_SKAVEN2[getRandomInt(PARTIE_NOM_SKAVEN3.length)]
            + PARTIE_NOM_SKAVEN3[getRandomInt(PARTIE_NOM_SKAVEN3.length)];
        // noms français :
        case Coterie.aucune:
        case Coterie.jacobins:
        case Coterie.templiers:
        case Coterie.libertins:
            return sexe === Sexe.male ?
                PRENOM_M[getRandomInt(PRENOM_M.length)] :
                PRENOM_F[getRandomInt(PRENOM_F.length)];
        case Coterie.performeurs:
            return sexe === Sexe.male ?
                PRENOM_ANGL70_M[getRandomInt(PRENOM_ANGL70_M.length)] :
                PRENOM_ANGL70_F[getRandomInt(PRENOM_ANGL70_F.length)];
        case Coterie.transhumanistes:
            return sexe === Sexe.male ?
                PRENOM_ANGL90_M[getRandomInt(PRENOM_ANGL90_M.length)] :
                PRENOM_ANGL90_F[getRandomInt(PRENOM_ANGL90_F.length)];
        case Coterie.schweizer:
            return sexe === Sexe.male ?
                PRENOM_SCHWEIZER_M[getRandomInt(PRENOM_SCHWEIZER_M.length)] :
                PRENOM_SCHWEIZER_F[getRandomInt(PRENOM_SCHWEIZER_F.length)];
        case Coterie.ogres:
            return (NOM_OGRE1[getRandomInt(NOM_OGRE1.length)]
                + NOM_OGRE2[getRandomInt(NOM_OGRE2.length)]
                + NOM_OGRE3[getRandomInt(NOM_OGRE3.length)]);
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
        case Coterie.demokratos:
        case Coterie.ogres:
            return getPrenom(coterie, sexe);

        case Coterie.aucune:
        case Coterie.jacobins:
        case Coterie.performeurs:
        case Coterie.transhumanistes:
        case Coterie.libertins:
        case Coterie.schweizer:
            return getPrenom(coterie, sexe)
                + " " + getNom(coterie, sexe)
    }
    return "pas de patronyme pour cette coterie : " + coterie;
}