import {Dieu} from "../../types/Dieu";

export function dieuAleatoire(): Dieu {
    return dieux[Math.floor(Math.random() * dieux.length)];
}

// TODO : ajouter les autres dieux ? Classer en plusieurs "niveaux" ? cf Imperator p160
// + description
// + dieux non romains ?
export const APOLLON:string = "Apollon";
export const BACCHUS:string = "Bacchus";
export const CERES:string = "Cérès";
export const DIANE:string = "Diane";
export const JANUS:string = "Janus";
export const JUNON:string = "Junon";
export const JUPITER:string = "Jupiter";
export const MARS:string = "Mars";
export const MINERVE:string = "Minerve";
export const MERCURE:string = "Mercure";
export const NEPTUNE:string = "Neptune";
export const PLUTON:string = "Pluton";
export const SATURNE:string = "Saturne";
export const VENUS:string = "Vénus";
export const VESTA:string = "Vesta";
export const VULCAIN:string = "Vulcain";

export const dieux: Dieu[] = [
    {
        id: APOLLON
    },
    {
        id: BACCHUS
    },
    {
        id: CERES
    },
    {
        id: DIANE
    },
    {
        id: JANUS
    },
    {
        id: JUNON
    },
    {
        id: JUPITER
    },
    {
        id: MARS
    },
    {
        id: MINERVE
    },
    {
        id: MERCURE
    },
    {
        id: NEPTUNE
    },
    {
        id: PLUTON
    },
    {
        id: SATURNE
    },
    {
        id: VENUS
    },
    {
        id: VESTA
    },
    {
        id: VULCAIN
    },
]