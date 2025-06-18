import {ResidenceDeVoyage} from "./ResidenceDeVoyage";
import {Perso} from "../Perso";
import {getRegions, Continent} from "../../donnees/geographie/continents";
import {Ville} from "../../donnees/geographie/villes";
import {getQuartiers, Region} from "../../donnees/geographie/region";

export type Option = {
    value: string,
    label: string,
}

export type Lieu = {
    continent: Continent,
    region: Region,
    ville: Ville,
    maison: string|null,
    enVoyage:boolean,
    residenceVoyage:ResidenceDeVoyage|null,
};

export const lieuParDefaut: Lieu = {
    continent: Continent.europe,
    region: Region.la_ville,
    ville: Ville.ostia,
    maison: null,
    enVoyage:false,
    residenceVoyage: null,
};

export const lieuRome: Lieu = {
    continent: Continent.europe,
    region: Region.la_ville,
    ville: Ville.rome,
    maison: null,
    enVoyage:false,
    residenceVoyage: null,
};

export const enVoyageEnSiberie: Lieu = {
    continent: Continent.siberie,
    region: Region.siberie,
    ville: Ville.herculanum,
    maison: null,
    enVoyage:true,
    residenceVoyage: null,
};

export function vaA(perso: Perso, ville: Ville) {
    perso.lieu.ville = ville;
    const sousProvince: Region = getSousProvinceDeVille(ville);
    perso.lieu.region = sousProvince;
    perso.lieu.continent = getProvinceDeSousProvince(sousProvince);
}

export function getSousProvinceDeVille(ville: Ville): Region {
    return Object.values(Region).find(sousProvince=> getQuartiers(sousProvince).includes(ville)) || Region.regionInconnue;
}

export function getProvinceDeSousProvince(sousProvince: Region): Continent {
    return Object.values(Continent).find(continent=> getRegions(continent).includes(sousProvince)) || Continent.continentInconnu;
}

export function auBordDeLaRiviere(perso: Perso): boolean {
    if (perso.lieu.continent === Continent.europe) return true; // il y a des rivières partout là dedans...

    return false;
}