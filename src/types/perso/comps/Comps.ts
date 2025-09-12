import {d10} from "../../../fonctions/des";
import {Perso, PersoCommon} from "../Perso";

export type Competence = {
    val: number,
    nbDeTestsFaits: number,
    typeComp: TypeCompetence,
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
    dexterite = "Dextérité",
    discretion = "Discrétion",
    eloquence = "Éloquence",
    endurance = "Endurance",
    evaluation = "Évaluation",
    force = "Force",
    intelligence = "Intelligence",
    intimidation = "Intimidation",
    intuition = "Intuition",
    jeux = "Jeux",
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
        case TypeCompetence.dexterite:
        case TypeCompetence.eloquence:
        case TypeCompetence.discretion:
        case TypeCompetence.endurance:
        case TypeCompetence.evaluation:
        case TypeCompetence.force:
        case TypeCompetence.intelligence:
        case TypeCompetence.intimidation:
        case TypeCompetence.intuition:
        case TypeCompetence.jeux:
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

export function getValeurCompetence(perso: PersoCommon, typeComp: TypeCompetence): number {
    return perso.comps.find((comp: Competence) => comp.typeComp === typeComp)?.val || -1;
}

export function getCompNbDeTestsFaits(perso: Perso, typeComp: TypeCompetence): number {
    return perso.comps.find((comp: Competence) => comp.typeComp === typeComp)?.nbDeTestsFaits || 0;
}

// seuils de progression des comps (en nombres de tests sur ces comps)
// limite à +25 ?? // TODO : remplir ça , éventuellement avec une fonction
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

export function augmenterCompetence(perso: PersoCommon,typeComp: TypeCompetence, val: number): string {
    const comp: Competence | undefined = perso.comps.find((comp:Competence) => comp.typeComp === typeComp);
    if (comp !== undefined) {
        comp.val += val;
        return (val> 0 ? "+" : "") + val + " " + typeComp.toString() + "<br/>";
    } else {
        console.warn("Impossible de modifier la valeur de la compétence : " + typeComp + " de " + val);
    }
    return "Impossible de modifier la valeur de la compétence : " + typeComp + " de " + val;
}

export function augmenterNbDeTestsFaitsComp(perso: Perso, typeComp: TypeCompetence): string {
    const comp: Competence | undefined = perso.comps.find((comp:Competence) => comp.typeComp === typeComp);
    let texte: string = "";
    if (comp !== undefined) {
        const nbTests: number = comp.nbDeTestsFaits + 1;
        comp.nbDeTestsFaits = nbTests;
        if (seuils.includes(nbTests)) {
            // gain d'un point de compétence :
            if (comp) {
                comp.val += 1;
                texte = "<b>+1 en " + comp.typeComp.toString() + ". </b> ";
            }
        }
    }
    return texte;
}

export function compsDeBase (): Competence[] {
    return Object.values(TypeCompetence)
        .map((typeComp: TypeCompetence) => {
            return {
                val: compDeDepartAleatoire(),
                nbDeTestsFaits: 0,
                typeComp: typeComp,
            }
        });
}