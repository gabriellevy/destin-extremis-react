import {Perso} from "../../types/perso/Perso";
import {PNJ} from "../../types/perso/PNJ";
import {NiveauAmour} from "../../types/perso/Amour";

export function supprimerPnj(perso:Perso, prenom: string, nom: string) {
    perso.pnjs = perso.pnjs.filter((pnj: PNJ) => !(pnj.nom === nom && pnj.prenom === prenom));
}

// essentiellement leur relation
export function descriptionPnj(pnj: PNJ): string {
    let description: string = "";
    // amour ?
    if (pnj.amourPourCePnj === NiveauAmour.coupDeCoeur) {
        if (pnj.amourDeCePnj === NiveauAmour.coupDeCoeur) {
            description += "Coup de foudre mutuel";
        } else {
            description += "Coup de coeur";
        }
    }
    return description;
}