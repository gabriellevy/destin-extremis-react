import {Perso, PersoCommon} from "../../types/perso/Perso";
import {coutPossession, Possession, PossessionEnum} from "../../donnees/possessions/Possession";
import {modifierStatut} from "../perso/statut";

export function acquerir(perso: Perso, possessionEnum: PossessionEnum):string {
    return acquerirEtNomme(perso, possessionEnum, '');
}

export function acquerirEtNomme(perso: PersoCommon, possessionEnum: PossessionEnum, nomPossession: string):string {
    let texte = "";
    perso.possessions.push({
        possessionEnum: possessionEnum,
        nom: nomPossession
    });
    texte += modifierStatut(perso, - coutPossession(possessionEnum));
    texte += "<br/>Vous possédez maintenant : " + possessionEnum +
        nomPossession !== undefined && nomPossession !== '' ?
        " appelé " + nomPossession + "."
        : ".";
    return texte;
}

export function possede(perso:PersoCommon, possessionEnum: PossessionEnum):boolean {
    return perso.possessions.filter((possession: Possession) => possessionEnum === possession.possessionEnum).length > 0;
}