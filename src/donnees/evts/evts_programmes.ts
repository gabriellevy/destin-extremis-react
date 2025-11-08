import {Perso, PersoHisto} from "../../types/perso/Perso";
import {anneesToJours, getAge} from "../../types/Date";
import {EvtProgramme} from "../../types/Evt";

// ces énévements sont déclenchés à date fixe indépendamment des actions du héros
// pour exister ils doivent être ajouté à la comp 'evtsProgrammes' du perso au début
export const evts_programmes: EvtProgramme[] = [
    {
        date: (perso:Perso):boolean => (perso.date-perso.dateNaissance) % 360 === 0,
        evt: {
            id: "anniversaire",
            description: async (perso: PersoHisto): Promise<string> => {
                perso.pointDestin += 1;
                let texte =  "Vous avez " + getAge(perso) + " ans. Joyeux anniversaire ! <br/><b>+1 point de destin</b>"

                texte += "Vous ne pouvez plus retourner en arrière.";
                perso.sauvegardes = [];

                return texte;
            },
            conditions: (_perso: Perso): boolean => true,
            nbJoursEntreOccurences: 1,
        },
    },
    {
        date: (perso:Perso):boolean => perso.date === anneesToJours(92), // préciser mois et jour précis
        evt: {
            id: "evts_programmes émeutes anarchistes des chaos",
            description: async (_perso: Perso): Promise<string> => {
                return "TODO : émeutes anarchistes des chaos"
            },
            conditions: (_perso: Perso): boolean => true,
        },
    },
];
