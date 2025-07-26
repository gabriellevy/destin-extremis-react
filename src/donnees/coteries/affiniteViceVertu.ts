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
    [Coterie.bastets]: [{
        valVertu: -1,
        typeVertu: TypeVertu.sobre,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.loyal,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.bienveillant,
    }],
    [Coterie.cathares]: [{
        valVertu: 1,
        typeVertu: TypeVertu.sobre,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.chaste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.altruiste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.humble,
    }],
    [Coterie.carthaginois]: [{
        valVertu: -2,
        typeVertu: TypeVertu.genereux,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.altruiste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.aventureux,
    }],
    [Coterie.conquistador]: [{
        valVertu: 1,
        typeVertu: TypeVertu.valeureux,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.genereux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.loyal,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.humble,
    }],
    [Coterie.culte_du_plaisir]:  [{
        valVertu: -2,
        typeVertu: TypeVertu.chaste,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.bienveillant,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.sobre,
    }],
    [Coterie.esprit_de_la_nature]: [{
        valVertu: 3,
        typeVertu: TypeVertu.naturaliste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.humble,
    }],
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
    [Coterie.demokratos]: [{
        valVertu: 2,
        typeVertu: TypeVertu.sociable,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.aventureux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.loyal,
    }],
    [Coterie.elfes]: [{
        valVertu: 1,
        typeVertu: TypeVertu.chaste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.aventureux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.naturaliste,
    }],
    [Coterie.esthetes]:  [{
        valVertu: 1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.empathique,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.aventureux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.naturaliste,
    }],
    [Coterie.jacobins]: [{
        valVertu: -1,
        typeVertu: TypeVertu.empathique,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.naturaliste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.valeureux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.discipline,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.sobre,
    }],
    [Coterie.libertins]: [{
        valVertu: -1,
        typeVertu: TypeVertu.chaste,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.sobre,
    },{
        valVertu: -2,
        typeVertu: TypeVertu.discipline,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.aventureux,
    }],
    [Coterie.lumieres]: [{
        valVertu: -1,
        typeVertu: TypeVertu.loyal,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.naturaliste,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.humble,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.altruiste,
    }],
    [Coterie.ogres]: [{
        valVertu: -2,
        typeVertu: TypeVertu.sobre,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.genereux,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.aventureux,
    }],
    [Coterie.orks]: [{
        valVertu: -1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.sociable,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.discipline,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.empathique,
    }],
    [Coterie.performeurs]: [{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.altruiste,
    },{
        valVertu: -2,
        typeVertu: TypeVertu.humble,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.chaste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.aventureux,
    }],
    [Coterie.romains]: [{
        valVertu: 1,
        typeVertu: TypeVertu.valeureux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.altruiste,
    }],
    [Coterie.saabi]: [{
        valVertu: 1,
        typeVertu: TypeVertu.genereux,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.aventureux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.sociable,
    }],
    [Coterie.schweizer]: [{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.sobre,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.sociable,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.aventureux,
    }],
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
    [Coterie.transhumanistes]: [{
        valVertu: -1,
        typeVertu: TypeVertu.genereux,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -2,
        typeVertu: TypeVertu.naturaliste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.aventureux,
    }],
    [Coterie.tyranides]:  [{
        valVertu: 1,
        typeVertu: TypeVertu.humble,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.travailleur,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.empathique,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.chaste,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.sobre,
    }],
    [Coterie.zaporogues]: [{
        valVertu: 1,
        typeVertu: TypeVertu.aventureux,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.sobre,
    },{
        valVertu: -1,
        typeVertu: TypeVertu.prudent,
    },{
        valVertu: 1,
        typeVertu: TypeVertu.sociable,
    }]
}