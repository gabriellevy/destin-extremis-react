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

export const evts_lycee_skavens: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_skavens1_tromperie",
            description: (perso: Perso): string => {
                let texte:string = "Le lycée skaven met votre intégrité à rude épreuve. Les élèves, volent, mentent, trichent, et les professeurs, au lieu de punir, récompensent. "
                    + "Ils insistent sur le fait que c'est ainsi qu'on s'en sort et que c'est la bonne voie vers le succès.<br/>";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.tromperie, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous vous en accommodez cependant très vite. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                    if (getValeurVice(perso, TypeVice.trompeur) < 2) {
                        if (Math.random() >= 0.9) {
                            texte += ajouterViceVal(perso, TypeVice.trompeur, 1);
                        }
                    }
                } else {
                    texte += "Vous sentez qu'il est de votre devoir de vous intégrer, mais vous avez beaucoup de mal et êtes régulièrement victimes des manigances de vos camarades. <br/>";
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens2_festin",
            description: (perso: Perso): string => {
                let texte:string = "Tout bon celte doit être un hôte de qualité. Savoir discourir, accueillir, cuisiner, servir, sont des compétences qui attirent respect et amitié.<br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.discours, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous savez accueillir et divertir. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
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
                    texte += ajouterMaitrise(perso, Maitrise.cuisine);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens3_brimades",
            description: (perso: Perso): string => {
                let texte:string = "Les violences et brimades entre étudiants sont courantes chez les celtes, quand elles ne sont pas encouragées. <br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous savez très rapidement rendre coup pour coup. Bientôt ce sont les autres élèves qui ont peur de vous. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
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
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens4_duels",
            description: (perso: Perso): string => {
                let texte:string = "Le combat au corps à corps est une tradition vivace chez les celtes. Le but n'est que rarement de tuer, mais de prouver son habileté et son courage. <br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.armeCaC, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous savez très rapidement rendre coup pour coup avec courage et habileté. Même les professeurs commencent à respecter votre force. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
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
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens5_physique",
            description: (perso: Perso): string => {
                let texte:string = "La forme physique est primordiale pour les celtes. Les entrainements en athlétisme sont nombreux et éreintants. <br/> ";
                const resTestMvt:ResultatTest = testComp(perso, {comp: TypeCompetence.mouvement, bonusMalus: 0});
                texte += resTestMvt.resume;
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 0});
                texte += resTestEnd.resume;
                if (resTestMvt.reussi && resTestEnd.reussi) {
                    texte += "Agile et endurant, vous faites l'admiration de tous. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens6_foret",
            description: (perso: Perso): string => {
                let texte:string = "Survivre dans la nature est signe de forte volonté et de débrouillardise pour les celtes, ainsi qu'un lien à conserver avec les anciens dieux. "
                    + "De rudes randonnées et nuits à la belle étoile sont donc au programme de leur lycée et vous n'y échapperez pas.<br/> ";
                const resTestSur:ResultatTest = testComp(perso, {comp: TypeCompetence.survie, bonusMalus: 0});
                texte += resTestSur.resume;
                if (resTestSur.reussi) {
                    texte += "Vous semblez être naturellement chez vous en pleine forêt, même dans la nuit la plus noire, à la grande surprise de vos professeurs. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens7_poesie",
            description: (perso: Perso): string => {
                let texte:string = "Votre professeur de diction tente de vous inculquer les bases du discours et de la poésie.<br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.discours, bonusMalus: -10});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous avez un talent de poète inné qui impressionne fortement votre professeur. <br/>";
                    texte += ajouterMaitrise(perso, Maitrise.poesie);
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car localisés à un quartier et une phase
};