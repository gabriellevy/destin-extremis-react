import {Perso} from "../../types/perso/Perso";
import {anneesToJours} from "../../types/Date";

// ces énévements sont déclenchés à date fise indépendamment des actions du héros
// pour exister ils doivent être ajouté à la comp 'evtsProgrammes' du perso au début
export const evts_programmes: Map<number, (perso: Perso)=>string> = new Map([
    [anneesToJours(2512),
        (): string => {
            return "TODO : ajouter des événements historiques";
        },
    ],
]);
