import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVice, TypeVice} from "../../../types/ViceVertu";
import {genererPNJAmourableDePerso} from "../../../fonctions/generation";
import {PNJ} from "../../../types/perso/PNJ";
import {NiveauAmour} from "../../../types/perso/Amour";
import {enCoupleAvecUnAmourFort} from "../../../fonctions/pnjs/amour";

export const evts_amour: GroupeEvts = {
    evts: [
        {
            id: "evts_amour1",
            description: (perso: Perso): string => {
                const coupDeCoeur:PNJ = genererPNJAmourableDePerso(perso);
                coupDeCoeur.amourPourCePnj = NiveauAmour.coupDeCoeur;
                perso.pnjs.push(coupDeCoeur);
                return "Vous avez un coup de cœur pour " + coupDeCoeur.prenom + ". <br/>";
            },
            conditions: (perso: Perso): boolean =>
                getValeurVice(perso, TypeVice.luxurieux) >= 0
                && !enCoupleAvecUnAmourFort(perso)
                && perso.age >= 13,
        },
    ],
    probaParDefaut: 10,
};