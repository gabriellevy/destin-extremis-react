import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {PNJ} from "../../../types/perso/PNJ";
import {getPetitesAmiesDIlYAPlusDeDeuxMois} from "../../../fonctions/pnjs/amour";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testVertu, testVice} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {Vertu, Vice} from "../../../types/ViceVertu";
import {dureeEntre2DatesToStr} from "../../../types/Date";
import {NiveauAmour, NiveauRelationAmoureuse} from "../../../types/perso/Amour";
import {MetalStatut} from "../../../types/statut_social/Statut";

export const evts_relations_amoureuses: GroupeEvts = {
    evts: [
        {
            id: "evts_relations_amoureuses1 évolution relation",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "";
                const petiteAmie:PNJ|undefined = getPetitesAmiesDIlYAPlusDeDeuxMois(perso).at(0);
                if (petiteAmie) {
                    texte += "Cela fait " + dureeEntre2DatesToStr(perso.date, petiteAmie.dateDerniereInteration) + " que vous êtes en couple avec " + petiteAmie.prenom + ".";

                    if (Math.random() > 0.5) { // TODO : comment jauger si le PJ aime le PNJ ?? ajouter un niveau de sympathie ??
                        // ne plaît plus tellement
                        const resTestLux:ResultatTest = testVice(perso, Vice.luxurieux, 0);
                        texte += resTestLux.resume;
                        if (resTestLux.reussi) {
                            texte += "Elle ne vous plaît pas tant que ça mais vous la gardez sous le coude au cas où. <br/>";
                            petiteAmie.niveauRelationAmoureuse = NiveauRelationAmoureuse.coupDunSoir;
                        } else {
                            texte += "Vous vous êtes lassé, vous la quittez. <br/>"
                            petiteAmie.niveauRelationAmoureuse = NiveauRelationAmoureuse.rien;
                        }
                    } else {
                        // évolution
                        let qualite:number = 0;
                        if (perso.statut.metalStatut  === MetalStatut.or) {
                            texte += "Votre richesse simplifie beaucoup les choses. <br/>";
                            qualite += 1;
                        } else if (perso.statut.metalStatut  === MetalStatut.bronze) {
                            texte += "Votre pauvreté a mis votre relation à dure épreuve.<br/> ";
                            qualite -= 1;
                        }

                        const resTestCharme:ResultatTest = testComp(perso, TypeCompetence.charme, -20);
                        texte += resTestCharme.resume;
                        if (resTestCharme.reussi) {
                            if (resTestCharme.critical) {
                                texte += "Elle est folle de vous. <br/>";
                                petiteAmie.amourDeCePnj = NiveauAmour.amourFort;
                                qualite += 5;
                            } else {
                                texte += "Elle est toujorus amoureuse de vous. <br/>";
                                qualite += 2;
                            }
                        } else {
                            if (resTestCharme.critical) {
                                texte += "Elle en est venue à avoir une forme de répulsion envers vous. <br/>";
                                qualite -= 5;
                            } else {
                                texte += "Ses sentiments sont très émoussés. <br/>";
                                qualite -= 2;
                            }
                        }

                        const resTestEmpath:ResultatTest = testVertu(perso, Vertu.empathique, 0);
                        texte += resTestEmpath.resume;
                        if (resTestEmpath.reussi) {
                            texte += "Vous êtes très attentif à ses problèmes, elle aurait du mal à se passer de votre écoute. <br/>";
                            qualite += 1;
                        } else {
                            texte += "Votre insensibilité à ss problème lui pèse. Il faut dire qu'elle est très soulante. <br/> ";
                            qualite -= 1;
                        }

                        if (qualite <= -1) {
                            texte += "Votre relation battait clairement de l'aile. " + petiteAmie.prenom + " vous annonce qu'elle vous quitte. ";
                            petiteAmie.niveauRelationAmoureuse = NiveauRelationAmoureuse.rien;
                            petiteAmie.amourDeCePnj = NiveauAmour.aucun;
                        } else if (qualite >= 2) {
                            texte += "Vous et " + petiteAmie.prenom + " allez si bien ensemble que vous décidez d'aller plus loin et d'emménager ensemble. ";
                            // TODO : gérer si marriage etc selon coterie ou personnalité
                            petiteAmie.niveauRelationAmoureuse = NiveauRelationAmoureuse.concubine;
                            petiteAmie.amourDeCePnj = NiveauAmour.amourFort;
                        }
                    }
                } else {
                    console.error("evts_relations_amoureuses1 évolution relation sans avoir de petiteAmie : impossible");
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => getPetitesAmiesDIlYAPlusDeDeuxMois(perso).length > 0,
            nbJoursEntreOccurences: 60,
        },
    ],
    probaParDefaut: 0.02,
};