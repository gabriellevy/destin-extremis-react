import {ResidenceDeVoyage} from "./ResidenceDeVoyage";
import {Perso} from "../Perso";
import {getSousProvinces, Continent} from "../../donnees/geographie/continents";
import {Ville} from "../../donnees/geographie/villes";
import {getVilles, SousProvince} from "../../donnees/geographie/sousProvince";

export type Option = {
    value: string,
    label: string,
}

export type Lieu = {
    continent: Continent,
    sousProvince: SousProvince,
    ville: Ville,
    maison: string|null,
    enVoyage:boolean,
    residenceVoyage:ResidenceDeVoyage|null,
};

export const lieuParDefaut: Lieu = {
    continent: Continent.europe,
    sousProvince: SousProvince.latium,
    ville: Ville.ostia,
    maison: null,
    enVoyage:false,
    residenceVoyage: null,
};

export const lieuRome: Lieu = {
    continent: Continent.europe,
    sousProvince: SousProvince.latium,
    ville: Ville.rome,
    maison: null,
    enVoyage:false,
    residenceVoyage: null,
};

export const enVoyageEnCampanie: Lieu = {
    continent: Continent.siberie,
    sousProvince: SousProvince.campanie,
    ville: Ville.herculanum,
    maison: null,
    enVoyage:true,
    residenceVoyage: null,
};

export function vaA(perso: Perso, ville: Ville) {
    perso.lieu.ville = ville;
    const sousProvince: SousProvince = getSousProvinceDeVille(ville);
    perso.lieu.sousProvince = sousProvince;
    perso.lieu.continent = getProvinceDeSousProvince(sousProvince);
}

export function getSousProvinceDeVille(ville: Ville): SousProvince {
    return Object.values(SousProvince).find(sousProvince=> getVilles(sousProvince).includes(ville)) || SousProvince.sousProvinceInconnue;
}

export function getProvinceDeSousProvince(sousProvince: SousProvince): Continent {
    return Object.values(Continent).find(province=> getSousProvinces(province).includes(sousProvince)) || Continent.continentInconnu;
}

export function auBordDeLaRiviere(perso: Perso): boolean {
    if (perso.lieu.continent === Continent.europe) return true; // il y a des rivières partout là dedans...

    return false;
}