import { Coterie } from "../../types/Coterie";
import {Vertus, ViceVertu } from "../../types/ViceVertu";

// chacun doit en avoir autant pour que ce soit plus équitable
export const affiniteViceVertuCoterie: Record<Coterie, ViceVertu[]> = {
    [Coterie.chaos]: [{
        valVertu: -2,
        typeVertu: Vertus.discipline,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.spirituel,
    }],
    [Coterie.acheron]: [
        {
        valVertu: -1,
        typeVertu: Vertus.altruiste,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertus.humble,
    }],
    [Coterie.bastets]: [
        {
        valVertu: -1,
        typeVertu: Vertus.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertus.loyal,
    },{
        valVertu: -1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertus.bienveillant,
    }],
    [Coterie.cathares]: [
        {
        valVertu: 1,
        typeVertu: Vertus.sobre,
    },{
        valVertu: 1,
        typeVertu: Vertus.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertus.altruiste,
    },{
        valVertu: 1,
        typeVertu: Vertus.humble,
    },{
        valVertu: 1,
        typeVertu: Vertus.spirituel,
    }],
    [Coterie.carthaginois]: [
        {
        valVertu: -2,
        typeVertu: Vertus.genereux,
    },{
        valVertu: -1,
        typeVertu: Vertus.altruiste,
    },{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    }],
    [Coterie.conquistador]: [
        {
        valVertu: 1,
        typeVertu: Vertus.valeureux,
    },{
        valVertu: -1,
        typeVertu: Vertus.genereux,
    },{
        valVertu: 1,
        typeVertu: Vertus.loyal,
    },{
        valVertu: 1,
        typeVertu: Vertus.spirituel,
    }],
    [Coterie.culte_du_plaisir]:  [
        {
        valVertu: -2,
        typeVertu: Vertus.chaste,
    },{
        valVertu: -1,
        typeVertu: Vertus.bienveillant,
    },{
        valVertu: -1,
        typeVertu: Vertus.sobre,
    }],
    [Coterie.esprit_de_la_nature]: [
        {
        valVertu: -3,
        typeVertu: Vertus.artificialiste,
    },{
        valVertu: 1,
        typeVertu: Vertus.humble,
    }],
    [Coterie.celtes]: [
        {
        valVertu: -1,
        typeVertu: Vertus.humble,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.valeureux,
    },{
        valVertu: -1,
        typeVertu: Vertus.sobre,
    }],
    [Coterie.demokratos]: [
        {
        valVertu: 2,
        typeVertu: Vertus.sociable,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.loyal,
    }],
    [Coterie.elfes]: [
        {
        valVertu: 1,
        typeVertu: Vertus.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.artificialiste,
    }],
    [Coterie.esthetes]:  [
        {
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.empathique,
    },{
        valVertu: -1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.artificialiste,
    }],
    [Coterie.jacobins]: [
        {
        valVertu: -1,
        typeVertu: Vertus.empathique,
    },{
        valVertu: 1,
        typeVertu: Vertus.artificialiste,
    },{
        valVertu: 1,
        typeVertu: Vertus.valeureux,
    },{
        valVertu: 1,
        typeVertu: Vertus.discipline,
    },{
        valVertu: 1,
        typeVertu: Vertus.sobre,
    }],
    [Coterie.libertins]: [
        {
        valVertu: -1,
        typeVertu: Vertus.chaste,
    },{
        valVertu: -1,
        typeVertu: Vertus.sobre,
    },{
        valVertu: -2,
        typeVertu: Vertus.discipline,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    }],
    [Coterie.lumieres]: [
        {
        valVertu: -1,
        typeVertu: Vertus.loyal,
    },{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertus.artificialiste,
    },{
        valVertu: -1,
        typeVertu: Vertus.humble,
    },{
        valVertu: -1,
        typeVertu: Vertus.altruiste,
    }],
    [Coterie.ogres]: [
        {
        valVertu: -2,
        typeVertu: Vertus.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertus.genereux,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    }],
    [Coterie.orks]: [{
        valVertu: -1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.sociable,
    },{
        valVertu: -1,
        typeVertu: Vertus.discipline,
    },{
        valVertu: -1,
        typeVertu: Vertus.empathique,
    },{
        valVertu: -1,
        typeVertu: Vertus.spirituel,
    }],
    [Coterie.performeurs]: [{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertus.altruiste,
    },{
        valVertu: -2,
        typeVertu: Vertus.humble,
    },{
        valVertu: -1,
        typeVertu: Vertus.chaste,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    }],
    [Coterie.romains]: [{
        valVertu: 1,
        typeVertu: Vertus.valeureux,
    },{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.altruiste,
    }],
    [Coterie.saabi]: [{
        valVertu: 1,
        typeVertu: Vertus.genereux,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.sociable,
    }],
    [Coterie.schweizer]: [{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertus.sociable,
    },{
        valVertu: 1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.spirituel,
    }],
    [Coterie.skavens]: [{
        valVertu: -1,
        typeVertu: Vertus.valeureux,
    },{
        valVertu: -1,
        typeVertu: Vertus.loyal,
    },{
        valVertu: -1,
        typeVertu: Vertus.genereux,
    },{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertus.altruiste,
    }],
    [Coterie.templiers]: [{
        valVertu: 1,
        typeVertu: Vertus.loyal,
    },{
        valVertu: 1,
        typeVertu: Vertus.humble,
    },{
        valVertu: 1,
        typeVertu: Vertus.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertus.sobre,
    },{
        valVertu: 1,
        typeVertu: Vertus.spirituel,
    }],
    [Coterie.transhumanistes]: [{
        valVertu: -1,
        typeVertu: Vertus.genereux,
    },{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: 2,
        typeVertu: Vertus.artificialiste,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.spirituel,
    }],
    [Coterie.tyranides]:  [{
        valVertu: 1,
        typeVertu: Vertus.humble,
    },{
        valVertu: 1,
        typeVertu: Vertus.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertus.empathique,
    },{
        valVertu: -1,
        typeVertu: Vertus.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertus.sobre,
    }],
    [Coterie.zaporogues]: [{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertus.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertus.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertus.sociable,
    }]
}