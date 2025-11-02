import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {getValeurVice, Vice} from "../../../types/ViceVertu";
import {
    aUneActiviteATempsPlein,
    commencerCarriere,
    compatibiliteCarriere
} from "../../../fonctions/metiers/metiersUtils";
import {getAge} from "../../../types/Date";
import {auBordDuneRuche} from "../../../types/lieux/Lieu";
import {MetiersEnum, metiersObjs} from "../../metiers";

export const evts_pilleur_de_ruches: GroupeEvts = {
    evts: [
        {
            id: "evts_pilleur_de_ruches",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Sans travail et tout prêt d'une ancienne ruche désaffectée, "
                    + "vous décidez de rejoindre une expédition de pilleurs. `;
                const resTestVol:ResultatTest = testComp(perso, TypeCompetence.volonte, 10);
                const resTestOrien:ResultatTest = testComp(perso, TypeCompetence.orientation, -10);
                texte += resTestVol.resume;
                texte += resTestOrien.resume;
                if (!resTestVol.reussi) {
                    texte += `Mais dès que vous vous retrouvez sous terre dans le noir le plus complet vos nerfs lâchent et vous revenez vite sur vos pas. `;
                } else if (!resTestOrien.reussi) {
                    texte += "Le labyrinthe de la ruche, son obscurité et ses niveaux multiples sont trop complexes pour vous. "
                        + "Vous vous perdez rapidement et votre coéquipier est obligé de vous raccompagner. "
                        + "Il vous dit clairement qu'il est hors de question de vous prendre comme coéquipier pour une autre mission. Vous n'avez tout simplement pas les capacités. ";
                } else {
                    texte += commencerCarriere(perso, MetiersEnum.pilleur_de_ruche, "Ruche de " + perso.lieu.quartier, false);
                    texte += `Dès votre première expédition dans les sous-niveaux des souterrains de la ruche "
                    + " vous vous révélez extrêmement coriace et débrouillard. Vous allez pouvoir devenir pillard à plein temps. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.pilleur_de_ruche]) >= 0
                && (getValeurVice(perso, Vice.aventureux) >= 1
                || getValeurVice(perso, Vice.cupide) >= 1 && getValeurVice(perso, Vice.aventureux) >= 0)
                && getAge(perso) >= 16
                && auBordDuneRuche(perso),
        },
    ],
    probaParDefaut: 0.1, // > à la moyenne car localisés à un quartier
};