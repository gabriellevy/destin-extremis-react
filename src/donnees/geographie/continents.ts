import {Option} from "../../types/lieux/Lieu";
import {Region} from "./regions";

export enum Continent {
    europe = 'Europe',
    siberie = 'Sibérie',
    inde = 'Inde',
    asie_sud_est = 'Asie du Sud est',
    amerique_nord = 'Amérique du nord',
    amerique_centrale = 'Amérique centrale',
    amerique_sud = 'Amérique du sud',

    continentInconnu = 'Continent inconnu',
}

export const continentsOptions: Option[]= [
    { value: Continent.europe, label: Continent.europe},
    { value: Continent.siberie, label: Continent.siberie},
    { value: Continent.inde, label: Continent.inde},
    { value: Continent.asie_sud_est, label: Continent.asie_sud_est},
    { value: Continent.amerique_nord, label: Continent.amerique_nord},
    { value: Continent.amerique_centrale, label: Continent.amerique_centrale},
    { value: Continent.amerique_sud, label: Continent.amerique_sud},
];

export function getRegions(continent: Continent):Region[] {
    switch (continent) {
        case Continent.siberie : return [
            Region.siberie,
        ];
        case Continent.inde : return [
            // TODO
        ];
        case Continent.asie_sud_est : return [
        // TODO
        ];
        case Continent.amerique_nord : return [
            // TODO
        ];
        case Continent.europe : return [
            Region.la_ville,
        ];
        case Continent.amerique_centrale : return [
        // TODO
        ];
        case Continent.amerique_sud : return [
            // TODO
        ];
    }
    return [];
}
