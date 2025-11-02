import {TypeCompetence} from "../../types/perso/comps/Comps";
import {Vertu, Vice} from "../../types/ViceVertu";


export function vicesAssociesACompetence(typeCompetence: TypeCompetence): Vice[] {
    switch (typeCompetence) {
        case TypeCompetence.adresse: return [
            Vice.impulsif,
            Vice.luxurieux,
            Vice.trompeur,
        ]
        case TypeCompetence.animaux: return [
            Vice.cruel,
            Vice.solitaire,
            Vice.orgueilleux,
            Vice.naturaliste,
        ]
        case TypeCompetence.armeCaC: return [
            Vice.cruel,
            Vice.colerique,
            Vice.orgueilleux,
        ]
        case TypeCompetence.bagarre: return [
            Vice.cruel,
            Vice.colerique,
            Vice.rebelle,
            Vice.impulsif,
        ]
        case TypeCompetence.chance: return [
            Vice.impulsif,
            Vice.paresseux,
            Vice.orgueilleux,
        ]
        case TypeCompetence.charme: return [
            Vice.luxurieux,
        ]
        case TypeCompetence.commandement: return [
            Vice.envieux,
            Vice.orgueilleux,
            Vice.sociopathique,
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
        case TypeCompetence.evaluation: return [
            Vice.gourmand,
            Vice.cupide,
            Vice.envieux,
        ]
        case TypeCompetence.force: return [
            Vice.gourmand,
            Vice.orgueilleux,
            Vice.luxurieux,
        ]
        case TypeCompetence.intelligence: return [
            Vice.orgueilleux,
        ]
        case TypeCompetence.intimidation: return [
            Vice.cruel,
            Vice.paresseux,
            Vice.orgueilleux,
            Vice.colerique,
        ]
        case TypeCompetence.intuition: return [
            Vice.impulsif,
            Vice.rebelle,
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
        case TypeCompetence.orientation : return [
            Vice.naturaliste,
            Vice.solitaire,
        ]
        case TypeCompetence.ragot : return [
            Vice.trompeur,
            Vice.paresseux,
            Vice.gourmand,
            Vice.cruel,
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
        case TypeCompetence.adresse : return [
            Vertu.travailleur,
        ]
        case TypeCompetence.animaux : return [
            Vertu.altruiste,
            Vertu.empathique,
        ]
        case TypeCompetence.armeCaC : return [
            Vertu.valeureux,
        ]
        case TypeCompetence.bagarre : return [
            Vertu.valeureux,
        ]
        case TypeCompetence.chance: return [
            Vertu.altruiste,
            Vertu.genereux,
        ]
        case TypeCompetence.charme: return [
            Vertu.genereux,
            Vertu.bienveillant,
            Vertu.sociable,
            Vertu.placide,
        ]
        case TypeCompetence.commandement: return [
            Vertu.loyal,
            Vertu.sociable,
            Vertu.discipline,
            Vertu.prudent,
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
        case TypeCompetence.evaluation: return [
            Vertu.prudent,
        ]
        case TypeCompetence.force: return [
            Vertu.valeureux,
        ]
        case TypeCompetence.endurance : return [
            Vertu.sobre,
            Vertu.prudent,
            Vertu.placide,
            Vertu.discipline,
        ]
        case TypeCompetence.intelligence: return [
            Vertu.artificialiste,
            Vertu.prudent,
            Vertu.placide,
        ]
        case TypeCompetence.intuition: return [
            Vertu.genereux,
            Vertu.altruiste,
        ]
        case TypeCompetence.marchandage : return [
            Vertu.artificialiste,
        ]
        case TypeCompetence.mouvement : return [
            Vertu.sobre,
        ]
        case TypeCompetence.orientation : return [
            Vertu.prudent,
            Vertu.placide,
        ]
        case TypeCompetence.ragot : return [
            Vertu.sociable,
            Vertu.loyal,
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