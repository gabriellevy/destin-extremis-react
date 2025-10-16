import {GroupeEvts} from "../../../types/Evt";
import {NiveauIA, Perso} from "../../../types/perso/Perso";
import {aUneCarriere} from "../../../fonctions/metiers/metiersUtils";
import {appelLeChatParaphrase} from "../../../fonctions/le_chat";
import {getValeurVertu, getValeurVice, Vertu, Vice} from "../../../types/ViceVertu";
import {actuellementDrogueA, seDroguer} from "../../../fonctions/sante/drogues_fc";
import {droguesEnum} from "../../sante/drogues";

export const evts_drogue: GroupeEvts = {
    evts: [
        {
            id: "evts_drogue1 stimulant",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Pour tenir la compétition vous décidez de vous droguer à la vissopressine. Vous serez plus performant c'est sûr.";
                texte += seDroguer(perso, droguesEnum.vissopressine);

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => aUneCarriere(perso) && !actuellementDrogueA(perso, droguesEnum.vissopressine)
                && getValeurVertu(perso, Vertu.sobre) < 0 && getValeurVice(perso, Vice.envieux) > 0,
            repetable: true,
        },
    ],
    probaParDefaut: 3,
};