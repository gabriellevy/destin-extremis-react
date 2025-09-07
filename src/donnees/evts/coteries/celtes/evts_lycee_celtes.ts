import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/perso/Perso";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {
    ajouterVertuVal,
    ajouterViceVal,
    getValeurVertu,
    getValeurVice,
    Vertus,
    Vices
} from "../../../../types/ViceVertu";
import {majReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {Maitrise} from "../../../maitrise";
import {Coterie} from "../../../../types/Coterie";
import {ajouterMaitrise} from "../../../../fonctions/perso/maitrise";

export const evts_lycee_celtes: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_celtes1_intimidation",
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
                if (getValeurVice(perso, Vices.orgueilleux) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, Vices.orgueilleux, 1);
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes2_festin",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Tout bon celte doit être un hôte de qualité. Savoir discourir, accueillir, cuisiner, servir, sont des compétences qui attirent respect et amitié.<br/> ";
                    const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.eloquence, bonusMalus: 0});
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += "Vous savez accueillir et divertir. <br/>";
                        // se fait connaître dans le coin
                        texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                    } else {
                        texte += "Vous êtes encore maladroit pour un hôte mais on pardonne beaucoup à un étudiant. <br/>";
                    }
                // gloutonnerie
                if (getValeurVice(perso, Vices.gourmand) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, Vices.gourmand, 1);
                    }
                }
                if (Math.random() >= 0.9) {
                    texte += "Vous prenez goût à la cuisine et y devenez très doué. ";
                    texte += ajouterMaitrise(perso, Maitrise.cuisine);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes3_brimades",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Les violences et brimades entre étudiants sont courantes chez les celtes, quand elles ne sont pas encouragées. <br/> ";
                    const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 0});
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += "Vous savez très rapidement rendre coup pour coup. Bientôt ce sont les autres élèves qui ont peur de vous. <br/>";
                        // se fait connaître dans le coin
                        texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                    } else {
                        texte += "Vous êtes régulièrement humilié, voire tabassé par vos camarades. <br/>";
                    }

                if (getValeurVice(perso, Vices.colerique) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, Vices.colerique, 1);
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes4_duels",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Le combat au corps à corps est une tradition vivace chez les celtes. Le but n'est que rarement de tuer, mais de prouver son habileté et son courage. <br/> ";
                    const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.armeCaC, bonusMalus: 0});
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += "Vous savez très rapidement rendre coup pour coup avec courage et habileté. Même les professeurs commencent à respecter votre force. <br/>";
                        // se fait connaître dans le coin
                        texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                    } else {
                        // TODO : échec critique : blessure
                        texte += "Vous avez beaucoup à apprendre pour avoir le niveau et cesser de vous faire rosser. <br/>";
                    }

                if (getValeurVertu(perso, Vertus.valeureux) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterVertuVal(perso, Vertus.valeureux, 1);
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes5_physique",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "La forme physique est primordiale pour les celtes. Les entrainements en athlétisme sont nombreux et éreintants. <br/> ";
                    const resTestMvt:ResultatTest = testComp(perso, {comp: TypeCompetence.mouvement, bonusMalus: 0});
                    texte += resTestMvt.resume;
                    const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 0});
                    texte += resTestEnd.resume;
                    if (resTestMvt.reussi && resTestEnd.reussi) {
                        texte += "Agile et endurant, vous faites l'admiration de tous. <br/>";
                        // se fait connaître dans le coin
                        texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                    }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes6_foret",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Survivre dans la nature est signe de forte volonté et de débrouillardise pour les celtes, ainsi qu'un lien à conserver avec les anciens dieux. "
                        + "De rudes randonnées et nuits à la belle étoile sont donc au programme de leur lycée et vous n'y échapperez pas.<br/> ";
                    const resTestSur:ResultatTest = testComp(perso, {comp: TypeCompetence.survie, bonusMalus: 0});
                    texte += resTestSur.resume;
                    if (resTestSur.reussi) {
                        texte += "Vous semblez être naturellement chez vous en pleine forêt, même dans la nuit la plus noire, à la grande surprise de vos professeurs. <br/>";
                        // se fait connaître dans le coin
                        texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                    }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes7_poesie",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Votre professeur de diction tente de vous inculquer les bases du discours et de la poésie.<br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.eloquence, bonusMalus: -10});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous avez un talent de poète inné qui impressionne fortement votre professeur. <br/>";
                    texte += ajouterMaitrise(perso, Maitrise.poesie);
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};