import {GroupeEvts} from "../../../types/Evt";
import {NiveauIA, Perso} from "../../../types/perso/Perso";
import {getValeurVertu, getValeurVice, TypeVertu, TypeVice} from "../../../types/ViceVertu";
import {genererPNJAmourableDePerso} from "../../../fonctions/generation";
import {PNJ} from "../../../types/perso/PNJ";
import {NiveauAmour, NiveauRelationAmoureuse} from "../../../types/perso/Amour";
import {aUnCoupDeCoeur, enCoupleAvecUnAmourFort, getUnCoupDeCoeur} from "../../../fonctions/pnjs/amour";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {appelLeChat} from "../../../App";

export const evts_amour: GroupeEvts = {
    evts: [
        {
            id: "evts_amour1 avoir un coup de coeur",
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur: PNJ = genererPNJAmourableDePerso(perso);
                coupDeCoeur.amourPourCePnj = NiveauAmour.coupDeCoeur;
                perso.pnjs.push(coupDeCoeur);
                let texte: string = "";
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChat(
                        perso,
                        "Décrivez comment le personnage " + perso.prenom + " a eu un coup de foudre pour " + coupDeCoeur.prenom
                        + ". Ce coup de foudre n'est pas réciproque.");
                } else {
                    texte += "Vous avez un coup de cœur pour " + coupDeCoeur.prenom;
                }
                return texte + ". <br/>";
            },
            conditions: (perso: Perso): boolean =>
                getValeurVice(perso, TypeVice.luxurieux) >= 0
                && !enCoupleAvecUnAmourFort(perso)
                && perso.age >= 13,
        },
        {
            id: "evts_amour1 avoir un coup de coeur réciproque",
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur: PNJ = genererPNJAmourableDePerso(perso);
                coupDeCoeur.amourPourCePnj = NiveauAmour.coupDeCoeur;
                coupDeCoeur.amourDeCePnj = NiveauAmour.coupDeCoeur;
                perso.pnjs.push(coupDeCoeur);
                let texte: string = "";
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChat(
                        perso,
                        "Décrivez comment le personnage principal a eu un coup de foudre réciproque pour " + coupDeCoeur.prenom
                        + ". ");
                } else {
                    texte += "Vous avez le coup de foudre pour " + coupDeCoeur.prenom;
                }
                return texte + ". <br/>";
            },
            conditions: (perso: Perso): boolean =>
                getValeurVice(perso, TypeVice.luxurieux) >= 0
                && !enCoupleAvecUnAmourFort(perso)
                && perso.age >= 13,
        },
        {
            id: "evts_amour draguer un coup de coeur",
            description: async (perso: Perso): Promise<string> => {
                const coupDeCoeur:PNJ = getUnCoupDeCoeur(perso);
                const resTestCharme:ResultatTest = testComp(perso, {comp: TypeCompetence.charme, bonusMalus: -20});
                let texte = "Vous vous décidez à aborder " + coupDeCoeur.prenom + ". " + resTestCharme.resume + "<br/>";
                if (resTestCharme.reussi) {
                    texte += coupDeCoeur.prenom + " tombe complètement sous votre charme et devient votre petite amoureuse. ";
                    coupDeCoeur.amourPourCePnj = NiveauAmour.coupDeCoeur;
                    coupDeCoeur.niveauRelationAmoureuse = NiveauRelationAmoureuse.petiteAmie;
                } else {
                    texte += "Mais " + coupDeCoeur.prenom + " ne tombe pas sous votre charme. ";
                    if (getValeurVertu(perso, TypeVertu.prudent) > 0) {
                        texte += "Déçu, vous passez autre chose et l'oubliez rapidement. ";
                        coupDeCoeur.amourDeCePnj = NiveauAmour.aucun;
                    }
                    if (getValeurVice(perso, TypeVice.aventureux) > 0) {
                        texte += "Vous n'êtes pas du genre à renoncer. Vous savez que vous pouvez lui plaire et chercherez une autre occasion. ";
                        coupDeCoeur.amourDeCePnj = NiveauAmour.aucun;
                    }
                    if (getValeurVice(perso, TypeVice.envieux) > 0 && Math.random() > 0.9) {
                        texte += "Être repoussé vous rend de plus en plus obsessionel à son sujet. Vous êtes sûr qu'elle est faite pour vous. ";
                        coupDeCoeur.amourDeCePnj = NiveauAmour.amourFort;
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean =>
                aUnCoupDeCoeur(perso),
        },
    ],
    probaParDefaut: 10,
};