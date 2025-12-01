import {Perso, PersoCommon} from "../../types/perso/Perso";
import {coutPossession, Possession, PossessionEnum} from "../../donnees/possessions/Possession";
import {modifierStatut} from "../perso/statut";
import {ajouteLigneDeTexteItalique} from "../texte_fc";

export function acquerir(perso: Perso, possessionEnum: PossessionEnum):string {
    return acquerirEtNomme(perso, possessionEnum, '');
}

export function perdre(perso: Perso, possessionEnum: PossessionEnum):string {
    if (possede(perso, possessionEnum)) {
        const indexPossession = perso.possessions.findIndex((possession: Possession) => possessionEnum === possession.possessionEnum);
        if (indexPossession != -1) {
            perso.possessions.splice(indexPossession, 1);
            return ajouteLigneDeTexteItalique("Vous avez perdu " + possessionEnum + ". ");
        }
    }
    return "";
}

export function acquerirEtNomme(perso: PersoCommon, possessionEnum: PossessionEnum, nomPossession: string):string {
    let texte = "";
    perso.possessions.push({
        possessionEnum: possessionEnum,
        nom: nomPossession
    });
    texte += ajouteLigneDeTexteItalique(modifierStatut(perso, - coutPossession(possessionEnum)));
    texte += "Vous possédez maintenant : " + possessionEnum;
    texte += (nomPossession !== undefined && nomPossession !== '') ?
        " appelé " + nomPossession
        : "";
    texte += ".<br/>";
    return texte;
}

export function possede(perso:PersoCommon, possessionEnum: PossessionEnum):boolean {
    return perso.possessions.filter((possession: Possession) => possessionEnum === possession.possessionEnum).length > 0;
}