import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/perso/Perso";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {
    ajouterViceVal,
    getValeurMauvais,
    TypeMauvais
} from "../../../../types/BonMauvais";
import {majReputationDansQuartier} from "../../../../types/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {Coterie} from "../../../../types/Coterie";

export const evts_lycee_orks: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_orks1_TODO",
            description: async (perso: Perso): Promise<string> => {
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
                if (getValeurMauvais(perso, TypeMauvais.orgueilleux) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, TypeMauvais.orgueilleux, 1);
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};