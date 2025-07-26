import {Coterie, EffectDeCoterieSurPerso} from "../../types/Coterie";
import {TypeCompetence} from "../../types/perso/comps/Comps";

export function getEffetsDeCoterieSurCompetences(cot: Coterie): EffectDeCoterieSurPerso {
    switch (cot) {
        case Coterie.acheron: return {
            plus10Values: [TypeCompetence.intelligence, TypeCompetence.volonte],
            plus5Values: [TypeCompetence.intimidation, TypeCompetence.tromperie],
            minus10Values: [TypeCompetence.charme],
            minus5Values: [TypeCompetence.reflexes],
        };
        case Coterie.bastets: return {
            plus10Values: [TypeCompetence.charme, TypeCompetence.mouvement],
            plus5Values: [TypeCompetence.reflexes, TypeCompetence.discretion],
            minus10Values: [TypeCompetence.commandement],
            minus5Values: [TypeCompetence.force],
        };
        case Coterie.carthaginois: return {
            plus10Values: [TypeCompetence.evaluation, TypeCompetence.marchandage],
            plus5Values: [TypeCompetence.orientation, TypeCompetence.intuition],
            minus10Values: [TypeCompetence.force],
            minus5Values: [TypeCompetence.reflexes],
        };
        case Coterie.cathares: return {
            plus10Values: [TypeCompetence.volonte, TypeCompetence.endurance],
            plus5Values: [TypeCompetence.animaux, TypeCompetence.discretion],
            minus10Values: [TypeCompetence.bagarre],
            minus5Values: [TypeCompetence.evaluation],
        };
        case Coterie.celtes: return {
            plus10Values: [TypeCompetence.intimidation, TypeCompetence.mouvement],
            plus5Values: [TypeCompetence.armeCaC, TypeCompetence.survie],
            minus10Values: [TypeCompetence.vigilance],
            minus5Values: [TypeCompetence.commandement],
        };
        case Coterie.conquistador: return {
            plus10Values: [TypeCompetence.tir, TypeCompetence.survie],
            plus5Values: [TypeCompetence.orientation, TypeCompetence.armeCaC],
            minus10Values: [TypeCompetence.eloquence],
            minus5Values: [TypeCompetence.tromperie],
        };
        case Coterie.culte_du_plaisir: return {
            plus10Values: [TypeCompetence.charme, TypeCompetence.ragot],
            plus5Values: [TypeCompetence.adresse, TypeCompetence.eloquence],
            minus10Values: [TypeCompetence.survie],
            minus5Values: [TypeCompetence.intimidation],
        };
        case Coterie.esprit_de_la_nature: return {
            plus10Values: [TypeCompetence.animaux, TypeCompetence.survie],
            plus5Values: [TypeCompetence.orientation, TypeCompetence.perception],
            minus10Values: [TypeCompetence.tir],
            minus5Values: [TypeCompetence.evaluation],
        };
        case Coterie.demokratos: return {
            plus10Values: [TypeCompetence.eloquence, TypeCompetence.ragot],
            plus5Values: [TypeCompetence.intuition, TypeCompetence.commandement],
            minus10Values: [TypeCompetence.survie],
            minus5Values: [TypeCompetence.orientation],
        };
        case Coterie.elfes: return {
            plus10Values: [TypeCompetence.adresse, TypeCompetence.charme],
            plus5Values: [TypeCompetence.perception, TypeCompetence.mouvement],
            minus10Values: [TypeCompetence.endurance],
            minus5Values: [TypeCompetence.jeux],
        };
        case Coterie.jacobins: return {
            plus10Values: [TypeCompetence.volonte, TypeCompetence.eloquence],
            plus5Values: [TypeCompetence.commandement, TypeCompetence.vigilance],
            minus10Values: [TypeCompetence.orientation],
            minus5Values: [TypeCompetence.animaux],
        };
        case Coterie.lumieres: return {
            plus10Values: [TypeCompetence.intuition, TypeCompetence.tromperie],
            plus5Values: [TypeCompetence.eloquence, TypeCompetence.ragot],
            minus10Values: [TypeCompetence.force],
            minus5Values: [TypeCompetence.endurance],
        };
        case Coterie.orks: return {
            plus10Values: [TypeCompetence.endurance, TypeCompetence.bagarre],
            plus5Values: [TypeCompetence.force, TypeCompetence.intuition],
            minus10Values: [TypeCompetence.eloquence],
            minus5Values: [TypeCompetence.charme],
        };
        case Coterie.esthetes: return {
            plus10Values: [TypeCompetence.evaluation, TypeCompetence.perception],
            plus5Values: [TypeCompetence.adresse, TypeCompetence.eloquence],
            minus10Values: [TypeCompetence.reflexes],
            minus5Values: [TypeCompetence.vigilance],
        };
        case Coterie.libertins: return {
            plus10Values: [TypeCompetence.charme, TypeCompetence.intuition],
            plus5Values: [TypeCompetence.eloquence, TypeCompetence.intelligence],
            minus10Values: [TypeCompetence.intimidation],
            minus5Values: [TypeCompetence.commandement],
        };
        case Coterie.ogres: return {
            plus10Values: [TypeCompetence.force, TypeCompetence.endurance],
            plus5Values: [TypeCompetence.intimidation, TypeCompetence.bagarre],
            minus10Values: [TypeCompetence.intelligence],
            minus5Values: [TypeCompetence.charme],
        };
        case Coterie.romains: return {
            plus10Values: [TypeCompetence.volonte, TypeCompetence.vigilance],
            plus5Values: [TypeCompetence.commandement, TypeCompetence.tir],
            minus10Values: [TypeCompetence.reflexes],
            minus5Values: [TypeCompetence.charme],
        };
        case Coterie.zaporogues: return {
            plus10Values: [TypeCompetence.survie, TypeCompetence.orientation],
            plus5Values: [TypeCompetence.animaux, TypeCompetence.tir],
            minus10Values: [TypeCompetence.evaluation],
            minus5Values: [TypeCompetence.charme],
        };
        case Coterie.performeurs: return {
            plus10Values: [TypeCompetence.vigilance, TypeCompetence.force],
            plus5Values: [TypeCompetence.volonte, TypeCompetence.mouvement],
            minus10Values: [TypeCompetence.chance],
            minus5Values: [TypeCompetence.intuition],
        };
        case Coterie.saabi: return {
            plus10Values: [TypeCompetence.adresse, TypeCompetence.mouvement],
            plus5Values: [TypeCompetence.tromperie, TypeCompetence.marchandage],
            minus10Values: [TypeCompetence.reflexes],
            minus5Values: [TypeCompetence.charme],
        };
        case Coterie.schweizer: return {
            plus10Values: [TypeCompetence.evaluation, TypeCompetence.volonte],
            plus5Values: [TypeCompetence.tir, TypeCompetence.dexterite],
            minus10Values: [TypeCompetence.charme],
            minus5Values: [TypeCompetence.eloquence],
        };
        case Coterie.templiers: return {
            plus10Values: [TypeCompetence.vigilance, TypeCompetence.volonte],
            plus5Values: [TypeCompetence.armeCaC, TypeCompetence.evaluation],
            minus10Values: [TypeCompetence.tromperie],
            minus5Values: [TypeCompetence.jeux],
        };
        case Coterie.skavens: return {
            plus10Values: [TypeCompetence.tromperie, TypeCompetence.reflexes],
            plus5Values: [TypeCompetence.adresse, TypeCompetence.discretion],
            minus10Values: [TypeCompetence.volonte],
            minus5Values: [TypeCompetence.vigilance],
        };
        case Coterie.transhumanistes: return {
            plus10Values: [TypeCompetence.intelligence, TypeCompetence.evaluation],
            plus5Values: [TypeCompetence.adresse, TypeCompetence.marchandage],
            minus10Values: [TypeCompetence.animaux],
            minus5Values: [TypeCompetence.survie],
        };
        case Coterie.tyranides: return {
            plus10Values: [TypeCompetence.vigilance, TypeCompetence.volonte],
            plus5Values: [TypeCompetence.endurance, TypeCompetence.discretion],
            minus10Values: [TypeCompetence.eloquence],
            minus5Values: [TypeCompetence.charme],
        };
    }
    console.warn("Pas d'effet de rejoindre une coterie pour la coterie : " + cot)
    return {
        plus10Values: [],
        plus5Values: [],
        minus10Values: [],
        minus5Values: [],
    };
}