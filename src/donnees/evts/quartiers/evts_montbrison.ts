import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {getValeurVice, Vice} from "../../../types/ViceVertu";
import {aUneActiviteATempsPlein, commencerCarriere} from "../../../fonctions/metiers/metiersUtils";
import {getAge} from "../../../types/Date";
import {auBordDuneZone} from "../../../types/lieux/Lieu";
import {MetiersEnum} from "../../metiers";

export const evts_montbrison: GroupeEvts = {
    evts: [
        {
            id: "evts_montbrison",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Votre goût de l'aventure et la fascination de la Zone vous pousse à devenir Stalker. `
                const resTestVol:ResultatTest = testComp(perso, TypeCompetence.volonte, -10);
                const resTestOrien:ResultatTest = testComp(perso, TypeCompetence.orientation, -10);
                texte += resTestVol.resume;
                texte += resTestOrien.resume;
                if (!resTestVol.reussi) {
                    texte += `Mais dès votre première tentative vos nerfs lâchent et vous revenez vite sur vos pas. `;
                } else if (!resTestOrien.reussi) {
                    texte += "L'environnement changeant est trop pour vos sens et votre capacité à vous repérer. "
                    + "Vous vous perdez rapidement et votre coéquipier est obligé de vous raccompagner. "
                    + "Il vous dit clairement qu'il est hors de question de vous prendre comme coéquipier pour une autre mission. Vous n'avez tout simplement pas les capacités. ";
                } else {
                    texte += commencerCarriere(perso, MetiersEnum.stalker, "Zone de " + perso.lieu.quartier);
                    texte += `Dans votre expédition d'entrainement aux abords de la Zone vous vous révélez extrêmement coriace et débrouillard. Un stalker né. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && getValeurVice(perso, Vice.aventureux) >= 1
                && getAge(perso) >= 16
                && auBordDuneZone(perso),
        },
    ],
    probaParDefaut: 10, // > à la moyenne car localisés à un quartier
};