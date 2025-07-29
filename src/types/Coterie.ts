import {Option} from "./lieux/Lieu";
import {Perso} from "./perso/Perso";
import {augmenterCompetence, TypeCompetence} from "./perso/comps/Comps";
import {getEffetsDeCoterieSurCompetences} from "../donnees/coteries/EffetsDesCoteriesSurPerso";

export enum Coterie {
    aucune = 'Aucune',
    acheron = 'Achéron',
    bastets = 'Bastets',
    cathares = 'Cathares',
    carthaginois = 'Carthaginois',
    celtes = 'Celtes',
    chaos = 'Chaos',
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
    { value: Coterie.aucune, label: Coterie.aucune},
    { value: Coterie.acheron, label: Coterie.acheron},
    { value: Coterie.bastets, label: Coterie.bastets},
    { value: Coterie.cathares, label: Coterie.cathares},
    { value: Coterie.celtes, label: Coterie.celtes},
    { value: Coterie.chaos, label: Coterie.chaos},
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

/**
 * effets sur le perso quand il rejoint cette coterie
 */
export type EffectDeCoterieSurPerso = {
    plus10Values: TypeCompetence[],
    plus5Values: TypeCompetence[],
    minus10Values: TypeCompetence[],
    minus5Values: TypeCompetence[],
}

export function rejointCoterie( perso: Perso, coterie: Coterie) {
    const ancienneCoterie = perso.coterie;
    if (ancienneCoterie != Coterie.aucune) {
        // inverser effet de la coterie précédente (pour la quitter)
        const effetDepart: EffectDeCoterieSurPerso = getEffetsDeCoterieSurCompetences(ancienneCoterie);
        effetDepart.plus10Values.forEach((typeComp: TypeCompetence) =>
            augmenterCompetence(perso, typeComp, -10)
        );
        effetDepart.plus5Values.forEach((typeComp: TypeCompetence) =>
            augmenterCompetence(perso, typeComp, -5)
        );
        effetDepart.minus10Values.forEach((typeComp: TypeCompetence) =>
            augmenterCompetence(perso, typeComp, 10)
        );
        effetDepart.minus5Values.forEach((typeComp: TypeCompetence) =>
            augmenterCompetence(perso, typeComp, 5)
        );

    }

    perso.coterie = coterie;

    const effet: EffectDeCoterieSurPerso = getEffetsDeCoterieSurCompetences(coterie);
    effet.plus10Values.forEach((typeComp: TypeCompetence) =>
        augmenterCompetence(perso, typeComp, 10)
    );
    effet.plus5Values.forEach((typeComp: TypeCompetence) =>
        augmenterCompetence(perso, typeComp, 5)
    );
    effet.minus10Values.forEach((typeComp: TypeCompetence) =>
        augmenterCompetence(perso, typeComp, -10)
    );
    effet.minus5Values.forEach((typeComp: TypeCompetence) =>
        augmenterCompetence(perso, typeComp, -5)
    );
}
