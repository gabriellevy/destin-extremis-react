import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/Perso";
import {TypeCompetence} from "../../../../types/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {ajouterViceVal, getValeurVice, TypeVice} from "../../../../types/ViceVertu";
import {majReputationDansQuartier} from "../../../../types/Reputation";
import {Quartier} from "../../../geographie/quartiers";

export const evts_lycee_celtes: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_celtes1_intimidation",
            description: (perso: Perso): string => {
                let texte:string = "L'intimidation et la vantardise sont des traditions précieuses chez les celtes, qui peuvent se renvoyer des insultes des nuits entières pendant leurs banquets ou leurs duels rituels. "
                    + "Il va de soit que vous êtes formés, en particulier lors des soirées étudiantes. Vous apprenez aussi à vous peindre le visage de manière terrifiante.<br/> ";
                    const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 0});
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += "Vous êtes très doué à ce petit jeu. <br/>";
                        // se fait connaître dans le coin
                        texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                    } else {
                        texte += "Vous ne faites clairement pas le poids, mais vous êtes au lycée pour apprendre ! <br/>";
                    }
                // gloutonnerie
                if (getValeurVice(perso, TypeVice.orgueilleux) < 2) {
                    if (Math.random() >= 0.85) {
                        texte += ajouterViceVal(perso, TypeVice.orgueilleux, 1);
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.chatenay_malabry,
        },
    ],
    probaParDefaut: 9999999999999999999940, // >>> à la moyenne car localisés à un quartier et une phase
};