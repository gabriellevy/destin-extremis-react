
// à l'échelle de l'empire romain
import {Option} from "./lieux/Lieu";
import {Perso} from "./Perso";
import {augmenterCompetence, TypeCompetence} from "./comps/Comps";
import {getValeurVertu, TypeVertu, ViceVertu} from "./ViceVertu";

export enum Coterie {
    acheron = 'Achéron',
    bastets = 'Bastets',
    cathares = 'Cathares',
    celtes = 'Celtes',
    conquistador = 'Conquistador',
    culte_du_plaisir = 'Culte du plaisir',
    demokratos = 'Démokratos',
    elfes = 'Elfes',
    esprit_de_la_nature = 'Esprit de la nature',
    esthetes = 'Esthètes',
    jacobins = 'Jacobins',
    libertins = 'Libertins',
    lumieres = 'Lumières',
    ogres = 'Ogres',
    orks = 'Orks',
    performeurs = 'Performeurs',
    romains = 'Romains',
    saabi = 'Saabi',
    skavens = 'Skavens',
    schweizer = 'Schweizer',
    templiers = 'Templiers',
    transhumanistes = 'Transhumanistes',
    tyranides = 'Tyranides',
    zaporogues = 'Zaporogues',
}

export const coterieOptions: Option[]= [
    { value: Coterie.acheron, label: Coterie.acheron},
    { value: Coterie.bastets, label: Coterie.bastets},
    { value: Coterie.cathares, label: Coterie.cathares},
    { value: Coterie.celtes, label: Coterie.celtes},
    { value: Coterie.culte_du_plaisir, label: Coterie.culte_du_plaisir},
    { value: Coterie.demokratos, label: Coterie.demokratos},
    { value: Coterie.elfes, label: Coterie.elfes},
    { value: Coterie.esprit_de_la_nature, label: Coterie.esprit_de_la_nature},
    { value: Coterie.esthetes, label: Coterie.esthetes},
    { value: Coterie.jacobins, label: Coterie.jacobins},
    { value: Coterie.libertins, label: Coterie.libertins},
    { value: Coterie.lumieres, label: Coterie.lumieres},
    { value: Coterie.ogres, label: Coterie.ogres},
    { value: Coterie.conquistador, label: Coterie.conquistador},
    { value: Coterie.orks, label: Coterie.orks},
    { value: Coterie.performeurs, label: Coterie.performeurs},
    { value: Coterie.romains, label: Coterie.romains},
    { value: Coterie.saabi, label: Coterie.saabi},
    { value: Coterie.skavens, label: Coterie.skavens},
    { value: Coterie.schweizer, label: Coterie.schweizer},
    { value: Coterie.templiers, label: Coterie.templiers},
    { value: Coterie.transhumanistes, label: Coterie.transhumanistes},
    { value: Coterie.tyranides, label: Coterie.tyranides},
    { value: Coterie.zaporogues, label: Coterie.zaporogues},
];

export function rejointCoterie( perso: Perso, coterie: Coterie) {
    switch (coterie) {
        case Coterie.templiers:
            augmenterCompetence(perso, TypeCompetence.vigilance, 10);
            augmenterCompetence(perso, TypeCompetence.volonte, 10);
            augmenterCompetence(perso, TypeCompetence.armeCaC, 5);
            augmenterCompetence(perso, TypeCompetence.evaluation, 5);
            augmenterCompetence(perso, TypeCompetence.jeux, -5);
            augmenterCompetence(perso, TypeCompetence.tromperie, -10);
            break;
        default:
            console.warn("Pas d'effet de rejoindre une coterie pour la coterie : " + coterie)
            break;
    }
}

// chacun doit en avoir autant pour que ce soit plus équitable
export const affiniteViceVertuCoterie: Record<Coterie, ViceVertu[]> = {
    [Coterie.culte_du_plaisir]: [],
    [Coterie.esprit_de_la_nature]: [],
    [Coterie.acheron]: [],
    [Coterie.bastets]: [],
    [Coterie.cathares]: [],
    [Coterie.celtes]: [],
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
    [Coterie.skavens]: [],
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

export function calculerAffinite(perso: Perso, coterie: Coterie): number {
    let affinite = 0;
    affiniteViceVertuCoterie[coterie].forEach(viceVertuCoterie => {
        const valVertuPerso = getValeurVertu(perso, viceVertuCoterie.typeVertu);
        if (valVertuPerso == viceVertuCoterie.valVertu) {
            if (valVertuPerso ==0) affinite+=2;
            if (valVertuPerso ==1) affinite+=4;
            if (valVertuPerso ==2) affinite+=8;
            if (valVertuPerso ==3) affinite+=16;
        } else {
            if (Math.abs(valVertuPerso - viceVertuCoterie.valVertu) > 1) {
                affinite-=1;
            } else {
                affinite+=1;
            }
        }
    })
    return affinite;
}
