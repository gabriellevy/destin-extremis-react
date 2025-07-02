/*
Les talents sont des genres de compétences booléennes rares
Il n'y a pas de raison d'ajouter tous les talents de warhammer, seulement des talents ayant de la personnalité
et qui déclenchent des événements
-> certaines compétences peu intéressante sont transformées en talents comme la natation
 */

import {Perso} from "../types/Perso";

export enum Maitrise {
    beni = "Béni", // béni par un dieu (celui de perso.dieu), permet d'accomplir des miracles
    natation = "Natation",
    poesie = "Poesie",
    cuisine = "Cuisine",
}

export function aLaMaitrise(perso: Perso, maitrise: Maitrise): boolean {
    return perso.maitrises.find((tal: Maitrise) => tal === maitrise) !== undefined;
}

export function ajouterMaitrise(perso: Perso, maitrise: Maitrise): void {
    perso.maitrises.push(maitrise);
}
