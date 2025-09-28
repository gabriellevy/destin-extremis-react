import {GroupeEvts} from "../../../types/Evt";
import {NiveauIA, Perso} from "../../../types/perso/Perso";
import {aUneCarriere} from "../../../fonctions/metiers/metiersUtils";
import {appelLeChatParaphrase} from "../../../fonctions/le_chat";
import {getValeurVertu, Vertu} from "../../../types/ViceVertu";
import {actuellementDrogueA, seDroguer} from "../../../fonctions/sante/drogues_fc";
import {droguesEnum} from "../../sante/drogues";
import {ResultatTest} from "../../../types/LancerDe";
import {testVertu} from "../../../fonctions/des";
import {getAge} from "../../../types/Date";

export const evts_cigarette: GroupeEvts = {
    evts: [
        {
            id: "evts_cigarette1 jeunesse",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                const resTestSobre:ResultatTest = testVertu(perso, {typeBon: Vertu.sobre, bonusMalus: 20});
                texte += resTestSobre.resume;
                if (!resTestSobre.reussi) {
                    texte += "Influencé par vos amis vous commencez à fumer pour la première fois.";
                    texte += seDroguer(perso, droguesEnum.cigarette);
                } else {
                    texte += "Plusieurs de vos amis fument mais vous ne vous laissez pas tenter.";
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => aUneCarriere(perso) && !actuellementDrogueA(perso, droguesEnum.cigarette)
                && getValeurVertu(perso, Vertu.sobre) < 1 && getAge(perso) < 17,
        },
    ],
    probaParDefaut: 2,
};