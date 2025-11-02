import {NiveauIA, Perso, Sexe} from "../../../../types/perso/Perso";
import {GroupeEvts} from "../../../../types/Evt";
import {
    arreterCarriere,
    augmenterCompetenceMetier,
    aUneCarriere,
    commencerCarriere,
    compatibiliteCarriere,
    estAuLycee,
    getCarriereActive,
    plusUnEnCompetenceMetier,
    suitUneCarriereDe,
    suitUneCarriereDepuis
} from "../../../../fonctions/metiers/metiersUtils";
import {MetiersEnum, metiersObjs} from "../../../metiers";
import {getAge} from "../../../../types/Date";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testMetier, testVice} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {getReputationQuartier, modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {getQuartierDeCoterie} from "../../../coteries/Quartiers";
import {acquerir, perdre, possede} from "../../../../fonctions/possessions/possessions";
import {PossessionEnum} from "../../../possessions/Possession";
import {infligerBlessureAleatoire} from "../../../../fonctions/sante/sante";
import {Vice} from "../../../../types/ViceVertu";
import {Carriere} from "../../../../types/metiers/Metier";
import {modifierStatut, statut1SuperieurOuEgalAStatut2} from "../../../../fonctions/perso/statut";
import {appelLeChatParaphrase} from "../../../../fonctions/le_chat";
import {genererPNJ} from "../../../../fonctions/generation";
import {PNJ} from "../../../../types/perso/PNJ";

export const evts_brute_de_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_brute_de_lycee1_vocation",
            description: async (perso: Perso): Promise<string> => {
                let texte = '';
                texte += "Vous décidez de vous en prendre à d'autres jeunes plus faibles pour leur vider les poches. <br/>";
                texte += commencerCarriere(perso, MetiersEnum.brute_de_lycee, '', false);
                return texte;
            },
            conditions: (perso: Perso): boolean => estAuLycee(perso)
                && !aUneCarriere(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.brute_de_lycee]) > 1
                && getAge(perso) <= 18,
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee2_traintrain",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                let modifReputationAmplitude: number = 0;
                let modifReputationQualite: number = 0;

                const resTestI: ResultatTest = testComp(perso, TypeCompetence.intimidation, 20);
                texte += resTestI.resume;
                if (resTestI.reussi) {
                    texte += "Votre presence menaçante vous permet rapidement de dominer les petits intellos maigrichons du lycée. <br/>";
                    texte += plusUnEnCompetenceMetier(perso, MetiersEnum.brute_de_lycee);
                    modifReputationAmplitude += 1;
                    modifReputationQualite -= 1;
                } else {
                    texte += "L'intimidation ne suffit pas, un des caves se rebiffe. "
                        + "Il va falloir le corriger publiquement pour que ça se sache dans tout le campus. <br/>";
                    const resTestB: ResultatTest = testComp(perso, TypeCompetence.bagarre, 20);
                    texte += resTestB.resume;
                    if (resTestB.reussi) {
                        texte += "Vous lui démontez le portrait jusqu'à ce qu'il tombe à terre en pleurant. Tout le lycée va en entendre parler, c'est parfait. <br/>";
                        modifReputationAmplitude += 3;
                        modifReputationQualite -= 5;
                    } else {
                        texte += "Malheureusement le cave est coriace et résiste bien. "
                            + "Vous finissez par être séparés sans avoir rien obtenu. ";
                        modifReputationAmplitude += 1;
                        modifReputationQualite -= 1;
                    }
                }
                if (perso.bilanLycee.coterieActuelle) {
                    texte += modifierReputationDansQuartier(
                        perso,
                        getQuartierDeCoterie(perso.bilanLycee.coterieActuelle),
                        modifReputationQualite,
                        modifReputationAmplitude);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee),
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee3_cachette",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";

                const resTestDiscretion: ResultatTest = testComp(perso, TypeCompetence.discretion, 20);
                texte += resTestDiscretion.resume;
                if (resTestDiscretion.reussi) {
                    texte += "Vous connaissez le lycée comme votre poche et ne vous faites jamais prendre. ";
                } else {
                    texte += "Vous êtes plusieurs fois dénoncé et punis par les surveillants. "
                    + "Vous finissez par être forcé à être plus prudent et stopper vos persécutions et tabassages (pour l'instant). ";
                    texte += arreterCarriere(perso, MetiersEnum.brute_de_lycee, false);
                    texte += arreterCarriere(perso, MetiersEnum.dileur_de_lycee, false);
                }

                return texte + "<br/>";
            },
            conditions: (perso: Perso): boolean =>
                suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3)
                || suitUneCarriereDepuis(perso, MetiersEnum.dileur_de_lycee, 0.3),
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee4 couteau",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Pour faciliter vos extorsions vous décidez de vous procurer un couteau. `
                texte += acquerir(perso, PossessionEnum.couteau);
                return texte;
            },
            conditions: (perso: Perso): boolean => ( suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee) || suitUneCarriereDe(perso, MetiersEnum.dileur_de_lycee))
                && !possede(perso, PossessionEnum.couteau),
            proba: 0.02,
        },
        {
            id: "evts_brute_de_lycee5 bagarre de gamins",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Une de vos extorsions se passe mal. Vous êtes pris à parti par 3 petits merdeux. `
                let diffIntimidation: number = -20;
                if (possede(perso, PossessionEnum.couteau)) {
                    texte += "Vous sortez votre couteau pour les intimider et les tenir à distance. "
                    diffIntimidation += 50;
                }
                const resTestIntimidation: ResultatTest = testComp(perso, TypeCompetence.intimidation, diffIntimidation);
                texte += resTestIntimidation.resume;
                if (resTestIntimidation.reussi) {
                    texte += "<br/> Vous parvenez à leur faire peur malgré leur nombre et vous éclipsez sans dommage. ";
                    modifierReputationDansQuartier(perso, undefined, -2, 2);
                } else {
                    texte += "Ils ne se laissent pas intimider et se jettent sur vous : ";
                    if (possede(perso, PossessionEnum.couteau)) {
                        const resTestArme: ResultatTest = testComp(perso, TypeCompetence.armeCaC, 20);
                        texte += resTestArme.resume;
                        if (resTestArme.reussi) {
                            const resTestCruel:ResultatTest = testVice(perso, Vice.cruel, 0);
                            texte += resTestCruel.resume;
                            if (resTestCruel.reussi) {
                                texte += "Vous les blessez légèrement et efficacement et ils finissent par prendre peur et s'enfuir. ";
                            } else {
                                texte += "De rage vous poignardez un des morveux. Les autres s'enfuient terrifiés. ";
                                modifierReputationDansQuartier(perso, undefined, 6, -10);
                                // TODO : police, casier etc
                            }
                        } else {
                            texte += "Vous vous faites salement dérouiller malgré votre couteau : ";
                            const blessureSubie = infligerBlessureAleatoire(perso, 0, 4);
                            if (blessureSubie != null) {
                                const texteBlessure: string = blessureSubie.nom;
                                texte += texteBlessure + "<br/>";
                            }
                            perdre(perso, PossessionEnum.couteau);
                        }
                    } else {
                        // bagarre normale à mains nues
                        const resTestBagarre: ResultatTest = testComp(perso, TypeCompetence.bagarre, -30);
                        texte += resTestBagarre.resume;
                        if (resTestBagarre.reussi) {
                            texte += "À un contre 3 vous parvenez malgré tout à les tabasser et les mettre en fuite ! ";
                            modifierReputationDansQuartier(perso, undefined, 5, -4);
                        } else {
                            texte += "Vous vous faites salement dérouiller. ";
                            if (Math.random() < 0.3) {
                                const blessureSubie = infligerBlessureAleatoire(perso, 0, 4);
                                if (blessureSubie != null) {
                                    const texteBlessure: string = blessureSubie.nom;
                                    texte += texteBlessure + "<br/>";
                                }
                            }
                        }
                    }
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean =>
                suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee) ||
                suitUneCarriereDe(perso, MetiersEnum.dileur_de_lycee),
            proba: 0.02,
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee6 bande",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Vous commencez à vous connaître entre jeunes malandrins. Vous délimitez vos territoires et échangez vos infos. ";

                const resTestComdt: ResultatTest = testComp(perso, TypeCompetence.commandement, 0);
                texte += resTestComdt.resume;
                if (resTestComdt.reussi) {
                    texte += "Par votre autorité naturelle vous dirigez souvent ces petites séances de coordination.  ";
                    modifierReputationDansQuartier(perso, undefined, -1, 3);
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, 1);
                }

                return texte + "<br/>";
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3),
            proba: 0.02,
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee7 punition",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Les surveillants et proviseurs sont fatigués d'entendre parler de vos méfaits. ";

                const resTestDiscret: ResultatTest = testComp(perso,TypeCompetence.discretion, 0);
                texte += resTestDiscret.resume;
                if (resTestDiscret.reussi) {
                    texte += "Mais vous êtes trop malin pour vous faire attrapper.  ";
                } else {
                    texte += "Ils finissent par vous convoquer et vous pincer. "
                    const resTestTromperie: ResultatTest = testComp(perso, TypeCompetence.tromperie, 0);
                    texte += resTestTromperie.resume;
                    if (resTestTromperie.reussi) {
                        texte += "Mais vous les entortillez par vos mensonges et votre bagout. ";
                    } else {
                        const resTestEnd: ResultatTest = testComp(perso, TypeCompetence.endurance, 0);
                        texte += "Ils vous punissent durement. ";
                        texte += resTestEnd.resume;
                        if (resTestEnd.reussi) {
                            texte += "Mais vous encaissez la punition avec patience, courage et résistance. ";
                        } else {
                            texte += "La souffrance et l'humiliation qu'ils vous infligent vous coupent l'envie de recommencer. ";
                            arreterCarriere(perso, MetiersEnum.brute_de_lycee, false);
                            perso.bonheur -= 0.01;
                        }
                    }
                }
                return texte + "<br/>";
            },
            conditions: (perso: Perso): boolean =>
                ( suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3) || suitUneCarriereDepuis(perso, MetiersEnum.dileur_de_lycee, 0.3))
                && getReputationQuartier(perso, undefined).qualite < -3,
            proba: 0.02,
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee8 travail",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const carriere: Carriere|undefined = getCarriereActive(perso);
                if (carriere) {
                    const resultatTestMetier:ResultatTest = testMetier(perso, {metier: carriere.metier, bonusMalus: 20});
                    const resTestEvaluation: ResultatTest = testComp(perso, TypeCompetence.evaluation, 20);
                    texte += resTestEvaluation.resume;
                    texte += resultatTestMetier.resume + "<br/>";
                    if (resultatTestMetier.reussi && resTestEvaluation.reussi) {
                        texte += "Vous êtes un excellent racketteur de lycée, très efficace pour repérer les gamins à la fois faibles et riches. ";
                        texte += modifierStatut(perso, 1);
                    } else {
                        texte += "Vous agressez régulièreent les faibles de votre lycée mais sans grand bénéfice. ";
                    }
                } else {
                    console.error("evts_brute_de_lycee8 travail améliore sans carrière !  : perso : ", perso);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3)
                && !statut1SuperieurOuEgalAStatut2(perso.statut, metiersObjs[MetiersEnum.brute_de_lycee].statutMax),
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee9 merdeux en fuite",
            description: async (perso: Perso): Promise<string> => {
                const merdeux:PNJ = genererPNJ(Sexe.male, undefined, perso.bilanLycee.coterieActuelle);
                let texte: string = "Vous croisez " + merdeux.prenom +
                    ",un petit merdeux que vous avez déjà passé à tabac par le passé. En vous voyant il s'enfuit en courant sans vous payer sa redevance !";
                const resTestMvt: ResultatTest = testComp(perso, TypeCompetence.mouvement, 20);
                texte += resTestMvt.resume;
                if (resTestMvt.reussi) {
                    texte += "Vous lui mettez une bonne dérouillée et lui mettez la main au collet pour lui apprendre à vous faire courir. ";
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, 1);
                    modifierReputationDansQuartier(perso, undefined, 0, 2);
                } else {
                    texte += "Il vous prend de vitesse, et devant beaucoup de témoins moqueurs en plus. ";
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, -1);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            proba: 0.02,
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee),
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee10ragote",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "";
                const resTestRagot: ResultatTest = testComp(perso, TypeCompetence.ragot, 20);
                texte += resTestRagot.resume;
                if (resTestRagot.reussi) {
                    texte += "Vous êts très doué pour écouter les rumeurs et récupérer ainsi les bonnes cibles peureuses et faibles. ";
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, 1);
                } else {
                    texte += "Vous avez du mal à repérer les bonnes cibles et à éviter les ennuis. ";
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, -1);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            proba: 0.02,
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee),
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee11caillou",
            description: async (perso: Perso): Promise<string> => {
                const merdeux:PNJ = genererPNJ(Sexe.male, undefined, perso.bilanLycee.coterieActuelle);
                let texte: string = "Vous repérez ce petit merdeux de " + merdeux.prenom + "qui passe au dessus de vous sur un pont. "
                    + "Se croyant à l'abri, il se permet de vous insulter ! Vous ramassez promptement un caillou. ";
                const resTestTir: ResultatTest = testComp(perso, TypeCompetence.tir, 0);
                texte += resTestTir.resume;
                if (resTestTir.reussi) {
                    texte += "Vous lui carrez en pleine tête. Il fait beacoup moins le malin ! ";
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, 1);
                    modifierReputationDansQuartier(perso, undefined, -4, 1);
                } else {
                    texte += "Vous lancez le caillou dans sa direction mais le ratez complètement, ce qui le fait bien rire. ";
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, -1);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            proba: 0.02,
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee),
            repetable: true,
        },
    ],
    probaParDefaut: 0.03,
};
