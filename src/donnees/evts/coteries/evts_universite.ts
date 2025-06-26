import {Perso} from "../../../types/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {age} from "../../../types/Date";
import {calculerAffinite, Coterie} from "../../../types/Coterie";

export const evts_universite: GroupeEvts = {
    evts: [
        {
            id: "evts_universite1",
            description: (perso: Perso): string => {
                let texte: string = `Fin de l'univ ? tester la coterie avec la meilleure affinité : <br/>`

                Object.values(Coterie).forEach((co: Coterie) => {
                    texte += co.toString() + " : " + calculerAffinite(perso, co) + "<br/>";
                })

                // puis passer une épreuve éventuellement ?
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                //!aUneCarriere(perso) // si fin de l'université
                /*&&*/ age(perso) >= 14,
        },
    ],
    probaParDefaut: 99999999999999999999999995,
};