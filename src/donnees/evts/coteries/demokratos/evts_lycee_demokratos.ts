import {GroupeEvts} from "../../../../types/Evt";
import {NiveauIA, Perso} from "../../../../types/perso/Perso";
import {Coterie} from "../../../../types/Coterie";
import {ajouterVertuVal, ajouterViceVal, Vertu, Vice} from "../../../../types/ViceVertu";
import {appelLeChatParaphrase} from "../../../../fonctions/le_chat";

export const evts_lycee_demokratos: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_demokratos1",
            description: async (perso: Perso): Promise<string> => {
                let texte = "La vie sociale sur le campus des Démokratos est vibrante et explosive. Les concerts, fêtes, pièces de théâtre, s'enchainent sans interruption.";

                if (Math.random() >.95) {
                    texte += ajouterViceVal(perso, Vice.gourmand, 1);
                }
                if (Math.random() >.8) {
                    texte += ajouterVertuVal(perso, Vertu.sociable, 1);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.demokratos,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};