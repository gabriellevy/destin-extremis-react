import {Perso} from "../../types/perso/Perso";
import {Maitrise} from "../../donnees/maitrise";
import {ajouteLigneDeTexteGras} from "../texte_fc";

export function aLaMaitrise(perso: Perso, maitrise: Maitrise): boolean {
    return perso.maitrises.find((tal: Maitrise) => tal === maitrise) !== undefined;
}

export function ajouterMaitrise(perso: Perso, maitrise: Maitrise): string {
    perso.maitrises.push(maitrise);
    return ajouteLigneDeTexteGras("Apprentissage de la maîtrise " + maitrise.toString() + ".");
}