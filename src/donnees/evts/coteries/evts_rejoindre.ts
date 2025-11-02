import {Perso} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {Coterie} from "../../../types/Coterie";
import {getRandomInt} from "../../../fonctions/random";
import {calculerAffinite, SEUIL_AFFINITE} from "../../../fonctions/coteries/affinite";
import {rejointCoterie} from "../../../fonctions/coteries/generales";
import {PhaseLycee} from "../../../types/lycee/StadeUniversite";

// événements de base permanents pour rejoindre ou quitter une coterie
export const evts_rejoindre: GroupeEvts = {
    evts: [
        {
            id: "evts_rejoindre1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous ne faites encore partie d'aucune coterie. <br/>`
                texte += 'Vous prenez le temps de réfléchir à si une vous séduit suffisamment.<br/>';

                const coteriesProches: Coterie[] = [];
                Object.values(Coterie).forEach((co: Coterie) => {
                    const affinite: number = calculerAffinite(perso, co);
                    if (affinite >= SEUIL_AFFINITE) {
                        coteriesProches.push(co);
                    }
                })
                const coterieRejointe = coteriesProches.at(getRandomInt(coteriesProches.length)-1);
                if (coterieRejointe) {
                    texte += "Vous décidez de rejoindre les " + coterieRejointe.toString() + ".<br/>";
                    texte += rejointCoterie(perso, coterieRejointe);
                } else {
                    texte += "Malheureusement aucune coterie ne vous satisfait. Peut-être votre caractère est-il encore trop peu affirmé ?" +
                        " Ou peut-être au contraire êtes vous si exceptionnel qu'aucune coterie ne peut vous correspondre ?";
                }

                // puis passer une épreuve éventuellement ?
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.coterie === undefined
                && perso.bilanLycee.phaseActuelle === PhaseLycee.finie,
            repetable: true,
        },
    ],
    probaParDefaut: 0.03, // très grosse probabilité : il n'est pas naturel de rester sans coterie
};