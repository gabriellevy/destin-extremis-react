import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVice, Vice} from "../../../types/ViceVertu";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {modifierReputationAupresPopulation} from "../../../fonctions/perso/Reputation";

export const evts_television: GroupeEvts = {
    evts: [
        {
            id: "evts_television1 grosse colère",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous regardez la télévision quand vous devenez furieux à force de voir et d'entendre des monceaux de stupidité et de mensonges qui s'y déversent toute la journée. <br/>";
                texte += "Vous finissez par appeler les chaînes, les présentateurs, les standard, pour les corriger et les insulter. <br/>";
                const resTestEv:ResultatTest = testComp(perso, TypeCompetence.eloquence, -30);
                texte += resTestEv.resume;
                if (resTestEv.reussi) {
                    texte += "Vous êtes si convaincant et terrifiant que vous causez des violences, des crises, des larmes, et même la tentative de suice d'un présentatrice culinaire dont vous avez critiqué les recettes. <br/>";
                    texte += "Vous finissez par vous voir vous-même à la télé tant votre crise de fureur vous a rendu célèbre. <br/>";
                    texte += modifierReputationAupresPopulation(perso, -5, 15);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => getValeurVice(perso, Vice.colerique) >= 2,
            nbJoursEntreOccurences: 300,
        },
    ],
    probaParDefaut: 0.004,
}