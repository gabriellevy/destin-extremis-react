import {GroupeEvts} from "../../../types/Evt";
import {NiveauIA, Perso} from "../../../types/perso/Perso";
import {getValeurVertu, getValeurVice, Vertu, Vice} from "../../../types/ViceVertu";
import {genererPNJAmourableDePerso} from "../../../fonctions/generation";
import {PNJ} from "../../../types/perso/PNJ";
import {NiveauAmour, NiveauRelationAmoureuse} from "../../../types/perso/Amour";
import {
    aUnCoupDeCoeurNonReciproque,
    enCoupleAvecUnAmourFort,
    getUnCoupDeCoeur,
    nombreDeCoupDeCoeur,
    nombreDeCouples
} from "../../../fonctions/pnjs/amour";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testVertu, testVice} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {appelLeChat, NiveauInfosPerso} from "../../../fonctions/le_chat";
import {Coterie} from "../../../types/Coterie";
import {getAge, jourDeLaSemaineStr} from "../../../types/Date";
import {supprimerPnj} from "../../../fonctions/pnjs/pnj_fc";
import {modifierStatut} from "../../../fonctions/perso/statut";
import {getReputationQuartier} from "../../../fonctions/perso/Reputation";

const rencard: (pnj:PNJ, perso: Perso) => Promise<string> = ( pnj:PNJ, perso: Perso) => {
    let texte: string =  "Vous préparez votre rencart avec " + pnj.prenom + ".<br/>";
    let niveauMotivation:number = getValeurVice(perso, Vice.luxurieux) * 2 - nombreDeCouples(perso);

    if (niveauMotivation < 0) {
        texte += "À la réflexion elle ne vous intéresse pas tellement mais vous verrez bien. <br/>";
    } else if (niveauMotivation > 3 ) {
        texte += "Vous êtes salement en manque et très motivé. <br/>";
    }
    let diffTest: number = -10;
    const resTestDepensier:ResultatTest = testVertu(perso, Vertu.genereux, 0);
    if (resTestDepensier.reussi) {
        texte += "Vous réservez un superbe restaurant et apportez un beau cadeau. <br/>";
        if (resTestDepensier.critical) {
            texte += modifierStatut(perso, -2);
            diffTest += 20;
        } else {
            texte += modifierStatut(perso, -1);
            diffTest += 10;
        }
    }
    texte += "Vous la rencontrez le soir. <br/>";
    if (getReputationQuartier(perso, undefined).amplitude >= 40) {
        texte += "Elle vous dit qu'elle a entendu parler de vous ces derniers temps et est contente de vous rencontrer enfin. C'est vrai que vous êtes plutôt connu. <br/>";
        diffTest += 20;
    }

    const resTestChance: ResultatTest = testComp(perso, TypeCompetence.chance, niveauMotivation * 10);
    const resTestCharme: ResultatTest = testComp(perso, TypeCompetence.charme, diffTest);
    if (resTestCharme.reussi && resTestChance.reussi) {
        if (resTestCharme.critical || resTestChance.critical) {
            texte += "C'est le coup de foudre. Vous couchez ensemble le soir même. <br/>";
            perso.bonheur += 0.1;
        } else {
            texte += "Vous vous plaisez beaucoup, vous allez vous revoir/ <br/>";
        }
        pnj.niveauRelationAmoureuse = NiveauRelationAmoureuse.petiteAmie;
    } else {
        texte += "Le courant n'est pas passé du tout. C'est dommage mais c'est la vie. <br/>";
        supprimerPnj(perso, pnj.prenom, pnj.nom);
    }

    return new Promise((resolve) => resolve(texte))
}

