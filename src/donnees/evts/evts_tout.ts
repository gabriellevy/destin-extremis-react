import {GroupeEvts} from "../../types/Evt";
import {NiveauIA, Perso} from "../../types/perso/Perso";
import {appelLeChat, NiveauInfosPerso} from "../../App";

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
                        NiveauInfosPerso.plus_metier);
                } else {
                    texte += "Marienburg semble être l'endroit idéal pour les négociants en ce moment. "
                        +"Les affaires sont en plein essort et devraient encore aller croissantes dans les mois à venir. "
                        +"Le port fonctionne presque à pleine capacité et les commandes de céréales de Bordeleaux atteignent un niveau record. ";
                }
                return texte;
            },
            conditions: (): boolean => true,
        },
        ],
    probaParDefaut: 1,
}