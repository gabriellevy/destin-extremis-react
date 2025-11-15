import {ResidenceDeVoyage} from "./ResidenceDeVoyage";
import {PersoCommon} from "../perso/Perso";
import {Continent, getContinent, getRegions} from "../../donnees/geographie/continents";
import {Quartier} from "../../donnees/geographie/quartiers";
import {getQuartiers, getRegion, Region} from "../../donnees/geographie/regions";
import {getRandomEnumValue} from "../../fonctions/aleatoire";

export type Option = {
    value: string,
    label: string,
}

export enum StatutLogement {
    Location = "Location",
    Possession = "Possession",
    Voyage = "Voyage",
}

export type Lieu = {
    continent: Continent | undefined,
    region: Region | undefined,
    quartier: Quartier | undefined,
    statutLogement: StatutLogement,
    enVoyage:boolean,
    residenceVoyage:ResidenceDeVoyage|null,
};

export const lieuParDefaut: Lieu = {
    continent: Continent.europe,
    region: Region.la_ville,
    quartier: Quartier.chatenay_malabry,
    statutLogement: StatutLogement.Location,
    enVoyage: false,
    residenceVoyage: null,
};

export function lieuAleatoire(): Lieu {
    const quartier:Quartier = getRandomEnumValue(Quartier);

    return {
        continent: getContinent(quartier),
        region: getRegion(quartier),
        quartier: quartier,
        statutLogement: StatutLogement.Location,
        enVoyage: false,
        residenceVoyage: null,
    }
}

export const lieuArgenteuil: Lieu = {
    continent: Continent.europe,
    region: Region.la_ville,
    quartier: Quartier.argenteuil,
    statutLogement: StatutLogement.Location,
    enVoyage:false,
    residenceVoyage: null,
};

export const enVoyageEnSiberie: Lieu = {
    continent: Continent.siberie,
    region: Region.siberie,
    quartier: Quartier.catacombes_de_paris,
    statutLogement: StatutLogement.Voyage,
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