import {GroupeEvts} from "../../types/Evt";
import {Perso} from "../../types/perso/Perso";
import {enumMois} from "../dates/calendrier";

export const evts_calendrier: GroupeEvts = {
    evts: [
            {
                id: "calendrier1",
                description: async (_perso: Perso): Promise<string> => {
                     return "Aujourd'hui est le jour du nouvel an."},
                conditions: (perso:Perso):boolean => perso.mois === enumMois.vendemiaire,
                image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/hexenstag.jpeg",
            },
            {
                id: "calendrier3",
                description: async (_perso: Perso): Promise<string> => {
                    return "Aujourd'hui est le premier jour de l'été ! "},
                conditions: (perso:Perso):boolean => perso.mois === enumMois.pluviose && perso.jourDuMois === 18,
            },
            {
                id: "calendrier4",
                description: async (_perso: Perso): Promise<string> => {
                    return  "Aujourd'hui c'est jour de folie en l'honneur de Ranald ! " +
                    "Les maîtres deviennent serviteurs et les serviteurs maîtres. Chacun porte selon ses moyens un masque pour dissimuler son identité et ses folies." +
                    "L'ivresse, les danses, les costumes colorés et les farces anodines sont de mises."},
                conditions: (perso:Perso):boolean => perso.mois === enumMois.ventose && perso.jourDuMois === 10,
            },
            {
                id: "calendrier5",
                description: async (_perso: Perso): Promise<string> => "Aujourd'hui c'est le jour du solsctice d'été, le plus long jour de l'année ! ",
                conditions: (perso:Perso):boolean => perso.mois === enumMois.floreal,
            },
    ],
    probaParDefaut: 10,
};