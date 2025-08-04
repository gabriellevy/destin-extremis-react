import { Coterie } from "../../types/Coterie";
import {TypeBon, BonMauvais } from "../../types/BonMauvais";

// chacun doit en avoir autant pour que ce soit plus équitable
export const affiniteViceVertuCoterie: Record<Coterie, BonMauvais[]> = {
    [Coterie.aucune]: [],
    [Coterie.chaos]: [{
        valBon: -2,
        typeBon: TypeBon.discipline,
    },{
        valBon: -2,
        typeBon: TypeBon.prudent,
    }],
    [Coterie.acheron]: [{
        valBon: -1,
        typeBon: TypeBon.altruiste,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.humble,
    }],
    [Coterie.bastets]: [{
        valBon: -1,
        typeBon: TypeBon.sobre,
    },{
        valBon: -1,
        typeBon: TypeBon.loyal,
    },{
        valBon: -1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.bienveillant,
    }],
    [Coterie.cathares]: [{
        valBon: 1,
        typeBon: TypeBon.sobre,
    },{
        valBon: 1,
        typeBon: TypeBon.chaste,
    },{
        valBon: 1,
        typeBon: TypeBon.altruiste,
    },{
        valBon: 1,
        typeBon: TypeBon.humble,
    }],
    [Coterie.carthaginois]: [{
        valBon: -2,
        typeBon: TypeBon.genereux,
    },{
        valBon: -1,
        typeBon: TypeBon.altruiste,
    },{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    }],
    [Coterie.conquistador]: [{
        valBon: 1,
        typeBon: TypeBon.valeureux,
    },{
        valBon: -1,
        typeBon: TypeBon.genereux,
    },{
        valBon: 1,
        typeBon: TypeBon.loyal,
    },{
        valBon: -1,
        typeBon: TypeBon.humble,
    }],
    [Coterie.culte_du_plaisir]:  [{
        valBon: -2,
        typeBon: TypeBon.chaste,
    },{
        valBon: -1,
        typeBon: TypeBon.bienveillant,
    },{
        valBon: -1,
        typeBon: TypeBon.sobre,
    }],
    [Coterie.esprit_de_la_nature]: [{
        valBon: 3,
        typeBon: TypeBon.naturaliste,
    },{
        valBon: 1,
        typeBon: TypeBon.humble,
    }],
    [Coterie.celtes]: [{
        valBon: -1,
        typeBon: TypeBon.humble,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.valeureux,
    },{
        valBon: -1,
        typeBon: TypeBon.sobre,
    }],
    [Coterie.demokratos]: [{
        valBon: 2,
        typeBon: TypeBon.sociable,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.loyal,
    }],
    [Coterie.elfes]: [{
        valBon: 1,
        typeBon: TypeBon.chaste,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.naturaliste,
    }],
    [Coterie.esthetes]:  [{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.empathique,
    },{
        valBon: -1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.naturaliste,
    }],
    [Coterie.jacobins]: [{
        valBon: -1,
        typeBon: TypeBon.empathique,
    },{
        valBon: -1,
        typeBon: TypeBon.naturaliste,
    },{
        valBon: 1,
        typeBon: TypeBon.valeureux,
    },{
        valBon: 1,
        typeBon: TypeBon.discipline,
    },{
        valBon: 1,
        typeBon: TypeBon.sobre,
    }],
    [Coterie.libertins]: [{
        valBon: -1,
        typeBon: TypeBon.chaste,
    },{
        valBon: -1,
        typeBon: TypeBon.sobre,
    },{
        valBon: -2,
        typeBon: TypeBon.discipline,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    }],
    [Coterie.lumieres]: [{
        valBon: -1,
        typeBon: TypeBon.loyal,
    },{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.naturaliste,
    },{
        valBon: -1,
        typeBon: TypeBon.humble,
    },{
        valBon: -1,
        typeBon: TypeBon.altruiste,
    }],
    [Coterie.ogres]: [{
        valBon: -2,
        typeBon: TypeBon.sobre,
    },{
        valBon: -1,
        typeBon: TypeBon.genereux,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    }],
    [Coterie.orks]: [{
        valBon: -1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.sociable,
    },{
        valBon: -1,
        typeBon: TypeBon.discipline,
    },{
        valBon: -1,
        typeBon: TypeBon.empathique,
    }],
    [Coterie.performeurs]: [{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.altruiste,
    },{
        valBon: -2,
        typeBon: TypeBon.humble,
    },{
        valBon: -1,
        typeBon: TypeBon.chaste,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    }],
    [Coterie.romains]: [{
        valBon: 1,
        typeBon: TypeBon.valeureux,
    },{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: -1,
        typeBon: TypeBon.altruiste,
    }],
    [Coterie.saabi]: [{
        valBon: 1,
        typeBon: TypeBon.genereux,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.sociable,
    }],
    [Coterie.schweizer]: [{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.sobre,
    },{
        valBon: -1,
        typeBon: TypeBon.sociable,
    },{
        valBon: 1,
        typeBon: TypeBon.prudent,
    }],
    [Coterie.skavens]: [{
        valBon: -1,
        typeBon: TypeBon.valeureux,
    },{
        valBon: -1,
        typeBon: TypeBon.loyal,
    },{
        valBon: -1,
        typeBon: TypeBon.genereux,
    },{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.altruiste,
    }],
    [Coterie.templiers]: [{
        valBon: 1,
        typeBon: TypeBon.loyal,
    },{
        valBon: 1,
        typeBon: TypeBon.humble,
    },{
        valBon: 1,
        typeBon: TypeBon.chaste,
    },{
        valBon: 1,
        typeBon: TypeBon.sobre,
    }],
    [Coterie.transhumanistes]: [{
        valBon: -1,
        typeBon: TypeBon.genereux,
    },{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -2,
        typeBon: TypeBon.naturaliste,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    }],
    [Coterie.tyranides]:  [{
        valBon: 1,
        typeBon: TypeBon.humble,
    },{
        valBon: 1,
        typeBon: TypeBon.travailleur,
    },{
        valBon: -1,
        typeBon: TypeBon.empathique,
    },{
        valBon: -1,
        typeBon: TypeBon.chaste,
    },{
        valBon: 1,
        typeBon: TypeBon.sobre,
    }],
    [Coterie.zaporogues]: [{
        valBon: -1,
        typeBon: TypeBon.prudent,
    },{
        valBon: -1,
        typeBon: TypeBon.sobre,
    },{
        valBon: -1,
        typeBon: TypeBon.prudent,
    },{
        valBon: 1,
        typeBon: TypeBon.sociable,
    }]
}