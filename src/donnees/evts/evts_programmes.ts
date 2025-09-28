import {Perso} from "../../types/perso/Perso";
import {anneesToJours} from "../../types/Date";
import {EvtProgramme} from "../../types/Evt";

// ces énévements sont déclenchés à date fixe indépendamment des actions du héros
// pour exister ils doivent être ajouté à la comp 'evtsProgrammes' du perso au début
export const evts_programmes: EvtProgramme[] = [
    {
        date: anneesToJours(2512),
        evt: {
            id: "evts_programmes bidon",
            description: async (_perso: Perso): Promise<string> => {
                return "TODO : ajouter des événements historiques"
            },
            conditions: (_perso: Perso): boolean => true,
        },
    },
];
