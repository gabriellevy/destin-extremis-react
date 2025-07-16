import {ResidenceDeVoyage} from "./ResidenceDeVoyage";
import {Perso} from "../perso/Perso";
import {getRegions, Continent} from "../../donnees/geographie/continents";
import {Quartier} from "../../donnees/geographie/quartiers";
import {getQuartiers, Region} from "../../donnees/geographie/regions";

export type Option = {
    value: string,
    label: string,
}

export type Lieu = {
    continent: Continent,
    region: Region,
    quartier: Quartier,
    maison: string|null,
    enVoyage:boolean,
    residenceVoyage:ResidenceDeVoyage|null,
};

export const lieuParDefaut: Lieu = {
    continent: Continent.europe,
    region: Region.la_ville,
    quartier: Quartier.chatenay_malabry,
    maison: null,
    enVoyage: false,
    residenceVoyage: null,
};

export const lieuArgenteuil: Lieu = {
    continent: Continent.europe,
    region: Region.la_ville,
    quartier: Quartier.argenteuil,
    maison: null,
    enVoyage:false,
    residenceVoyage: null,
};

export const enVoyageEnSiberie: Lieu = {
    continent: Continent.siberie,
    region: Region.siberie,
    quartier: Quartier.catacombes_de_paris,
    maison: null,
    enVoyage:true,
    residenceVoyage: null,
};

export function vaA(perso: Perso, quartier: Quartier) {
    perso.lieu.quartier = quartier;
    const sousProvince: Region = getSousProvinceDeVille(quartier);
    perso.lieu.region = sousProvince;
    perso.lieu.continent = getProvinceDeSousProvince(sousProvince);
}

export function getSousProvinceDeVille(quartier: Quartier): Region {
    return Object.values(Region).find(sousProvince=> getQuartiers(sousProvince).includes(quartier)) || Region.regionInconnue;
}

export function getProvinceDeSousProvince(sousProvince: Region): Continent {
    return Object.values(Continent).find(continent=> getRegions(continent).includes(sousProvince)) || Continent.continentInconnu;
}

export function auBordDeLaRiviere(perso: Perso): boolean {
    if (perso.lieu.continent === Continent.europe) return true; // il y a des rivières partout là dedans...

    return false;
}