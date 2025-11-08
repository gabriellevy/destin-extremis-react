import {d10} from "../../../fonctions/des";

export type Competence = {
    val: number,
    nbDeTestsFaits: number,
    typeComp: TypeCompetence,
    // nombre de montée de niveau pour cette compétence que le joueur a encore à appliquer
    nbMonteeDeNiveau: number,
}

export type ModificateurCompetence = {
    typeComp: string,//TypeCompetence,
    val: number;
}

export enum TypeCompetence {
    // compétences de base (tout le monde les a)
    adresse = "Adresse",
    animaux = "Animaux",
    armeCaC = "Armes de corps à corps",
    bagarre = "Bagarre",
    chance = "Chance", // inclut aussi la grâce divine incompréhensibles aux mortels, le destin etc
    charme = "Charme",
    commandement = "Commandement",
    discretion = "Discrétion",
    eloquence = "Éloquence",
    endurance = "Endurance",
    evaluation = "Évaluation",
    force = "Force",
    intelligence = "Intelligence",
    intimidation = "Intimidation",
    intuition = "Intuition",
    marchandage = "Marchandage",
    mouvement = "Mouvement",
    periple = "Périple", // capcité à voyager. Inclut orientation, facilité à s'intégrer aux autres cultures à apprendre les langues...
    perception = "Perception",
    ragot = "Ragot",
    reflexes = "Réflexes",
    survie = "Survie",
    tir = "Tir",
    tromperie = "Tromperie",
    vigilance = "Vigilance",
    volonte = "Volonté",

    // compétences spécialisées / professionnelles :
    art_ecriture = "Art (écriture)",
    art_sculpture = "Art (Sculpture)",
    art_peinture = "Art (Peinture)",
    crochetage = "Crochetage",
    dressage = "Dressage",
    guerison = "Guérison",
    musicien = "Musicien",
    piegeage = "Piégeage",
    pistage = "Pistage",
    priere = "Prière",
    recherche = "Recherche",
    navigation = "Navigation",
    gestion_de_patrimoine = "Gestion de patrimoine",
}

export function isCompDeBase(typeCompetence: TypeCompetence): boolean {
    switch (typeCompetence) {
        case TypeCompetence.adresse:
        case TypeCompetence.animaux:
        case TypeCompetence.armeCaC:
        case TypeCompetence.bagarre:
        case TypeCompetence.chance:
        case TypeCompetence.charme:
        case TypeCompetence.commandement:
        case TypeCompetence.eloquence:
        case TypeCompetence.discretion:
        case TypeCompetence.endurance:
        case TypeCompetence.evaluation:
        case TypeCompetence.force:
        case TypeCompetence.intelligence:
        case TypeCompetence.intimidation:
        case TypeCompetence.intuition:
        case TypeCompetence.marchandage:
        case TypeCompetence.mouvement:
        case TypeCompetence.periple:
        case TypeCompetence.perception:
        case TypeCompetence.ragot:
        case TypeCompetence.reflexes:
        case TypeCompetence.survie:
        case TypeCompetence.tir:
        case TypeCompetence.tromperie:
        case TypeCompetence.vigilance:
        case TypeCompetence.volonte:
            return true;
        default:
            return false;
    }
}

export function compDeDepartAleatoire(): number {
    return 20 + d10() + d10();
}

// seuils de progression des comps (en nombres de tests sur ces comps)
// c'est limité à 80 augmentation ce qui est énorme, le réglage sera géré un de ces jours.
export const seuils: number[] = [
    3, 7, 12, 18, 25, 33, 42, 52, 63, 75,
    88, 102, 117, 133, 150, 168, 187, 207, 228, 250,
    273, 297, 322, 348, 375, 403, 432, 462, 493, 525,
    558, 592, 627, 663, 700, 738, 777, 817, 858, 900,
    943, 987, 1032, 1078, 1125, 1173, 1222, 1272, 1323, 1375,
    1428, 1482, 1537, 1593, 1650, 1708, 1767, 1827, 1888, 1950,
    2013, 2077, 2142, 2208, 2275, 2343, 2412, 2482, 2553, 2625,
    2698, 2772, 2847, 2923, 3000, 3078, 3157, 3237, 3318, 3400
];

export function compsDeBase (): Competence[] {
    return Object.values(TypeCompetence)
        .map((typeComp: TypeCompetence) => {
            return {
                val: compDeDepartAleatoire(),
                nbDeTestsFaits: 0,
                typeComp: typeComp,
                nbMonteeDeNiveau: 0,
            }
        });
}