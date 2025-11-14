import {Quartier} from "../geographie/quartiers";
import {Coterie} from "../../types/Coterie";

export function getQuartierDeCoterie(cot: Coterie): Quartier {
    switch (cot) {
        case Coterie.acheron: return Quartier.noisiel;
        case Coterie.bastets: return Quartier.montmartre;
        case Coterie.cathares: return Quartier.saint_maur_des_fosses;
        case Coterie.celtes: return Quartier.chatenay_malabry;
        case Coterie.khaos: return Quartier.montreuil;
        case Coterie.conquistador: return Quartier.montesson;
        case Coterie.hedonistes: return Quartier.palais_royal;
        case Coterie.elfes: return Quartier.saint_germain_en_laye;
        case Coterie.esprit_de_la_nature: return Quartier.bois_de_boulogne;
        case Coterie.esthetes: return Quartier.versailles;
        case Coterie.demokratos: return Quartier.vanves;
        case Coterie.jacobins: return Quartier.luxembourg;
        case Coterie.transhumanistes: return Quartier.la_defense;
        case Coterie.libertins: return Quartier.bondy;
        case Coterie.lumieres: return Quartier.maisons_laffite;
        case Coterie.ogres: return Quartier.rungis;
        case Coterie.orks: return Quartier.genevilliers;
        case Coterie.saabi: return Quartier.saint_ouen;
        case Coterie.schweizer: return Quartier.grande_crete;
        case Coterie.skavens: return Quartier.catacombes_de_paris;
        case Coterie.templiers: return Quartier.saint_denis;
        case Coterie.tyranides: return Quartier.argenteuil;
        case Coterie.zaporogues: return Quartier.suresnes;
        case Coterie.carthaginois: return Quartier.marseille;
    }
    console.error("Cette coterie " + cot + " n'a pas de quartier. ");
    return Quartier.inconnu;
}