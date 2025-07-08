import { Coterie } from "../../types/Coterie";
import {TypeVertu, ViceVertu } from "../../types/ViceVertu";

// chacun doit en avoir autant pour que ce soit plus équitable
export const affiniteViceVertuCoterie: Record<Coterie, ViceVertu[]> = {
    [Coterie.aucune]: [],
    [Coterie.acheron]: [{
        valVertu: -1,
        typeVertu: TypeVertu.altruiste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.humble,
    }],
    [Coterie.culte_du_plaisir]: [],
    [Coterie.esprit_de_la_nature]: [],
    [Coterie.bastets]: [],
    [Coterie.cathares]: [],
    [Coterie.celtes]: [{
        valVertu: -1,
        typeVertu: TypeVertu.humble,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.valeureux,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.sobre,
    }],
    [Coterie.conquistador]: [],
    [Coterie.demokratos]: [],
    [Coterie.elfes]: [],
    [Coterie.esthetes]: [],
    [Coterie.jacobins]: [],
    [Coterie.libertins]: [],
    [Coterie.lumieres]: [],
    [Coterie.ogres]: [],
    [Coterie.orks]: [],
    [Coterie.performeurs]: [],
    [Coterie.romains]: [],
    [Coterie.saabi]: [],
    [Coterie.schweizer]: [],
    [Coterie.skavens]: [{
        valVertu: -1,
        typeVertu: TypeVertu.valeureux,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.loyal,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.genereux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.altruiste,
    }],
    [Coterie.templiers]: [{
        valVertu: 1,
        typeVertu: TypeVertu.loyal,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.humble,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.chaste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.sobre,
    }],
    [Coterie.transhumanistes]: [],
    [Coterie.tyranides]: [],
    [Coterie.zaporogues]: []
}