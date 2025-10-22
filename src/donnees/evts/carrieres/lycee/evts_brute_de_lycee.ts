import {Perso} from "../../../../types/perso/Perso";
import {GroupeEvts} from "../../../../types/Evt";
import {
    arreterCarriere,
    augmenterCompetenceMetier,
    commencerCarriere,
    compatibiliteCarriere,
    estAuLycee,
    plusUnEnCompetenceMetier,
    suitUneCarriereDe,
    suitUneCarriereDepuis
} from "../../../../fonctions/metiers/metiersUtils";
import {MetiersEnum, metiersObjs} from "../../../metiers";
import {getAge} from "../../../../types/Date";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testVice} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {getReputationQuartier, modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {getQuartierDeCoterie} from "../../../coteries/Quartiers";
import {acquerir, perdre, possede} from "../../../../fonctions/possessions/possessions";
import {PossessionEnum} from "../../../possessions/Possession";
import {infligerBlessureAleatoire} from "../../../../fonctions/sante/sante";
import {Vice} from "../../../../types/ViceVertu";

export const evts_brute_de_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_brute_de_lycee1_vocation",
            description: async (perso: Perso): Promise<string> => {
                let texte = '';
                texte += "Vous décidez de vous en prendre à d'autres jeunes plus faibles pour leur vider les poches. <br/>";
                texte += commencerCarriere(perso, MetiersEnum.brute_de_lycee, '');
                return texte;
            },
            conditions: (perso: Perso): boolean => estAuLycee(perso)
                && !suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee)
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

                const resTestI: ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 20});
                texte += resTestI.resume;
                if (resTestI.reussi) {
                    texte += "Votre presence menaçante vous permet rapidement de dominer les petits intellos maigrichons du lycée. <br/>";
                    texte += plusUnEnCompetenceMetier(perso, MetiersEnum.brute_de_lycee);
                    modifReputationAmplitude += 1;
                    modifReputationQualite -= 1;
                } else {
                    texte += "L'intimidation ne suffit pas, un des caves se rebiffe. "
                        + "Il va falloir le corriger publiquement pour que ça se sache dans tout le campus. <br/>";
                    const resTestB: ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 20});
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

                const resTestDiscretion: ResultatTest = testComp(perso, {comp: TypeCompetence.discretion, bonusMalus: 20});
                texte += resTestDiscretion.resume;
                if (resTestDiscretion.reussi) {
                    texte += "Vous connaissez le lycée comme votre poche et ne vous faites jamais prendre. ";
                } else {
                    texte += "Vous êtes plusieurs fois dénoncé et punis par les surveillants. "
                    + "Vous finissez par être forcé à être plus prudent et stopper vos persécutions et tabassages (pour l'instant). ";
                    texte += arreterCarriere(perso, MetiersEnum.brute_de_lycee, true);
                }

                return texte + "<br/>";
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3),
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee4 couteau",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Pour faciliter vos extorsions vous décidez de vous procurer un couteau. `
                texte += acquerir(perso, PossessionEnum.couteau);
                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee)
                && !possede(perso, PossessionEnum.couteau),
            proba: 5,
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
                const resTestIntimidation: ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: diffIntimidation});
                texte += resTestIntimidation.resume;
                if (resTestIntimidation.reussi) {
                    texte += "<br/> Vous parvenez à leur faire peur malgré leur nombre et vous éclipsez sans dommage. ";
                    modifierReputationDansQuartier(perso, undefined, -2, 2);
                } else {
                    texte += "Ils ne se laissent pas intimider et se jettent sur vous : ";
                    if (possede(perso, PossessionEnum.couteau)) {
                        const resTestArme: ResultatTest = testComp(perso, {comp: TypeCompetence.armeCaC, bonusMalus: 20});
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
                        const resTestBagarre: ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: -30});
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


                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee),
            proba: 3,
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee6 bande",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Vous commencez à vous connaître entre jeunes malandrins. Vous délimitez vos territoires et échangez vos infos. ";

                const resTestComdt: ResultatTest = testComp(perso, {comp: TypeCompetence.commandement, bonusMalus: 0});
                texte += resTestComdt.resume;
                if (resTestComdt.reussi) {
                    texte += "Par votre autorité naturelle vous dirigez souvent ces petites séances de coordination.  ";
                    modifierReputationDansQuartier(perso, undefined, -1, 3);
                    augmenterCompetenceMetier(perso, MetiersEnum.brute_de_lycee, 1);
                }

                return texte + "<br/>";
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3),
            proba: 4,
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee7 punition",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Les surveillants et proviseurs sont fatigués d'entendre parler de vos méfaits. ";

                const resTestDiscret: ResultatTest = testComp(perso, {comp: TypeCompetence.discretion, bonusMalus: 0});
                texte += resTestDiscret.resume;
                if (resTestDiscret.reussi) {
                    texte += "Mais vous êtes trop malin pour vous faire attrapper.  ";
                } else {
                    texte += "Ils finissent par vous convoquer et vous pincer. "
                    const resTestTromperie: ResultatTest = testComp(perso, {
                        comp: TypeCompetence.tromperie,
                        bonusMalus: 0
                    });
                    texte += resTestTromperie.resume;
                    if (resTestTromperie.reussi) {
                        texte += "Mais vous les entortillez par vos mensonges et votre bagout. ";
                    } else {
                        const resTestEnd: ResultatTest = testComp(perso, {
                            comp: TypeCompetence.endurance,
                            bonusMalus: 0
                        });
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
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3)
                && getReputationQuartier(perso, undefined).qualite < -3,
            proba: 4,
            repetable: true,
        },
    ],
    probaParDefaut: 10,
};
