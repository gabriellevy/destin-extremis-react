import {NiveauIA, Perso} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {appelLeChat, NiveauInfosPerso} from "../../../fonctions/le_chat";
import {aUneCarriere, getCarriereActive} from "../../../fonctions/metiers/metiersUtils";

export const evts_generiques_carriere: GroupeEvts = {
    evts: [
        {
            id: "evts_generiques_carriere1",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                if (perso.niveauIA !== NiveauIA.desactive) {
                    // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                    texte = await appelLeChat(
                        perso,
                        "Racontez une journée de travail comme " + getCarriereActive(perso)?.metier.intitule + " du personnage principal.",
                        NiveauInfosPerso.prenom);
                } else {
                    texte += "Le petit train train quotidien. ";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => aUneCarriere(perso),
        },
    ],
    probaParDefaut: 2,
}