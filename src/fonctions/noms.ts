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
    PRENOM_ANGL70_F,
    PRENOM_ANGL70_M,
    PRENOM_ANGL90_F,
    PRENOM_ANGL90_M
} from "../donnees/coteries/transhumanistes/noms_anglais";
import {NOM_SCHWEIZER, PRENOM_SCHWEIZER_F, PRENOM_SCHWEIZER_M} from "../donnees/coteries/schweizer/noms_schweizer";
import {NOM_OGRE1, NOM_OGRE2, NOM_OGRE3} from "../donnees/coteries/ogres/noms_ogres";
import {
    ESPRIT_DE_LA_NATURE_F,
    ESPRIT_DE_LA_NATURE_M1,
    ESPRIT_DE_LA_NATURE_M2
} from "../donnees/coteries/esprit_de_la_nature/noms_esprit_de_la_nature";
import {TYRANIDES_F1, TYRANIDES_F2, TYRANIDES_M1, TYRANIDES_M2} from "../donnees/coteries/tyranides/noms_tyranides";
import {BASTETS_PRENOMS_F, BASTETS_PRENOMS_M} from "../donnees/coteries/bastets/noms_bastets";
import {
    CONQUISTADORS_NOMS,
    CONQUISTADORS_PRENOMS_F,
    CONQUISTADORS_PRENOMS_M
} from "../donnees/coteries/conquistadors/noms_conquistadors";
import {
    PRENOM_CHAOS_1,
    PRENOM_CHAOS_2,
    PRENOM_CHAOS_3,
    PRENOM_CHAOS_4,
    PRENOM_CHAOS_5,
    PRENOM_CHAOS_6,
    PRENOM_CHAOS_7,
    PRENOM_CHAOS_8
} from "../donnees/coteries/chaos/noms_chaos";
import {
    ACHERON_NOM1,
    ACHERON_NOM2,
    ACHERON_NOM3,
    ACHERON_PRENOMS_F,
    ACHERON_PRENOMS_M
} from "../donnees/coteries/acheron/noms_acheron";
import {ORKS_PRENOMS_F, ORKS_PRENOMS_M} from "../donnees/coteries/orks/donnees_orks";
import {
    ZAPO_NOMS_F,
    ZAPO_NOMS_M,
    ZAPO_PRENOMS_F_1,
    ZAPO_PRENOMS_F_2,
    ZAPO_PRENOMS_M_1,
    ZAPO_PRENOMS_M_2
} from "../donnees/coteries/zaporogues/noms_zaporogues";

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
        case Coterie.tyranides:
        case Coterie.bastets:
        case Coterie.chaos:
        case Coterie.acheron:
        case Coterie.orks:
            return ""; // les celtes (etc) n'ont pas de noms de familles
        // noms français :
        case Coterie.jacobins:
        case Coterie.libertins:
        case Coterie.lumieres:
        case Coterie.culte_du_plaisir:
        case Coterie.esthetes:
        case Coterie.cathares:
            return NOM[getRandomInt0(NOM.length)];
        // noms anglais
        case Coterie.performeurs:
        case Coterie.transhumanistes:
            return NOM_ANGL[getRandomInt0(NOM_ANGL.length)];
        case Coterie.schweizer:
            return NOM_SCHWEIZER[getRandomInt0(NOM_SCHWEIZER.length)];
        case Coterie.conquistador:
            return CONQUISTADORS_NOMS[getRandomInt0(CONQUISTADORS_NOMS.length)];
        case Coterie.zaporogues: return sexe === Sexe.male ?
            ZAPO_NOMS_M[getRandomInt0(ZAPO_NOMS_M.length)] :
            ZAPO_NOMS_F[getRandomInt0(ZAPO_NOMS_F.length)];
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
        case Coterie.bastets : return sexe === Sexe.male ?
            BASTETS_PRENOMS_M[getRandomInt0(BASTETS_PRENOMS_M.length)] :
            BASTETS_PRENOMS_F[getRandomInt0(BASTETS_PRENOMS_F.length)];
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
        case Coterie.tyranides: return sexe === Sexe.male ?
            TYRANIDES_M1[getRandomInt0(TYRANIDES_M1.length)]
            + TYRANIDES_M2[getRandomInt0(TYRANIDES_M2.length)] :
            TYRANIDES_F1[getRandomInt0(TYRANIDES_F1.length)]
            + TYRANIDES_F2[getRandomInt0(TYRANIDES_F2.length)];
        // prénoms français :
        case Coterie.jacobins:
        case Coterie.templiers:
        case Coterie.lumieres:
        case Coterie.libertins:
        case Coterie.culte_du_plaisir:
        case Coterie.esthetes:
        case Coterie.cathares:
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
        case Coterie.orks:
            return sexe === Sexe.male ?
                ORKS_PRENOMS_M[getRandomInt0(ORKS_PRENOMS_M.length)] :
                ORKS_PRENOMS_F[getRandomInt0(ORKS_PRENOMS_F.length)];
        case Coterie.ogres:
            return (NOM_OGRE1[getRandomInt0(NOM_OGRE1.length)]
                + NOM_OGRE2[getRandomInt0(NOM_OGRE2.length)]
                + NOM_OGRE3[getRandomInt0(NOM_OGRE3.length)]);
        case Coterie.conquistador:
            return sexe === Sexe.male ?
                CONQUISTADORS_PRENOMS_M[getRandomInt0(CONQUISTADORS_PRENOMS_M.length)] :
                CONQUISTADORS_PRENOMS_F[getRandomInt0(CONQUISTADORS_PRENOMS_F.length)];
        case Coterie.acheron:
            const txt1 = ACHERON_NOM1[getRandomInt0(ACHERON_NOM1.length)];
            const txt2 = ACHERON_NOM2[getRandomInt0(ACHERON_NOM2.length)];
            const txt3 = ACHERON_NOM3[getRandomInt0(ACHERON_NOM3.length)];
            return txt1 + txt2 + txt3
                + (sexe === Sexe.male ?
                ACHERON_PRENOMS_M[getRandomInt0(ACHERON_PRENOMS_M.length)] :
                ACHERON_PRENOMS_F[getRandomInt0(ACHERON_PRENOMS_F.length)]);
        case Coterie.chaos:
            const i = Math.floor(Math.random() * 10) + 1;
            if(i < 5){
                const txt5 = PRENOM_CHAOS_5[getRandomInt0(PRENOM_CHAOS_5.length)];
                const txt6 = PRENOM_CHAOS_6[getRandomInt0(PRENOM_CHAOS_6.length)];
                const txt7 = PRENOM_CHAOS_7[getRandomInt0(PRENOM_CHAOS_7.length)];
                const txt6_b = PRENOM_CHAOS_6[getRandomInt0(PRENOM_CHAOS_6.length)];
                const txt8 = PRENOM_CHAOS_8[getRandomInt0(PRENOM_CHAOS_8.length)];
                if(i < 2){
                    return txt5 + txt6 + txt7 + txt6_b + txt8;
                }else if(i < 4){
                    const txt7_b = PRENOM_CHAOS_7[getRandomInt0(PRENOM_CHAOS_7.length)];
                    const txt6_b = PRENOM_CHAOS_6[getRandomInt0(PRENOM_CHAOS_6.length)];
                    return txt5 + txt6 + txt7 + txt6_b + txt7_b + txt6_b + txt8;
                }else{
                    const txt7_b = PRENOM_CHAOS_7[getRandomInt0(PRENOM_CHAOS_7.length)];
                    const txt6_b = PRENOM_CHAOS_6[getRandomInt0(PRENOM_CHAOS_6.length)];
                    return txt6 + txt7 + txt6_b + txt7_b + txt6_b;
                }
            }else {
                const txt1 = PRENOM_CHAOS_1[getRandomInt0(PRENOM_CHAOS_1.length)];
                const txt2 = PRENOM_CHAOS_2[getRandomInt0(PRENOM_CHAOS_2.length)];
                const txt3 = PRENOM_CHAOS_3[getRandomInt0(PRENOM_CHAOS_3.length)];
                const txt4 = PRENOM_CHAOS_4[getRandomInt0(PRENOM_CHAOS_4.length)];
                if (i < 7) {
                    return txt1 + txt2 + txt3 + txt4;
                } else if (i < 9) {
                    const txt2_b = PRENOM_CHAOS_2[getRandomInt0(PRENOM_CHAOS_2.length)];
                    const txt3_b = PRENOM_CHAOS_3[getRandomInt0(PRENOM_CHAOS_3.length)];
                    return txt1 + txt2 + txt3 + txt2_b + txt3_b + txt4;
                } else {
                    const txt2_b = PRENOM_CHAOS_2[getRandomInt0(PRENOM_CHAOS_2.length)];
                    const txt3_b = PRENOM_CHAOS_3[getRandomInt0(PRENOM_CHAOS_3.length)];
                    const txt2_c = PRENOM_CHAOS_2[getRandomInt0(PRENOM_CHAOS_2.length)];
                    const txt3_c = PRENOM_CHAOS_3[getRandomInt0(PRENOM_CHAOS_3.length)];
                    return txt1 + txt2 + txt3 + txt2_b + txt3_b + txt2_c + txt3_c + txt4;
                }
            }
        case Coterie.zaporogues: return sexe === Sexe.male ?
            ZAPO_PRENOMS_M_1[getRandomInt0(ZAPO_PRENOMS_M_1.length)] :
            ZAPO_PRENOMS_F_1[getRandomInt0(ZAPO_PRENOMS_F_1.length)];
    }
    return "pas de prénoms pour cette coterie : " + coterie;
}

