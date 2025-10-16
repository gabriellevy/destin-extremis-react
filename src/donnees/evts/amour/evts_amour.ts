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
    nombreDeCoupDeCoeur
} from "../../../fonctions/pnjs/amour";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testVice} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {appelLeChat, NiveauInfosPerso} from "../../../fonctions/le_chat";
import {Coterie} from "../../../types/Coterie";
import {getAge} from "../../../types/Date";

export const evts_amour: GroupeEvts = {
    evts: [
        {
            id: "evts_amour1 avoir un coup de coeur", // le pj va éventuellement la séduire
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur: PNJ = genererPNJAmourableDePerso(perso);
                coupDeCoeur.amourPourCePnj = NiveauAmour.coupDeCoeur;
                perso.pnjs.push(coupDeCoeur);
                let texte: string = "";

                const resTestImpulsif:ResultatTest = testVice(perso, Vice.impulsif, 0);
                const resTestCharme: ResultatTest = testComp(perso, {comp: TypeCompetence.charme, bonusMalus: -20});

                let prompt: string = "Décrivez comment le personnage " + perso.prenom + " a eu un coup de foudre pour " + coupDeCoeur.prenom;
                texte += "Vous avez un coup de cœur pour " + coupDeCoeur.prenom + ". ";
                if (resTestImpulsif.reussi) {
                    if (resTestCharme.reussi) {
                        coupDeCoeur.amourDeCePnj = NiveauAmour.coupDeCoeur;
                        if (resTestCharme.critical && resTestImpulsif.critical) {
                            texte += "Vous l'abordez immédiatement et le courant passe si bien que vous couchez ensemble le jour même. ";
                            prompt += " et a couché avec elle le jour même. ";
                            if (perso.coterie === Coterie.templiers || perso.coterie === Coterie.cathares) {
                                const resTestTromperie: ResultatTest = testComp(perso, {comp: TypeCompetence.tromperie, bonusMalus: 0});
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
                texte += resTestImpulsif.resume + "<br/>";
                if (resTestImpulsif.reussi) {
                    texte += resTestCharme.resume + "<br/>";
                }

                return texte + ". <br/>";
            },
            conditions: (perso: Perso): boolean =>
                nombreDeCoupDeCoeur(perso) < (1 + getValeurVice(perso, Vice.luxurieux))*2
                && !enCoupleAvecUnAmourFort(perso)
                && getAge(perso) >= 13,
            repetable: true,
        },
        {
            id: "evts_amour draguer un coup de coeur",
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur:PNJ = getUnCoupDeCoeur(perso);
                const resTestCharme:ResultatTest = testComp(perso, {comp: TypeCompetence.charme, bonusMalus: -20});
                let texte = "Vous vous décidez à aborder " + coupDeCoeur.prenom + ". " + resTestCharme.resume + "<br/>";
                if (resTestCharme.reussi) {
                    texte += coupDeCoeur.prenom + " tombe complètement sous votre charme et devient votre amoureuse. ";
                    coupDeCoeur.amourDeCePnj = NiveauAmour.coupDeCoeur;
                    coupDeCoeur.niveauRelationAmoureuse = NiveauRelationAmoureuse.petiteAmie;
                } else {
                    texte += "Mais " + coupDeCoeur.prenom + " ne tombe pas sous votre charme. ";
                    if (getValeurVertu(perso, Vertu.prudent) > 0) {
                        texte += "Déçu, vous passez autre chose et l'oubliez rapidement. ";
                        coupDeCoeur.amourPourCePnj = NiveauAmour.aucun; // TODO vérifiez que ça retire vraiment
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
            repetable: true,
        },
    ],
    probaParDefaut: 5,
};