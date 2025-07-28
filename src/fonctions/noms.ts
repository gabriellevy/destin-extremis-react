import {Coterie} from "../types/Coterie";
import {
    ROMAINS_cognomen_M2,
    ROMAINS_NOMS_F,
    ROMAINS_NOMS_M1,
    ROMAINS_PRENOMS_F,
    ROMAINS_PRENOMS_M
} from "../donnees/coteries/romains/noms_romains";
import {getRandomInt0} from "./random";
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
import {
    ESPRIT_DE_LA_NATURE_F,
    ESPRIT_DE_LA_NATURE_M1, ESPRIT_DE_LA_NATURE_M2
} from "../donnees/coteries/esprit_de_la_nature/noms_esprit_de_la_nature";

export function getNom(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_NOMS_M1[getRandomInt0(ROMAINS_NOMS_M1.length)] :
            ROMAINS_NOMS_F[getRandomInt0(ROMAINS_NOMS_F.length)];
        case Coterie.celtes:
        case Coterie.demokratos:
        case Coterie.skavens:
        case Coterie.templiers:
        case Coterie.ogres:
        case Coterie.esprit_de_la_nature:
            return ""; // les celtes n'ont pas de noms de familles
        // noms français :
        case Coterie.aucune:
        case Coterie.jacobins:
        case Coterie.libertins:
        case Coterie.lumieres:
        case Coterie.culte_du_plaisir:
        case Coterie.esthetes:
            return NOM[getRandomInt0(NOM.length)];
        // noms anglais
        case Coterie.performeurs:
        case Coterie.transhumanistes:
            return NOM_ANGL[getRandomInt0(NOM_ANGL.length)];
        case Coterie.schweizer:
            return NOM_SCHWEIZER[getRandomInt0(NOM_SCHWEIZER.length)];
    }
    return "pas de noms pour cette coterie : " + coterie;
}

export function getPrenom(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_PRENOMS_M[getRandomInt0(ROMAINS_PRENOMS_M.length)] :
            ROMAINS_PRENOMS_F[getRandomInt0(ROMAINS_PRENOMS_F.length)];
        case Coterie.celtes : return sexe === Sexe.male ?
            CELTES_PRENOMS_M[getRandomInt0(CELTES_PRENOMS_M.length)] :
            CELTES_PRENOMS_F[getRandomInt0(CELTES_PRENOMS_F.length)];
        case Coterie.demokratos : return sexe === Sexe.male ?
            DEMOKRATOS_PRENOMS_M[getRandomInt0(DEMOKRATOS_PRENOMS_M.length)] :
            DEMOKRATOS_PRENOMS_F[getRandomInt0(DEMOKRATOS_PRENOMS_F.length)];
        case Coterie.skavens: return PARTIE_NOM_SKAVEN1[getRandomInt0(PARTIE_NOM_SKAVEN1.length)]
            + PARTIE_NOM_SKAVEN2[getRandomInt0(PARTIE_NOM_SKAVEN3.length)]
            + PARTIE_NOM_SKAVEN3[getRandomInt0(PARTIE_NOM_SKAVEN3.length)];
        case Coterie.esprit_de_la_nature: return sexe === Sexe.male ?
            ESPRIT_DE_LA_NATURE_M1[getRandomInt0(ESPRIT_DE_LA_NATURE_M1.length)]
            + ESPRIT_DE_LA_NATURE_M2[getRandomInt0(ESPRIT_DE_LA_NATURE_M2.length)] :
            ESPRIT_DE_LA_NATURE_F[getRandomInt0(ESPRIT_DE_LA_NATURE_F.length)];
        // prénoms français :
        case Coterie.aucune:
        case Coterie.jacobins:
        case Coterie.templiers:
        case Coterie.lumieres:
        case Coterie.libertins:
        case Coterie.culte_du_plaisir:
        case Coterie.esthetes:
            return sexe === Sexe.male ?
                PRENOM_M[getRandomInt0(PRENOM_M.length)] :
                PRENOM_F[getRandomInt0(PRENOM_F.length)];
        case Coterie.performeurs:
            return sexe === Sexe.male ?
                PRENOM_ANGL70_M[getRandomInt0(PRENOM_ANGL70_M.length)] :
                PRENOM_ANGL70_F[getRandomInt0(PRENOM_ANGL70_F.length)];
        case Coterie.transhumanistes:
            return sexe === Sexe.male ?
                PRENOM_ANGL90_M[getRandomInt0(PRENOM_ANGL90_M.length)] :
                PRENOM_ANGL90_F[getRandomInt0(PRENOM_ANGL90_F.length)];
        case Coterie.schweizer:
            return sexe === Sexe.male ?
                PRENOM_SCHWEIZER_M[getRandomInt0(PRENOM_SCHWEIZER_M.length)] :
                PRENOM_SCHWEIZER_F[getRandomInt0(PRENOM_SCHWEIZER_F.length)];
        case Coterie.ogres:
            return (NOM_OGRE1[getRandomInt0(NOM_OGRE1.length)]
                + NOM_OGRE2[getRandomInt0(NOM_OGRE2.length)]
                + NOM_OGRE3[getRandomInt0(NOM_OGRE3.length)]);
    }
    return "pas de prénoms pour cette coterie : " + coterie;
}

export function getCognomen(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_cognomen_M2[getRandomInt0(ROMAINS_cognomen_M2.length)] :
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
        case Coterie.lumieres:
        case Coterie.schweizer:
        case Coterie.culte_du_plaisir:
        case Coterie.esthetes:
            return getPrenom(coterie, sexe)
                + " " + getNom(coterie, sexe)
    }
    return "pas de patronyme pour cette coterie : " + coterie;
}