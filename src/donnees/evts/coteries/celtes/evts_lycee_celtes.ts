import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/Perso";
import {TypeCompetence} from "../../../../types/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {
    ajouterVertuVal,
    ajouterViceVal,
    getValeurVertu,
    getValeurVice,
    TypeVertu,
    TypeVice
} from "../../../../types/ViceVertu";
import {majReputationDansQuartier} from "../../../../types/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {ajouterMaitrise, Maitrise} from "../../../maitrise";
import {Coterie} from "../../../../types/Coterie";

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
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, TypeVice.orgueilleux, 1);
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes2_festin",
            description: (perso: Perso): string => {
                let texte:string = "Tout bon celte doit être un hôte de qualité. Savoir discourir, accueillir, cuisiner, servir, sont des compétences qui attirent respect et amitié.<br/> ";
                    const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.discours, bonusMalus: 0});
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += "Vous savez accueillir et divertir. <br/>";
                        // se fait connaître dans le coin
                        texte += majReputationDansQuartier(perso, Quartier.chatenay_malabry, 1);
                    } else {
                        texte += "Vous êtes encore maladroit pour un hôte mais on pardonne beaucoup à un étudiant. <br/>";
                    }
                // gloutonnerie
                if (getValeurVice(perso, TypeVice.gourmand) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, TypeVice.gourmand, 1);
                    }
                }
                if (Math.random() >= 0.9) {
                    texte += "Vous prenez goût à la cuisine et y devenez très doué. ";
                    ajouterMaitrise(perso, Maitrise.cuisine);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes3_brimades",
            description: (perso: Perso): string => {
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

                if (getValeurVice(perso, TypeVice.colerique) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, TypeVice.colerique, 1);
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes4_duels",
            description: (perso: Perso): string => {
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

                if (getValeurVertu(perso, TypeVertu.valeureux) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterVertuVal(perso, TypeVertu.valeureux, 1);
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.celtes,
        },
        {
            id: "evts_lycee_celtes5_physique",
            description: (perso: Perso): string => {
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
    ],
    probaParDefaut: 40, // >>> à la moyenne car localisés à un quartier et une phase
};