import {Coterie, EffectDeCoterieSurPerso} from "../../types/Coterie";
import {TypeCompetence} from "../../types/comps/Comps";

export function getEffetsDeCoterieSurCompetences(cot: Coterie): EffectDeCoterieSurPerso {
    switch (cot) {
        /*case Coterie.acheron: return Quartier.noisiel;
        case Coterie.bastets: return Quartier.montmartre;
        case Coterie.cathares: return Quartier.saint_maur_des_fosses;
        case Coterie.conquistador: return Quartier.montesson;
        case Coterie.culte_du_plaisir: return Quartier.palais_royal;
        case Coterie.elfes: return Quartier.saint_germain_en_laye;
        case Coterie.esprit_de_la_nature: return Quartier.bois_de_boulogne;
        case Coterie.esthetes: return Quartier.versailles;
        case Coterie.demokratos: return Quartier.vanves;
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