export const evts_amour: GroupeEvts = {
    evts: [
        {
            id: "evts_amour1 avoir un coup de coeur", // le pj va éventuellement la séduire
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur: PNJ = genererPNJAmourableDePerso(perso); // TODO : dans le quartier du PJ
                coupDeCoeur.amourPourCePnj = NiveauAmour.coupDeCoeur;
                perso.pnjs.push(coupDeCoeur);
                let texte: string = "";

                const resTestImpulsif:ResultatTest = testVice(perso, Vice.impulsif, 0);
                const resTestCharme: ResultatTest = testComp(perso, TypeCompetence.charme, -20);

                let prompt: string = "Décrivez comment le personnage " + perso.prenom + " a eu un coup de foudre pour " + coupDeCoeur.prenom;
                texte += "Vous avez un coup de cœur pour " + coupDeCoeur.prenom + ". ";
                if (resTestImpulsif.reussi) {
                    if (resTestCharme.reussi) {
                        coupDeCoeur.amourDeCePnj = NiveauAmour.coupDeCoeur;
                        if (resTestCharme.critical && resTestImpulsif.critical) {
                            texte += "Vous l'abordez immédiatement et le courant passe si bien que vous couchez ensemble le jour même. ";
                            prompt += " et a couché avec elle le jour même. ";
                            if (perso.coterie === Coterie.templiers || perso.coterie === Coterie.cathares) {
                                const resTestTromperie: ResultatTest = testComp(perso, TypeCompetence.tromperie, 0);
                                if (resTestTromperie.reussi) {
                                    texte += "En tant que " + perso.coterie + " ce type de relation est formellement interdit mais vous parvenez à la garder secrète. ";
                                    prompt += "En tant que " + perso.coterie + " il n'a pas le droit mais il parvient à le tenir secret. Dites comment il s'y prend. ";
                                } else {
                                    texte += "En tant que " + perso.coterie + " ce type de relation est formellement interdit, vous êtes exclus de la coterie. ";
                                    prompt += "En tant que " + perso.coterie + " il n'a pas le droit à ce genre de relation. Dites comment il s'est fait prendre et exclure. ";
                                    perso.coterie = undefined;
                                }
                            }
                        } else {
                            texte += "Vous l'abordez immédiatement et la séduisez. ";
                            prompt += " et l'a séduite. ";
                        }
                    } else {
                        prompt += " et comment il s'est fait rembarrer en la draguant. ";
                        texte += "Vous l'abordez immédiatement mais elle vous rembarre sans ménagement.<br/> ";
                    }
                } else {
                    prompt += " Ce coup de foudre n'est pas réciproque.";
                    texte += " Ce coup de foudre n'est pas réciproque et vous n'arrivez pas à vous décider à l'aborder.<br/> ";
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChat(
                        perso, prompt, NiveauInfosPerso.patronyme
                    );
                }
                texte += resTestImpulsif.resume;
                if (resTestImpulsif.reussi) {
                    texte += resTestCharme.resume;
                }

                return texte;
            },
            conditions: (perso: Perso): boolean =>
                nombreDeCoupDeCoeur(perso) < (1 + getValeurVice(perso, Vice.luxurieux))*2
                && !enCoupleAvecUnAmourFort(perso)
                && getAge(perso) >= 13,
            nbJoursEntreOccurences: 30,
        },
        {
            id: "evts_amour2 draguer un coup de coeur",
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur:PNJ = getUnCoupDeCoeur(perso);
                const resTestCharme:ResultatTest = testComp(perso, TypeCompetence.charme, -20);
                let texte = "Vous vous décidez à aborder " + coupDeCoeur.prenom + ". " + resTestCharme.resume + "<br/>";
                if (resTestCharme.reussi) {
                    texte += coupDeCoeur.prenom + " tombe complètement sous votre charme et devient votre amoureuse. ";
                    coupDeCoeur.amourDeCePnj = NiveauAmour.coupDeCoeur;
                    coupDeCoeur.niveauRelationAmoureuse = NiveauRelationAmoureuse.petiteAmie;
                } else {
                    texte += "Mais " + coupDeCoeur.prenom + " ne tombe pas sous votre charme. ";
                    if (getValeurVertu(perso, Vertu.prudent) > 0) {
                        texte += "Déçu, vous passez autre chose et l'oubliez rapidement. ";
                        coupDeCoeur.amourPourCePnj = NiveauAmour.aucun;
                    }
                    if (getValeurVice(perso, Vice.aventureux) > 0) {
                        texte += "Vous n'êtes pas du genre à renoncer. Vous savez que vous pouvez lui plaire et chercherez une autre occasion. ";
                        coupDeCoeur.amourDeCePnj = NiveauAmour.aucun;
                    }
                    if (getValeurVice(perso, Vice.envieux) > 0 && Math.random() > 0.9) {
                        texte += "Être repoussé vous rend de plus en plus obsessionel à son sujet. Vous êtes sûr qu'elle est faite pour vous. ";
                        coupDeCoeur.amourPourCePnj = NiveauAmour.amourFort;
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean =>
                aUnCoupDeCoeurNonReciproque(perso),
            nbJoursEntreOccurences: 30,
        },
        {
            id: "evts_amour3 oubli/rappeler coup de coeur",
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur:PNJ = getUnCoupDeCoeur(perso);
                let diff:number = 40 - Math.floor((perso.date - coupDeCoeur.dateDerniereInteration)/30)*5; // -5 par mois qui est passé
                console.log("evts_amour3 oubli/rappeler coup de coeur nb mois : ", Math.floor((perso.date - coupDeCoeur.dateDerniereInteration)/12));
                console.log("evts_amour3 oubli/rappeler coup de coeur diff : ", diff);
                const resTestIntel:ResultatTest = testComp(perso, TypeCompetence.intelligence, diff);
                let texte:string = "";
                texte += resTestIntel.resume;
                if (resTestIntel.reussi) {
                    texte += "Vous repensez à " + coupDeCoeur.prenom + ". Ça fait longtemps que vous ne l'avez pas vue. <br/>";

                    const resTestLux:ResultatTest = testVice(perso, Vice.luxurieux, 0);
                    texte += resTestLux.resume;
                    if (resTestLux.reussi) {
                        texte += "Vous décidez de la recontacter. <br/>";
                        const resTestChance:ResultatTest = testComp(perso, TypeCompetence.chance, 0);
                        texte += resTestChance.resume;
                        if (resTestChance.reussi) {
                            texte += "Vous parvenez à la joindre au téléphone : elle est tout surprise.<br/>";
                            const resTestCharme:ResultatTest = testComp(perso, TypeCompetence.charme, 0);
                            texte += resTestCharme.resume;
                            if (resTestCharme.reussi) {
                                const dateDemain:number = perso.date + 1; // TODO : programmer un truc du genre "le prochain Tridi" pltôt que juste le lendemain
                                texte += "Vous la convainquez de vous revoir demain " + jourDeLaSemaineStr(dateDemain) + ".<br/>";
                                perso.evtsProgrammes.push({
                                    date: (persoFutur:Perso) => perso.date + 1 === persoFutur.date,
                                    evt: {
                                        id: "rencard",
                                        description: rencard.bind(null, coupDeCoeur),
                                    }
                                });
                            } else {
                                texte += "Mais elle n'a aucune envie de vous revoir malgré votre insistance.<br/>";
                            }
                        } else {
                            texte += "Mais elle ne répond pas à vos appels.<br/>"
                        }
                    } else {
                        texte += "Mais vous chassez vite cette pensée. Vous avez mieux à faire. <br/>";
                    }
                } else {
                    texte += "Elle a beau vous avoir beaucoup plu à une époque, vous oubliez " + coupDeCoeur.prenom + " complètement. <br/>";
                    supprimerPnj(perso, coupDeCoeur.prenom, coupDeCoeur.nom);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => nombreDeCoupDeCoeur(perso) > 0,
            nbJoursEntreOccurences: 1,
            proba: 0.01,
        },
    ],
    probaParDefaut: 0.03,
};