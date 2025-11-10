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
                let texte =  "Vous avez " + getAge(perso) + " ans. Joyeux anniversaire ! <br/><b>+1 point de destin</b><br/>"

                texte += "Vous ne pouvez plus retourner en arrière.";
                perso.sauvegardes = [];

                return texte;
            },
            conditions: (_perso: Perso): boolean => true,
            nbJoursEntreOccurences: 1,
        },
    },
    {
        date: (perso:Perso):boolean => perso.date === anneesToJours(92) + 7*30 + 12, // 12 floréal 92
        evt: {
            id: "evts_programmes émeutes anarchistes des chaos j1",
            description: async (_perso: Perso): Promise<string> => {
                return "Les tensions dans le quartier Montreuil des Khaos tournent à l'explosion : "
                + "Les khaos revendiquent l'anarchisme, l'autogouvernement et la sécession de la ville. <br/>"
                + "Il n'y a aucune chance que le consul accepte cela. La répression va être terrible une fois encore. <br/>"
            },
            conditions: (_perso: Perso): boolean => true,
        },
    },
    {
        date: (perso:Perso):boolean => perso.date === anneesToJours(92) + 7*30 + 13, // 13 floréal 92
        evt: {
            id: "evts_programmes émeutes anarchistes des chaos j2",
            description: async (_perso: Perso): Promise<string> => {
                return "Une explosion a eu lieu aux abords du quartier Montreuil.<br/> "
                + "Tout semble accuser les Khaos. La police et les robots du consul prennent ça comme un signal. "
                + "La répression commence. "
                + "Des cars pleins de CRS en armure de combat sont envoyés sur palce. "
                + "L'émeute s'enflamme quelques heures plus tard et les blessés su multiplient. "

            },
            conditions: (_perso: Perso): boolean => true,
        },
    },
];
