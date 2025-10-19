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
    chance = "Chance",
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
    orientation = "Orientation",
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
        case TypeCompetence.orientation:
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
// limite à +25 ?? // TODO : remplir ça , éventuellement avec une fonction (moins brutale la montée ??)
export const seuils: number[] = [
    3,
    7,
    15,
    31,
    63,
    127,
    255,
    511,
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