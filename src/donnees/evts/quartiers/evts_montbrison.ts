import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {getValeurVice, Vices} from "../../../types/BonMauvais";
import {aUneCarriere, commencerCarriere} from "../../../fonctions/metiers/metiersUtils";
import {calculeAge} from "../../../types/Date";
import {auBordDuneZone} from "../../../types/lieux/Lieu";
import {metiersEnum} from "../../metiers";

export const evts_montbrison: GroupeEvts = {
    evts: [
        {
            id: "evts_montbrison",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Votre goût de l'aventure et la fascination de la Zone vous pousse à devenir Stalker. `
                const resTestVol:ResultatTest = testComp(perso, {comp: TypeCompetence.volonte, bonusMalus: -10});
                const resTestOrien:ResultatTest = testComp(perso, {comp: TypeCompetence.orientation, bonusMalus: -10});
                texte += resTestVol.resume;
                texte += resTestOrien.resume;
                if (!resTestVol.reussi) {
                    texte += `Mais dès votre première tentative vos nerfs lâchent et vous revenez vite sur vos pas. `;
                } else if (!resTestOrien.reussi) {
                    texte += "L'environnement changeant est trop pour vos sens et votre capacité à vous repérer. "
                    + "Vous vous perdez rapidement et votre coéquipier est obligé de vous raccompagner. "
                    + "Il vous dit clairement qu'il est hors de question de vous prendre comme coéquipier pour une autre mission. Vous n'avez tout simplement pas les capacités. ";
                } else {
                    commencerCarriere(perso, metiersEnum.stalker, "Zone de " + perso.lieu.quartier);
                    texte += `Dans votre expédition d'entrainement aux abords de la Zone vous vous révélez extrêmement coriace et débrouillard. Un stalker né. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && getValeurVice(perso, Vices.aventureux) >= 1
                && calculeAge(perso) >= 16
                && auBordDuneZone(perso),
        },
    ],
    probaParDefaut: 10, // > à la moyenne car localisés à un quartier
};