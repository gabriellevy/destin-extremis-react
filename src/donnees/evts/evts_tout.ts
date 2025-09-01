import {GroupeEvts} from "../../types/Evt";
import {NiveauIA, Perso} from "../../types/perso/Perso";
import {appelLeChat, NiveauInfosPerso} from "../../fonctions/le_chat";

export const evts_tout: GroupeEvts = {
    evts: [
        {
            id: "evts_tout1",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                if (perso.niveauIA !== NiveauIA.desactive) {
                    // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                    texte = await appelLeChat(
                        perso,
                        "Racontez la vie courante du personnage principal.",
                        NiveauInfosPerso.plus_quartier_de_vie);
                } else {
                    texte += "Le petit train train quotidien. ";
                }
                return texte;
            },
            conditions: (): boolean => true,
        },
        ],
    probaParDefaut: 1,
}