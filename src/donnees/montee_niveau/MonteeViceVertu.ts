import {TypeCompetence} from "../../types/perso/comps/Comps";
import {Vertu, Vice} from "../../types/ViceVertu";


export function vicesAssociesACompetence(typeCompetence: TypeCompetence): Vice[] {
    switch (typeCompetence) {
        case TypeCompetence.armeCaC: return [
            Vice.cruel,
            Vice.colerique,
            Vice.orgueilleux,
        ]
        case TypeCompetence.charme: return [
            Vice.luxurieux,
        ]
        case TypeCompetence.discretion: return [
            Vice.lache,
            Vice.trompeur,
            Vice.solitaire,
        ]
        case TypeCompetence.eloquence: return [
            Vice.trompeur,
            Vice.orgueilleux,
        ]
        case TypeCompetence.intimidation: return [
            Vice.cruel,
            Vice.paresseux,
            Vice.orgueilleux,
            Vice.colerique,
        ]
        case TypeCompetence.marchandage : return [
            Vice.trompeur,
            Vice.cupide,
            Vice.envieux,
        ]
        case TypeCompetence.mouvement : return [
            Vice.rebelle,
            Vice.impulsif,
            Vice.lache,
        ]
        case TypeCompetence.survie : return [
            Vice.naturaliste,
            Vice.solitaire,
        ]

        default: {
            return [];
        }
    }
}

export function vertusAssociesACompetence(typeCompetence: TypeCompetence): Vertu[] {
    switch (typeCompetence) {
        case TypeCompetence.armeCaC : return [
            Vertu.valeureux,
        ]
        case TypeCompetence.charme: return [
            Vertu.genereux,
            Vertu.bienveillant,
            Vertu.sociable,
            Vertu.placide,
        ]
        case TypeCompetence.discretion: return [
            Vertu.prudent,
            Vertu.humble,
            Vertu.placide,
        ]
        case TypeCompetence.eloquence : return [
            Vertu.loyal,
            Vertu.sociable,
        ]
        case TypeCompetence.endurance : return [
            Vertu.sobre,
            Vertu.prudent,
            Vertu.placide,
            Vertu.discipline,
        ]
        case TypeCompetence.marchandage : return [
            Vertu.artificialiste,
        ]
        case TypeCompetence.mouvement : return [
            Vertu.sobre,
        ]
        case TypeCompetence.survie : return [
            Vertu.discipline,
            Vertu.sobre,
        ]
        default: {
            return [];
        }
    }
}