import { Coterie } from "../../types/Coterie";
import {Vertus, BonMauvais } from "../../types/BonMauvais";

// chacun doit en avoir autant pour que ce soit plus équitable
export const affiniteViceVertuCoterie: Record<Coterie, BonMauvais[]> = {
    [Coterie.chaos]: [{
        valBon: -2,
        typeBon: Vertus.discipline,
    },{
        valBon: -2,
        typeBon: Vertus.prudent,
    }],
    [Coterie.acheron]: [
        {
        valBon: -1,
        typeBon: Vertus.altruiste,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: -1,
        typeBon: Vertus.humble,
    }],
    [Coterie.bastets]: [
        {
        valBon: -1,
        typeBon: Vertus.sobre,
    },{
        valBon: -1,
        typeBon: Vertus.loyal,
    },{
        valBon: -1,
        typeBon: Vertus.travailleur,
    },{
        valBon: -1,
        typeBon: Vertus.bienveillant,
    }],
    [Coterie.cathares]: [
        {
        valBon: 1,
        typeBon: Vertus.sobre,
    },{
        valBon: 1,
        typeBon: Vertus.chaste,
    },{
        valBon: 1,
        typeBon: Vertus.altruiste,
    },{
        valBon: 1,
        typeBon: Vertus.humble,
    }],
    [Coterie.carthaginois]: [
        {
        valBon: -2,
        typeBon: Vertus.genereux,
    },{
        valBon: -1,
        typeBon: Vertus.altruiste,
    },{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    }],
    [Coterie.conquistador]: [
        {
        valBon: 1,
        typeBon: Vertus.valeureux,
    },{
        valBon: -1,
        typeBon: Vertus.genereux,
    },{
        valBon: 1,
        typeBon: Vertus.loyal,
    },{
        valBon: -1,
        typeBon: Vertus.humble,
    }],
    [Coterie.culte_du_plaisir]:  [
        {
        valBon: -2,
        typeBon: Vertus.chaste,
    },{
        valBon: -1,
        typeBon: Vertus.bienveillant,
    },{
        valBon: -1,
        typeBon: Vertus.sobre,
    }],
    [Coterie.esprit_de_la_nature]: [
        {
        valBon: -3,
        typeBon: Vertus.artificialiste,
    },{
        valBon: 1,
        typeBon: Vertus.humble,
    }],
    [Coterie.celtes]: [
        {
        valBon: -1,
        typeBon: Vertus.humble,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.valeureux,
    },{
        valBon: -1,
        typeBon: Vertus.sobre,
    }],
    [Coterie.demokratos]: [
        {
        valBon: 2,
        typeBon: Vertus.sociable,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.loyal,
    }],
    [Coterie.elfes]: [
        {
        valBon: 1,
        typeBon: Vertus.chaste,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: -1,
        typeBon: Vertus.artificialiste,
    }],
    [Coterie.esthetes]:  [
        {
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.empathique,
    },{
        valBon: -1,
        typeBon: Vertus.travailleur,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: -1,
        typeBon: Vertus.artificialiste,
    }],
    [Coterie.jacobins]: [
        {
        valBon: -1,
        typeBon: Vertus.empathique,
    },{
        valBon: 1,
        typeBon: Vertus.artificialiste,
    },{
        valBon: 1,
        typeBon: Vertus.valeureux,
    },{
        valBon: 1,
        typeBon: Vertus.discipline,
    },{
        valBon: 1,
        typeBon: Vertus.sobre,
    }],
    [Coterie.libertins]: [
        {
        valBon: -1,
        typeBon: Vertus.chaste,
    },{
        valBon: -1,
        typeBon: Vertus.sobre,
    },{
        valBon: -2,
        typeBon: Vertus.discipline,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    }],
    [Coterie.lumieres]: [
        {
        valBon: -1,
        typeBon: Vertus.loyal,
    },{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: 1,
        typeBon: Vertus.artificialiste,
    },{
        valBon: -1,
        typeBon: Vertus.humble,
    },{
        valBon: -1,
        typeBon: Vertus.altruiste,
    }],
    [Coterie.ogres]: [
        {
        valBon: -2,
        typeBon: Vertus.sobre,
    },{
        valBon: -1,
        typeBon: Vertus.genereux,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    }],
    [Coterie.orks]: [{
        valBon: -1,
        typeBon: Vertus.travailleur,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.sociable,
    },{
        valBon: -1,
        typeBon: Vertus.discipline,
    },{
        valBon: -1,
        typeBon: Vertus.empathique,
    }],
    [Coterie.performeurs]: [{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: -1,
        typeBon: Vertus.altruiste,
    },{
        valBon: -2,
        typeBon: Vertus.humble,
    },{
        valBon: -1,
        typeBon: Vertus.chaste,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    }],
    [Coterie.romains]: [{
        valBon: 1,
        typeBon: Vertus.valeureux,
    },{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: -1,
        typeBon: Vertus.altruiste,
    }],
    [Coterie.saabi]: [{
        valBon: 1,
        typeBon: Vertus.genereux,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.sociable,
    }],
    [Coterie.schweizer]: [{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.sobre,
    },{
        valBon: -1,
        typeBon: Vertus.sociable,
    },{
        valBon: 1,
        typeBon: Vertus.prudent,
    }],
    [Coterie.skavens]: [{
        valBon: -1,
        typeBon: Vertus.valeureux,
    },{
        valBon: -1,
        typeBon: Vertus.loyal,
    },{
        valBon: -1,
        typeBon: Vertus.genereux,
    },{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: -1,
        typeBon: Vertus.altruiste,
    }],
    [Coterie.templiers]: [{
        valBon: 1,
        typeBon: Vertus.loyal,
    },{
        valBon: 1,
        typeBon: Vertus.humble,
    },{
        valBon: 1,
        typeBon: Vertus.chaste,
    },{
        valBon: 1,
        typeBon: Vertus.sobre,
    }],
    [Coterie.transhumanistes]: [{
        valBon: -1,
        typeBon: Vertus.genereux,
    },{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: 2,
        typeBon: Vertus.artificialiste,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    }],
    [Coterie.tyranides]:  [{
        valBon: 1,
        typeBon: Vertus.humble,
    },{
        valBon: 1,
        typeBon: Vertus.travailleur,
    },{
        valBon: -1,
        typeBon: Vertus.empathique,
    },{
        valBon: -1,
        typeBon: Vertus.chaste,
    },{
        valBon: 1,
        typeBon: Vertus.sobre,
    }],
    [Coterie.zaporogues]: [{
        valBon: -1,
        typeBon: Vertus.prudent,
    },{
        valBon: -1,
        typeBon: Vertus.sobre,
    },{
        valBon: -1,
        typeBon: Vertus.prudent,
    },{
        valBon: 1,
        typeBon: Vertus.sociable,
    }]
}