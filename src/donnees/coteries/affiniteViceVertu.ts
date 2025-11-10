import { Coterie } from "../../types/Coterie";
import {Vertu, ViceVertu } from "../../types/ViceVertu";

// chacun doit en avoir à peu près autant pour que ce soit plus équitable
// TODO : j'étais parti avec 4 mais c'est peu => à passer à 6 ou 7 avec plus à niveau 2 ou 3
export const affiniteViceVertuCoterie: Record<Coterie, ViceVertu[]> = {
    [Coterie.khaos]: [{
        valVertu: -2,
        typeVertu: Vertu.discipline,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.spirituel,
    }],
    [Coterie.acheron]: [
        {
        valVertu: -1,
        typeVertu: Vertu.altruiste,
    },{
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertu.humble,
    }],
    [Coterie.bastets]: [
        {
        valVertu: -1,
        typeVertu: Vertu.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertu.loyal,
    },{
        valVertu: -1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertu.bienveillant,
    }],
    [Coterie.cathares]: [
        {
        valVertu: 1,
        typeVertu: Vertu.sobre,
    },{
        valVertu: 1,
        typeVertu: Vertu.placide,
    },{
        valVertu: 1,
        typeVertu: Vertu.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertu.altruiste,
    },{
        valVertu: 1,
        typeVertu: Vertu.humble,
    },{
        valVertu: 1,
        typeVertu: Vertu.spirituel,
    }],
    [Coterie.carthaginois]: [
        {
        valVertu: -2,
        typeVertu: Vertu.genereux,
    },{
        valVertu: -1,
        typeVertu: Vertu.altruiste,
    },{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    }],
    [Coterie.conquistador]: [
        {
        valVertu: 1,
        typeVertu: Vertu.valeureux,
    },{
        valVertu: -1,
        typeVertu: Vertu.genereux,
    },{
        valVertu: 1,
        typeVertu: Vertu.loyal,
    },{
        valVertu: 1,
        typeVertu: Vertu.spirituel,
    }],
    [Coterie.culte_du_plaisir]:  [
        {
        valVertu: -2,
        typeVertu: Vertu.chaste,
    },{
        valVertu: -1,
        typeVertu: Vertu.bienveillant,
    },{
        valVertu: -1,
        typeVertu: Vertu.sobre,
    }],
    [Coterie.esprit_de_la_nature]: [
        {
        valVertu: -3,
        typeVertu: Vertu.artificialiste,
    },{
        valVertu: 1,
        typeVertu: Vertu.humble,
    }],
    [Coterie.celtes]: [
        {
        valVertu: -1,
        typeVertu: Vertu.humble,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.valeureux,
    },{
        valVertu: -1,
        typeVertu: Vertu.sobre,
    }],
    [Coterie.demokratos]: [
        {
        valVertu: 2,
        typeVertu: Vertu.sociable,
    },{
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.loyal,
    }],
    [Coterie.elfes]: [
        {
        valVertu: 1,
        typeVertu: Vertu.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.humble,
    },{
        valVertu: -1,
        typeVertu: Vertu.artificialiste,
    }],
    [Coterie.esthetes]:  [
        {
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.empathique,
    },{
        valVertu: -1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.artificialiste,
    }],
    [Coterie.jacobins]: [
        {
        valVertu: -1,
        typeVertu: Vertu.empathique,
    },{
        valVertu: 1,
        typeVertu: Vertu.artificialiste,
    },{
        valVertu: 1,
        typeVertu: Vertu.valeureux,
    },{
        valVertu: 1,
        typeVertu: Vertu.discipline,
    },{
        valVertu: 1,
        typeVertu: Vertu.sobre,
    }],
    [Coterie.libertins]: [
        {
        valVertu: -1,
        typeVertu: Vertu.chaste,
    },{
        valVertu: -1,
        typeVertu: Vertu.sobre,
    },{
        valVertu: -2,
        typeVertu: Vertu.discipline,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    }],
    [Coterie.lumieres]: [
        {
        valVertu: -1,
        typeVertu: Vertu.loyal,
    },{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertu.artificialiste,
    },{
        valVertu: -1,
        typeVertu: Vertu.humble,
    },{
        valVertu: -1,
        typeVertu: Vertu.altruiste,
    }],
    [Coterie.ogres]: [
        {
        valVertu: -2,
        typeVertu: Vertu.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertu.genereux,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    }],
    [Coterie.orks]: [{
        valVertu: -1,
        typeVertu: Vertu.placide,
    },{
        valVertu: -1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.sociable,
    },{
        valVertu: -1,
        typeVertu: Vertu.discipline,
    },{
        valVertu: -1,
        typeVertu: Vertu.empathique,
    },{
        valVertu: -1,
        typeVertu: Vertu.spirituel,
    }],
    [Coterie.performeurs]: [{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertu.altruiste,
    },{
        valVertu: -2,
        typeVertu: Vertu.humble,
    },{
        valVertu: -1,
        typeVertu: Vertu.chaste,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    }],
    [Coterie.romains]: [{
        valVertu: 1,
        typeVertu: Vertu.valeureux,
    },{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.altruiste,
    }],
    [Coterie.saabi]: [{
        valVertu: 1,
        typeVertu: Vertu.genereux,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.sociable,
    }],
    [Coterie.schweizer]: [{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertu.sociable,
    },{
        valVertu: 1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.spirituel,
    }],
    [Coterie.skavens]: [{
        valVertu: -1,
        typeVertu: Vertu.valeureux,
    },{
        valVertu: -1,
        typeVertu: Vertu.loyal,
    },{
        valVertu: -1,
        typeVertu: Vertu.genereux,
    },{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertu.altruiste,
    }],
    [Coterie.templiers]: [{
        valVertu: 1,
        typeVertu: Vertu.discipline,
    },{
        valVertu: 1,
        typeVertu: Vertu.loyal,
    },{
        valVertu: 1,
        typeVertu: Vertu.humble,
    },{
        valVertu: 1,
        typeVertu: Vertu.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertu.sobre,
    },{
        valVertu: 1,
        typeVertu: Vertu.spirituel,
    }],
    [Coterie.transhumanistes]: [{
        valVertu: -1,
        typeVertu: Vertu.genereux,
    },{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: 2,
        typeVertu: Vertu.artificialiste,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.spirituel,
    }],
    [Coterie.tyranides]:  [{
        valVertu: 1,
        typeVertu: Vertu.humble,
    },{
        valVertu: 1,
        typeVertu: Vertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: Vertu.empathique,
    },{
        valVertu: -1,
        typeVertu: Vertu.chaste,
    },{
        valVertu: 1,
        typeVertu: Vertu.sobre,
    }],
    [Coterie.zaporogues]: [{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: -1,
        typeVertu: Vertu.sobre,
    },{
        valVertu: -1,
        typeVertu: Vertu.prudent,
    },{
        valVertu: 1,
        typeVertu: Vertu.sociable,
    }]
}