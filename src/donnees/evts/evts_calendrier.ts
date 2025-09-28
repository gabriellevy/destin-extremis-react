import {GroupeEvts} from "../../types/Evt";
import {Perso} from "../../types/perso/Perso";
import {enumMois} from "../dates/calendrier";

export const evts_calendrier: GroupeEvts = {
    evts: [
            {
                id: "calendrier solstice d'été",
                description: async (_perso: Perso): Promise<string> => "Aujourd'hui c'est le jour du solstice d'été, le plus long jour de l'année et le premier jour de l'été. ",
                conditions: (perso:Perso):boolean => perso.mois === enumMois.messidor && perso.jourDuMois === 1,
            },
    ],
    probaParDefaut: 5,
};