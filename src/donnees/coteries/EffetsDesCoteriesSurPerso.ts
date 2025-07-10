import {Coterie, EffectDeCoterieSurPerso} from "../../types/Coterie";
import {TypeCompetence} from "../../types/comps/Comps";

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
        /*case Coterie.esthetes: return Quartier.versailles;
        case Coterie.jacobins: return Quartier.luxembourg;
        case Coterie.transhumanistes: return Quartier.la_defense;
        case Coterie.libertins: return Quartier.bondy;
        case Coterie.lumieres: return Quartier.maisons_laffite;
        case Coterie.orks: return Quartier.genevilliers;
        case Coterie.saabi: return Quartier.saint_ouen;
        case Coterie.schweizer: return Quartier.grande_crete;
        case Coterie.tyranides: return Quartier.argenteuil;
        case Coterie.zaporogues: return Quartier.suresnes;*/
        case Coterie.celtes: return {
            plus10Values: [TypeCompetence.intimidation, TypeCompetence.mouvement],
            plus5Values: [TypeCompetence.armeCaC, TypeCompetence.survie],
            minus10Values: [TypeCompetence.vigilance],
            minus5Values: [TypeCompetence.commandement],
        };
        case Coterie.templiers: return {
            plus10Values: [TypeCompetence.vigilance, TypeCompetence.volonte],
            plus5Values: [TypeCompetence.armeCaC, TypeCompetence.evaluation],
            minus10Values: [TypeCompetence.tromperie],
            minus5Values: [TypeCompetence.jeux],
        };
        case Coterie.skavens: return {
            plus10Values: [TypeCompetence.tromperie, TypeCompetence.mouvement],
            plus5Values: [TypeCompetence.adresse, TypeCompetence.discretion],
            minus10Values: [TypeCompetence.volonte],
            minus5Values: [TypeCompetence.vigilance],
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