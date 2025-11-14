import {Perso} from "../../../types/perso/Perso";
import {anneesToJours} from "../../../types/Date";
import {EvtProgramme} from "../../../types/Evt";
import {suitUneCarriereDe} from "../../../fonctions/metiers/metiersUtils";
import {MetiersEnum} from "../../metiers";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier, testVertu, testVice} from "../../../fonctions/des";
import {Vertu, Vice} from "../../../types/ViceVertu";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {modifierStatut} from "../../../fonctions/perso/statut";
import {
    modifierReputationAupresAutorites,
    modifierReputationAupresPopulation,
    modifierReputationDansQuartier
} from "../../../fonctions/perso/Reputation";
import {Quartier} from "../../geographie/quartiers";
import {Coterie} from "../../../types/Coterie";
import {infligerBlessureAleatoire} from "../../../fonctions/sante/sante";

// ces énévements sont déclenchés à date fixe indépendamment des actions du héros
// pour exister ils doivent être ajouté à la comp 'evtsProgrammes' du perso au début
export const evts_emeutes_khaos: EvtProgramme[] = [
    {
        date: (perso:Perso):boolean => perso.date === anneesToJours(92) + 7*30 + 11, // 12 floréal 92
        evt: {
            id: "evts_programmes émeutes anarchistes des chaos j1",
            description: async (_perso: Perso): Promise<string> => {
                return "Les tensions dans le quartier Montreuil des Khaos tournent à l'explosion : "
                + "Les khaos revendiquent l'anarchisme, l'autogouvernement et la sécession de la ville. Ce n'est pas la première fois, et comme pour les précédentes, "
                + "il n'y a aucune chance que le consul accepte cela. La répression va être terrible une fois encore. <br/>"
            },
            conditions: (_perso: Perso): boolean => true,
        },
    },
    {
        date: (perso:Perso):boolean => perso.date === anneesToJours(92) + 7*30 + 12, // 13 floréal 92
        evt: {
            id: "evts_programmes émeutes anarchistes des chaos j2",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Une explosion a eu lieu aux abords du quartier Montreuil.<br/> "
                + "Tout semble accuser les Khaos. La police et les robots du consul prennent ça comme un signal. "
                + "La répression commence. "
                + "Des cars pleins de CRS en armure de combat sont envoyés sur palce. "
                + "L'émeute s'enflamme quelques heures plus tard et les blessés se multiplient. <br/>>";

                if (suitUneCarriereDe(perso, MetiersEnum.journaliste)) {
                    // --------------------- JOURNALISME
                    const resTestImpulsif:ResultatTest = testVice(perso, Vice.impulsif, 20);
                    texte += resTestImpulsif.resume;
                    const resTestEnvieux:ResultatTest = testVice(perso, Vice.envieux, 20);
                    texte += resTestEnvieux.resume;
                    if (resTestEnvieux.reussi) {
                        texte += "Vous foncez à Montreuil pour couvrir l'événement. ";
                    } else if (resTestImpulsif.reussi) {
                        texte += "C'est l'occasion d'un scoop ! Vous foncez à Montreuil pour couvrir l'événement. ";
                    }
                    let difficulteArticle:number = -20;
                    if (resTestEnvieux.reussi || resTestImpulsif.reussi) {
                        difficulteArticle += 20;
                        const resTestTromperie:ResultatTest = testComp(perso, TypeCompetence.tromperie, 20);
                        texte += resTestTromperie.resume;
                        if (resTestTromperie.reussi) {
                            texte += "Vous parvenez à passer les barricdes et vous introduire dans Montreuil. "
                            + "Puis vous entrez dans un bar puis montez sur un toit pour jauger les émeutes d'en haut. "
                            + "Vous êtes idéalement placé pour faire des photos et écrire un article exceptionnel en plein coeur de l'action !<br/>";
                            difficulteArticle += 60;
                        }
                    }
                    const restTestJournaliste:ResultatTest = testMetier(perso, MetiersEnum.journaliste, difficulteArticle);
                    texte += restTestJournaliste.resume;
                    if (restTestJournaliste.reussi) {
                        if (restTestJournaliste.critical) {
                            texte += "Vous en tirez un article si excellent et percutant par votre rédacteur en chef qu'il en vend les droits à prix d'or et le diffuse sur écrans géants dans toute la ville en temps réel. "
                                + "L'opinion publique est si scandalisée par les violences et manipulations que vous rapportez que la police limite la répression et quitte le quartier. <br/>";
                            texte += "Vous êtes maintenant célèbre et adulé par le public autant que détesté par la police. <br/>";
                            texte += modifierStatut(perso, 2);
                            texte += modifierReputationDansQuartier(perso, Quartier.montreuil, 20, 30);
                            texte += modifierReputationAupresAutorites(perso, -5);
                            texte += modifierReputationAupresPopulation(perso, 5, 15);
                        } else {
                            texte += "Vous en tirez un excellent article. <br/>";
                            texte += modifierStatut(perso, 1);
                        }
                    }
                } else {
                    // ------------------- EVT STANDARD
                    let vaSurPlace:boolean = perso.coterie === Coterie.khaos;
                    if (!vaSurPlace) {
                        const resTestRebelle:ResultatTest = testVice(perso, Vice.rebelle, -10);
                        texte += resTestRebelle.resume;
                        if (resTestRebelle.reussi) {
                            vaSurPlace = true;
                        }
                    }

                    if (vaSurPlace) {
                        texte += "Vous allez manifester dans la rue pour obtenir le relâchement des règles excessives du consul. <br/>"
                        texte += "Autour de vous pas  mal de vitrines sont brisées. <br/>";
                        const resTestCupide:ResultatTest = testVice(perso, Vice.cupide, 0);
                        texte += resTestCupide.resume;
                        if (resTestCupide.reussi) {
                            texte += "Vous en profitez pour piller un peu d'électroménager et de fringues. ";
                            texte += modifierStatut(perso, 1);
                            texte += "Puis vous préférez vous éclipser avec votre butin avant que ça ne tourne mal. <br/>"
                        } else {
                            // ------------------ émeute
                            let succesDansManif:number = 0;
                            texte += "Vous finissez par vous trouver face à une ligne de CRS en armures qui bloquent toute la largeur de la rue avec leurs énormes boucliers. ";
                            const resTestValeureux:ResultatTest = testVertu(perso, Vertu.valeureux, 0);
                            texte += resTestValeureux.resume;
                            if (resTestValeureux.reussi) {
                                succesDansManif += 1;
                                texte += "Vous échangez des projectiles avec les CRS et encaissez des volées de grenades lacrymogènes. <br/>";
                                const resTestTir:ResultatTest = testComp(perso, TypeCompetence.tir, 0);
                                texte += resTestTir.resume;
                                if (resTestTir.reussi) {
                                    succesDansManif += 1;
                                    if (resTestTir.critical) {
                                        succesDansManif += 2;
                                    }
                                }
                                const resTestEnd:ResultatTest = testComp(perso, TypeCompetence.endurance, 0);
                                texte += resTestEnd.resume;
                                if (resTestEnd.reussi) {
                                    succesDansManif += 1;
                                    if (resTestEnd.critical) {
                                        succesDansManif += 2;
                                    }
                                }
                                texte += "Les CRS se décident à charger et tentent d'isoler des sous-groupes pour les tabasser et les arrêter. <br/>";
                                const resTestBag:ResultatTest = testComp(perso, TypeCompetence.bagarre, -30);
                                texte += resTestBag.resume;
                                if (resTestBag.reussi) {
                                    succesDansManif += 3;
                                    if (resTestBag.critical) {
                                        succesDansManif += 2;
                                    }
                                    texte += "À mains nues vous parvenez à ceinturer et neutralier une des brutes carapaçonnées. <br/>";
                                }
                                const resTestCom:ResultatTest = testComp(perso, TypeCompetence.commandement, 0);
                                texte += resTestCom.resume;
                                if (resTestCom.reussi) {
                                    succesDansManif += 1;
                                    if (resTestCom.critical) {
                                        succesDansManif += 2;
                                    }
                                    texte += "Vous parvenez à coordonner vos camarades pour résister mieux aux assauts. <br/>";
                                }
                                console.log("succesDansManif : " + succesDansManif);
                                if (succesDansManif >= 3) {
                                    texte += "Vous avez beaucoup impressionné les manifestants khaos... et avez sans doute attiré l'attention des CRS.<br/>";
                                    texte += modifierReputationDansQuartier(perso, Quartier.montreuil, succesDansManif *2, succesDansManif *2);
                                    texte += modifierReputationAupresAutorites(perso, -succesDansManif);
                                }
                            } else {
                                texte += "Vous fuyez avant la charge. <br/>"
                            }
                        }
                        // ------------------- blessé
                        const resTestChance:ResultatTest = testComp(perso, TypeCompetence.chance, 30);
                        texte += resTestChance.resume;
                        if (!resTestChance.reussi) {
                            texte += infligerBlessureAleatoire(perso, 0, 6);
                        }

                        // -------------------- fuite
                        const resTestM:ResultatTest = testComp(perso, TypeCompetence.mouvement, 0);
                        texte += resTestM.resume;
                        const resTestTromp:ResultatTest = testComp(perso, TypeCompetence.tromperie, 0);
                        texte += resTestTromp.resume;
                        const resTestDiscret:ResultatTest = testComp(perso, TypeCompetence.discretion, 0);
                        texte += resTestDiscret.resume;
                        if (resTestTromp.reussi || resTestM.reussi || resTestDiscret.reussi) {
                            texte += "Vous parvenez à échapper à l'arrestation. <br/>"
                        } else {
                            texte += "Vous êtes capturé et interrogé par des CRS. <br/>"
                            texte += "Ils vous laissent repartir le lendemain mais il est clair que vous êtes maintenant fiché à vie. <br/>"
                            texte += modifierReputationAupresAutorites(perso, -5);
                        }
                    }
                }

                return texte;
            },
            conditions: (_perso: Perso): boolean => true,
        },
    },
    {
        date: (perso: Perso): boolean => perso.date === anneesToJours(92) + 7 * 30 + 13, // 14 floréal 92
        evt: {
            id: "evts_programmes émeutes anarchistes des chaos j3",
            description: async (_perso: Perso): Promise<string> => {
                return "Le lendemain le quartier est encore en bonne partie incendié. "
                + "Des centaines de manifestants sont emprisonnés et les journaux annoncent des restrictions sur al coterie Khaos, voire son interdiction. ";
            },
            conditions: (_perso: Perso): boolean => true,
        },
    }
];
