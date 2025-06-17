import {d10} from "../../fonctions/des";
import {Perso} from "../Perso";

export type Competence = {
    val: number,
    nbDeTestsFaits: number,
    typeComp: TypeCompetence,
}

export enum TypeCompetence {
    adresse = "Adresse",
    animaux = "Animaux",
    armeCaC = "Armes de corps à corps",
    bagarre = "Bagarre",
    chance = "Chance",
    charme = "Charme",
    commandement = "Commandement",
    dexterite = "Dextérité",
    discours = "Discours",
    discretion = "Discrétion",
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
}

export function compDeDepartAleatoire(): number {
    return 20 + d10() + d10();
}

export function getCompValue(perso: Perso, typeComp: TypeCompetence): number {
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

export const compsDeBase = () => Object.values(TypeCompetence)
    .map(typeComp => {
        return {
            val: compDeDepartAleatoire(),
            nbDeTestsFaits: 0,
            typeComp: typeComp,
        }
    });
