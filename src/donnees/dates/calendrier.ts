export const JOURS_PAR_AN = 400;
export const JOURS_PAR_SEMAINE = 8;

export enum enumMois {
    MARTIUS = "Martius",
    APRILIS = "Aprilis",
    MAIUS = "Maius",
    IUNIUS = "Iunius",
    QUINTILIS = "Quintilis",
    SEXTILIS = "Sextilis",
    SEPTEMBER = "September",
    OCTOBER = "October",
    NOVEMBER = "November",
    DECEMBER = "December",
    IANUARIUS = "Ianuarius",
    FEBRUARIUS = "Februarius",
}

export const nbJoursDansMois:Record<enumMois, number> = {
    [enumMois.MARTIUS]: 31,
    [enumMois.APRILIS]: 29,
    [enumMois.MAIUS]: 31,
    [enumMois.IUNIUS]: 29,
    [enumMois.QUINTILIS]: 31,
    [enumMois.SEXTILIS]: 29,
    [enumMois.SEPTEMBER]: 29,
    [enumMois.OCTOBER]: 31,
    [enumMois.NOVEMBER]: 29,
    [enumMois.DECEMBER]: 29,
    [enumMois.IANUARIUS]: 29,
    [enumMois.FEBRUARIUS]: 28,
    // XIII - Mensis intercalaris : 29 jours (uniquement tous les quatre ans). => en théorie mais bon j'ignore
};

// numéro du jour du dernier jour de chaque mois (sur l'échelle de jours dans une année)
export const nbJourDuDernierJourDuMois:Record<enumMois, number> = {
    [enumMois.MARTIUS]: 31,
    [enumMois.APRILIS]: 60,
    [enumMois.MAIUS]: 91,
    [enumMois.IUNIUS]: 120,
    [enumMois.QUINTILIS]: 151,
    [enumMois.SEXTILIS]: 180,
    [enumMois.SEPTEMBER]: 209,
    [enumMois.OCTOBER]: 240,
    [enumMois.NOVEMBER]: 269,
    [enumMois.DECEMBER]: 298,
    [enumMois.IANUARIUS]: 327,
    [enumMois.FEBRUARIUS]: 355,
};