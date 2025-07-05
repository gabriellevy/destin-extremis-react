import {Perso} from "../../../types/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {age} from "../../../types/Date";
import {Coterie, rejointCoterie} from "../../../types/Coterie";
import {getRandomInt} from "../../../fonctions/random";
import {calculerAffinite, SEUIL_AFFINITE} from "../../../fonctions/coteries/affinite";

// événements de base permanents pour rejoindre ou quitter une coterie
export const evts_rejoindre: GroupeEvts = {
    evts: [
        {
            id: "evts_rejoindre1",
            description: (perso: Perso): string => {
                let texte: string = `Vous n'avez toujours aucune coterie à votre âge, ce qui est inhabituel. <br/>`
                texte += 'Vous prenez le temps de réfléchir à si une vous séduit suffisament.<br/>';

                const coteriesProches: Coterie[] = [];
                Object.values(Coterie).forEach((co: Coterie) => {
                    const affinite = calculerAffinite(perso, co);
                    console.log(co.toString() + " : " + affinite);
                    if (affinite >= SEUIL_AFFINITE) {
                        coteriesProches.push(co);
                    }
                })
                const coterieRejointe = coteriesProches.at(getRandomInt(coteriesProches.length)-1);
                if (coterieRejointe) {
                    rejointCoterie(perso, coterieRejointe);
                    texte += "Après mure réflexion vous rejoignez les " + coterieRejointe.toString();
                } else {
                    texte += "Malheureusement aucune coterie ne vous satisfait. Peut-être votre caractère est-il encore trop peu affirmé ?" +
                        " Ou peut-être au contraire êtes vous si exceptionnel qu'aucune coterie ne peut vous correspondre ?";
                }

                // puis passer une épreuve éventuellement ?
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.coterie === Coterie.aucune
                && age(perso) >= 19,
        },
    ],
    probaParDefaut: 50,
};