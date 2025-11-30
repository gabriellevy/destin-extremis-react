import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testVertu, testVice} from "../../../fonctions/des";
import {ajouterViceVal, getValeurVertu, getValeurVice, Vertu, Vice} from "../../../types/ViceVertu";
import {actuellementDrogueA, seDroguer} from "../../../fonctions/sante/drogues_fc";
import {droguesEnum} from "../../sante/drogues";
import {getAge} from "../../../types/Date";
import {ajouteLigneDeTexteGras} from "../../../fonctions/texte_fc";
import {modifierStatut, statutPersoSuperieurAStatut2} from "../../../fonctions/perso/statut";
import {MetalStatut} from "../../../types/statut_social/Statut";

export const evts_bars: GroupeEvts = {
    evts: [
        {
            id: "evts_bars1",
            description: (perso: Perso): Promise<string> => {
                let soireeFinie: boolean = false;
                let texte:string = "Vous allez boire un verre avec des amis. <br/>";
                // gloutonnerie / alcoolisme
                if (getValeurVice(perso, Vice.gourmand) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += "Vous forcez un peu sur la boisson et y prenez goût. "
                        texte += ajouterViceVal(perso, Vice.gourmand, 1);
                    }
                }
                // cigarette
                if (!actuellementDrogueA(perso, droguesEnum.cigarette) && getValeurVertu(perso, Vertu.sobre) < 1) {
                    const resTestSobre:ResultatTest = testVertu(perso, Vertu.sobre, 20);
                    texte += resTestSobre.resume;
                    if (!resTestSobre.reussi) {
                        texte += "Vous commencez à fumer pour la première fois. <br/>";
                        texte += ajouteLigneDeTexteGras(seDroguer(perso, droguesEnum.cigarette));
                    }
                }
                // drague
                if (getValeurVice(perso, Vice.luxurieux) >= 1) {
                    if (Math.random() >= 0.5) {
                        texte += "Vous repérez une jolie femme tout à fait à votre goût. ";
                        const resTestCharme:ResultatTest = testComp(perso, TypeCompetence.charme, -20);
                        texte += resTestCharme.resume;
                        if (resTestCharme.reussi) {
                            texte += "C'est réciproque, elle est vite sous votre charme et vous passez la nuit ensemble. <br/>";
                            soireeFinie = true;
                            // TODO : crac crac, petites amies, enceintes etc...
                        } else {
                            texte += "Mais ce n'est pas du tout réciproque. <br/>";
                        }
                    }
                }
                // bagarre
                if (!soireeFinie && getValeurVice(perso, Vice.colerique) >= 1 && Math.random() >= 0.9) {
                    texte += "Vous vous sentez d'humeur massacrante et cherchez la bagarre avec tous les types qui vous regardent de travers. "
                    const resTestBagarre:ResultatTest = testComp(perso, TypeCompetence.bagarre, 0);
                    texte += resTestBagarre.resume;
                    // TODO : déterminer un perso au hasard ?
                    if (resTestBagarre.reussi) {
                        texte += "Vous finissez par vous battre avec un grand type aussi saoul que vous et le mettez au sol sous la rigolade de l'assistance. "
                            + "Vous vous sentez défoulé et passez ensuite une soirée plus calme. <br/>"
                        // TODO : si critique, arrêté par police ?
                    } else {
                        texte += "Finalement un type vous prend au mot et vous sonne d'un coup de bouteille. Vous passez le reste de a soirée à moitié assommé. <br/>";
                        if (resTestBagarre.critical) {
                            // TODO : blessure ?
                        }
                    }
                }
                return new Promise((resolve) => {
                    resolve(texte);
                });
            },
            conditions: (perso: Perso): boolean =>
                getValeurVertu(perso, Vertu.sociable) > 0
                && getValeurVertu(perso, Vertu.sobre) < 0
                && getAge(perso) >= 15,
            nbJoursEntreOccurences: 21,
        },
        {
            id: "evts_bars2 strip tease",
            description: (perso: Perso): Promise<string> => {
                let texte:string = "Vous allez vous éclater dans un club de strip tease. <br/>";

                const resTestLux:ResultatTest = testVice(perso, Vice.luxurieux, 20);
                texte += resTestLux.resume;
                if (resTestLux.reussi) {
                    if (resTestLux.critical) {
                        perso.bonheur += 0.15;
                        texte += "La soirée tourne à la folie incntrolable. Pas encore rassasié par les danseuses vous finissez par dénicher des prostitués, des drogues, et finissez complètement rincé et fauché. <br/>";
                        texte += modifierStatut(perso, -2);
                    } else {
                        perso.bonheur += 0.1;
                        texte += "Vous enchainez danses privées, alcool et distribution de pourboires et sortez rincé mais heureux. <br/>";
                        texte += modifierStatut(perso, -1);
                    }
                }

                return new Promise((resolve) => {
                    resolve(texte);
                });
            },
            conditions: (perso: Perso): boolean =>
                getValeurVice(perso, Vice.luxurieux) > 0
                && statutPersoSuperieurAStatut2(perso, {
                    rang: 1,
                    metalStatut: MetalStatut.bronze,
                })
                && getAge(perso) >= 18,
            proba: 0.025,
            nbJoursEntreOccurences: 40,
        },
    ],
    probaParDefaut: 0.05,
};