/*
Les talents sont des genres de compétences booléennes
Il n'y a pas de raison d'ajouter tous les talents de warhammer, seulement des talents ayant de la personnalité
et qui déclenchent des événements
-> certaines compétences peu intéressante sont transformées en talents comme la natation
 */

export enum Maitrise {
    beni = "Béni", // béni par un dieu (celui de perso.dieu), permet d'accomplir des miracles
    natation = "Natation",
    poesie = "Poesie",
    chant = "Chant",
    catechisme = "Catéchisme",
    cuisine = "Cuisine",
    conduite_voiture = "Conduite de voiture",
    pilotage_avion = "Pilotage d'avion",

    // diplômes :
    diplome_journalisme = "Diplôme de journalisme",
}
