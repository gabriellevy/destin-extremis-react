import {Perso} from "../../types/perso/Perso";
import {PNJ} from "../../types/perso/PNJ";
import {NiveauAmour, NiveauRelationAmoureuse} from "../../types/perso/Amour";

export function supprimerPnj(perso:Perso, prenom: string, nom: string) {
    perso.pnjs = perso.pnjs.filter((pnj: PNJ) => !(pnj.nom === nom && pnj.prenom === prenom));
}

// essentiellement leur relation
export function descriptionPnj(pnj: PNJ): string {
    let description: string = "";
    // amour ?
    if (pnj.niveauRelationAmoureuse !== NiveauRelationAmoureuse.rien) {
        description += pnj.niveauRelationAmoureuse + " ";
    }
    if (pnj.amourPourCePnj === NiveauAmour.coupDeCoeur) {
        if (pnj.amourDeCePnj === NiveauAmour.coupDeCoeur) {
            description += "Amour mutuel";
        } else {
            description += "Coup de coeur";
        }
    }
    return description;
}