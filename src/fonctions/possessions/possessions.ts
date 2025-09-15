import {Perso} from "../../types/perso/Perso";
import {coutPossession, Possession} from "../../donnees/possessions/Possession";
import {modifierStatut} from "../perso/statut";

export function acquerir(perso: Perso, possession: Possession):string {
    let texte = "";
    if (!perso.possessions.includes(possession)) {
        perso.possessions.push(possession);
        texte += modifierStatut(perso, - coutPossession(possession));
        texte += "<br/>Vous possédez maintenant : " + possession + ".";
    }
    return texte;
}
