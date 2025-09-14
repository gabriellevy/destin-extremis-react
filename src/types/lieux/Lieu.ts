import {ResidenceDeVoyage} from "./ResidenceDeVoyage";
import {Perso, PersoCommon} from "../perso/Perso";
import {Continent, getRegions} from "../../donnees/geographie/continents";
import {Quartier} from "../../donnees/geographie/quartiers";
import {getQuartiers, Region} from "../../donnees/geographie/regions";

export type Option = {
    value: string,
    label: string,
}

export type Lieu = {
    continent: Continent | undefined,
    region: Region | undefined,
    quartier: Quartier | undefined,
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

export function vaA(perso: PersoCommon, quartier: Quartier) {
    perso.lieu.quartier = quartier;
    const sousProvince: Region | undefined = getSousProvinceDeVille(quartier);
    perso.lieu.region = sousProvince;
    if (sousProvince) {
        perso.lieu.continent = getProvinceDeSousProvince(sousProvince);
    }
}

export function getSousProvinceDeVille(quartier: Quartier): Region | undefined {
    return Object.values(Region).find(sousProvince=> getQuartiers(sousProvince).includes(quartier));
}

export function getProvinceDeSousProvince(sousProvince: Region): Continent | undefined {
    return Object.values(Continent).find(continent=> getRegions(continent).includes(sousProvince));
}

export function auBordDeLaRiviere(perso: PersoCommon): boolean {
    if (perso.lieu.continent === Continent.europe) return true; // il y a des rivières partout là dedans...
    return false;
}

export function auBordDuneZone(perso: PersoCommon): boolean {
    return perso.lieu.quartier === Quartier.montbrison;
}

export function auBordDuneRuche(perso: PersoCommon): boolean {
    return perso.lieu.quartier === Quartier.comptoir_ghangzhou;
}