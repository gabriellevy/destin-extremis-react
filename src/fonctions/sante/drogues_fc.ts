import {Perso, PersoCommon} from "../../types/perso/Perso";
import {modifierStatut} from "../perso/statut";
import {Drogue} from "../../types/sante/Drogue";
import {droguesEnum, droguesObjs} from "../../donnees/sante/drogues";

export function seDroguer(perso: Perso, drogueEnum: droguesEnum):string {
    let texte = "";
    if (!perso.drogues.includes(drogueEnum)) {
        perso.drogues.push(drogueEnum);
        const drogue:Drogue = droguesObjs[drogueEnum];
        texte += modifierStatut(perso, - drogue.prix);
        texte += "Vous vous droguez à " + drogueEnum + ".";
    }
    return texte;
}

export function arreterDrogue(perso: PersoCommon, index:number):string {
    const drogue:droguesEnum = perso.drogues[index];
    perso.drogues.splice(index, 1);
    return "Vous renoncez à " + drogue + ".";
}

export function actuellementDrogueA(perso: Perso, drogueEnum: droguesEnum):boolean {
    return perso.drogues.includes(drogueEnum);
}

export function actuellementDrogueAQuelqueChose(perso: Perso):boolean {
    return perso.drogues.length > 0;
}