import {GroupeEvts} from "../../../../types/Evt";
import {NiveauIA, Perso} from "../../../../types/perso/Perso";
import {Coterie} from "../../../../types/Coterie";
import {ajouterVertuVal, ajouterViceVal, Vertu, Vice} from "../../../../types/ViceVertu";
import {appelLeChatParaphrase} from "../../../../fonctions/le_chat";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {augmenterCompetenceMetier} from "../../../../fonctions/metiers/metiersUtils";
import {metiersEnum} from "../../../metiers";
import {majReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {ajouterMaitrise} from "../../../../fonctions/perso/maitrise";
import {Maitrise} from "../../../maitrise";

export const evts_lycee_demokratos: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_demokratos1",
            description: async (perso: Perso): Promise<string> => {
                let texte = "La vie sociale sur le campus des Démokratos est vibrante et explosive. Les concerts, fêtes, pièces de théâtre, s'enchainent sans interruption.";
                if (Math.random() >.95) {
                    texte += ajouterViceVal(perso, Vice.gourmand, 1);
                }
                if (Math.random() >.8) {
                    texte += ajouterVertuVal(perso, Vertu.sociable, 1);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.demokratos,
        },
        {
            id: "evts_lycee_demokratos2",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Les potins et surtout la politique et les débats sont omniprésents et très importants sur le campus. "
                + "Vous participez à un journal étudiant. ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.ragot, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += augmenterCompetenceMetier(perso, metiersEnum.journaliste, 1);
                    if (resTest.critical) {
                        texte += "Vous êtes très doué et vous faites remarquer.";
                        texte += majReputationDansQuartier(perso, Quartier.vanves, 1,1);
                    }
                } else {
                    texte += "Mais vous n'êtes pas très doué...";
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.demokratos,
        },
        {
            id: "evts_lycee_demokratos3",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Le débat, en particulier politique, est à la base des Démokratos. ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.eloquence, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    if (resTest.critical) {
                        texte += "Vous êtes redoutable dans ces exercices et vite connu dans tout le campus. ";
                        texte += majReputationDansQuartier(perso, Quartier.vanves, 1,1);
                    }
                } else {
                    if (resTest.critical) {
                        texte += "Vous êtes extrêmement mauvais au point que les gens viennent de loin pour se moquer de vous lors des exercices publics. ";
                        texte += majReputationDansQuartier(perso, Quartier.vanves, -1,1);
                    }
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.demokratos,
        },
        {
            id: "evts_lycee_demokratos4",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "L'art, surtout le théâtre, est très prisé chez les démokratos. "
                + "Vous le pratiquez régulièrement. ";
                const resTestEloq:ResultatTest = testComp(perso, {comp: TypeCompetence.eloquence, bonusMalus: 20});
                const resTestTromp:ResultatTest = testComp(perso, {comp: TypeCompetence.tromperie, bonusMalus: 20});
                const resTestChar:ResultatTest = testComp(perso, {comp: TypeCompetence.charme, bonusMalus: 20});
                texte += resTestEloq.resume;
                texte += resTestTromp.resume;
                texte += resTestChar.resume;
                if (resTestEloq.reussi && resTestTromp.reussi && resTestChar.reussi) {
                        texte += "Vos talents multiples vous font remarquer. ";
                        texte += majReputationDansQuartier(perso, Quartier.vanves, 1,1);
                } else {
                    if (resTestEloq.critical && resTestTromp.critical && resTestChar.critical) {
                        texte += "Les gens viennent de loin pour rire de votre complète inaptitude à jouer. ";
                        texte += majReputationDansQuartier(perso, Quartier.vanves, -1,1);
                    }
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.demokratos,
        },
        {
            id: "evts_lycee_demokratos5",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Tous démokratos doit être capable de faire de la politique et de diriger ses concitoyens si il est tiré au sort pour occuper ce rôle. "
                + "Vous alternez donc entre chef et exécutant régulièrement pour vous y habituer. ";
                const resTestComdt:ResultatTest = testComp(perso, {comp: TypeCompetence.eloquence, bonusMalus: 20});
                texte += resTestComdt.resume;
                if (resTestComdt.reussi) {
                    texte += "Vous êtes doué pour commander. ";
                } else {
                    texte += "Vous êtes plus doué pour obéir que pour commander. ";
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                if (Math.random() >.9) {
                    texte += ajouterVertuVal(perso, Vertu.discipline, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.demokratos,
        },
        {
            id: "evts_lycee_demokratos6",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Tous les élèves doivent apprendre à composer des discours. ";
                const resTestIntuition:ResultatTest = testComp(perso, {comp: TypeCompetence.intuition, bonusMalus: 20});
                const resTestEloquence:ResultatTest = testComp(perso, {comp: TypeCompetence.eloquence, bonusMalus: 20});
                texte += resTestIntuition.resume;
                if (resTestEloquence.critical && resTestEloquence.reussi) {
                    texte += "Les professeurs vous font faire des récitations publiques de vos excellents discours. ";
                    texte += majReputationDansQuartier(perso, Quartier.vanves, 1,1);
                }
                if (resTestIntuition.critical && resTestIntuition.reussi) {
                    texte += "Vous vous découvrez un talent dans les discours poétiques plein d'images puissantes. ";
                    texte += ajouterMaitrise(perso, Maitrise.poesie);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                if (Math.random() >.9) {
                    texte += ajouterVertuVal(perso, Vertu.discipline, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.demokratos,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};