export function getCognomen(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains : return sexe === Sexe.male ?
            ROMAINS_cognomen_M2[getRandomInt0(ROMAINS_cognomen_M2.length)] :
            '';
        case Coterie.zaporogues: return sexe === Sexe.male ?
            ZAPO_PRENOMS_M_2[getRandomInt0(ZAPO_PRENOMS_M_2.length)] :
            ZAPO_PRENOMS_F_2[getRandomInt0(ZAPO_PRENOMS_F_2.length)];
    }
    return "";// pas forcément de cognomen
}

export function getPatronyme(coterie: Coterie, sexe: Sexe): string {
    switch (coterie) {
        case Coterie.romains :
        case Coterie.zaporogues :
            return getPrenom(coterie, sexe)
                                    + " " + getNom(coterie, sexe)
                                        // cognomen romain
                                    + " " +  getCognomen(coterie, sexe);
        case Coterie.celtes :
        case Coterie.skavens :
        case Coterie.templiers:
        case Coterie.demokratos:
        case Coterie.ogres:
        case Coterie.tyranides:
        case Coterie.bastets:
        case Coterie.acheron:
        case Coterie.orks:
            return getPrenom(coterie, sexe);

        case Coterie.jacobins:
        case Coterie.performeurs:
        case Coterie.transhumanistes:
        case Coterie.libertins:
        case Coterie.lumieres:
        case Coterie.schweizer:
        case Coterie.culte_du_plaisir:
        case Coterie.esthetes:
        case Coterie.conquistador:
        case Coterie.cathares:
            return getPrenom(coterie, sexe)
                + " " + getNom(coterie, sexe)
    }
    return "pas de patronyme pour cette coterie : " + coterie;
}