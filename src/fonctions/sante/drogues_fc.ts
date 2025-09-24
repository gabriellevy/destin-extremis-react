import {Perso} from "../../types/perso/Perso";
import {modifierStatut} from "../perso/statut";
import {Drogue} from "../../types/sante/Drogue";
import {droguesEnum, droguesObjs} from "../../donnees/sante/drogues";

export function seDroguer(perso: Perso, drogueEnum: droguesEnum):string {
    let texte = "";
    if (!perso.drogues.includes(drogueEnum)) {
        perso.drogues.push(drogueEnum);
        const drogue:Drogue = droguesObjs[drogueEnum];
        texte += modifierStatut(perso, - drogue.prix);
        texte += "<br/>Vous vous droguez à " + drogueEnum + ".";
    }
    return texte;
}

export function actuellementDrogueA(perso: Perso, drogueEnum: droguesEnum):boolean {
    return perso.drogues.includes(drogueEnum);
}