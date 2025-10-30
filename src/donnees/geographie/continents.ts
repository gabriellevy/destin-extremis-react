import {Option} from "../../types/lieux/Lieu";
import {getQuartiers, Region} from "./regions";
import {Quartier} from "./quartiers";

export enum Continent {
    europe = 'Europe',
    siberie = 'Sibérie',
    inde = 'Inde',
    asie_sud_est = 'Asie du Sud est',
    amerique_nord = 'Amérique du nord',
    amerique_centrale = 'Amérique centrale',
    amerique_sud = 'Amérique du sud',

    // continentInconnu = 'Continent inconnu',
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

export function getContinent(quartierCherche:Quartier):Continent|undefined {
    for (const continentStr in Continent) {
        const continent:Continent = Continent[continentStr as keyof typeof Continent];
        for (const quartier of getQuartiersDeContinent(continent)) {
            if (quartier.toString() === quartierCherche.toString()) {
                return continent;
            }
        }
    }
    console.error("Pas de continent pour le quartier : " + quartierCherche);
    return undefined;
}

export function getQuartiersDeContinent(continent: Continent):Quartier[] {
    const regions: Region[] = getRegions(continent);
    const quartiers: Quartier[] = [];
    for (const region of regions) {
        for (const quartierStr of getQuartiers(region)) {
            quartiers.push(quartierStr as Quartier);
        }
    }
    return quartiers;
}

export function getRegions(continent: Continent|undefined):Region[] {
    switch (continent) {
        case Continent.siberie : return [
            Region.siberie,
        ];
        case Continent.inde : return [
        ];
        case Continent.asie_sud_est : return [
            Region.chine,
        ];
        case Continent.amerique_nord : return [
        ];
        case Continent.europe : return [
            Region.la_ville, Region.espagne,
        ];
        case Continent.amerique_centrale : return [
        ];
        case Continent.amerique_sud : return [
        ];
    }
    return [];
}
