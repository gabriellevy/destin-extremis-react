export const JOURS_PAR_AN = 360;
export const JOURS_PAR_SEMAINE = 10;

export enum enumMois {
    vendemiaire = "Vendémiaire",
    brumaire = "Brumaire",
    frimaire = "Frimaire",
    nivose = "Nivôse",
    pluviose = "Pluviôse",
    ventose = "Ventôse",
    germinal = "Germinal",
    floreal = "Floréal",
    prairial = "Prairial",
    messidor = "Messidor",
    thermidor = "Thermidor",
    fructidor = "Fructidor",
}

export const nbJoursDansMois:Record<enumMois, number> = {
    [enumMois.vendemiaire]: 30,
    [enumMois.brumaire]: 30,
    [enumMois.frimaire]: 30,
    [enumMois.nivose]: 30,
    [enumMois.pluviose]: 30,
    [enumMois.ventose]: 30,
    [enumMois.germinal]: 30,
    [enumMois.floreal]: 30,
    [enumMois.prairial]: 30,
    [enumMois.messidor]: 30,
    [enumMois.thermidor]: 30,
    [enumMois.fructidor]: 30,
    // Les jours complémentaires de fin d'année5 ou 6 en années bisextiles => en théorie mais bon j'ignore
};

// numéro du jour du dernier jour de chaque mois (sur l'échelle de jours dans une année)
export const nbJourDuDernierJourDuMois:Record<enumMois, number> = {
    [enumMois.vendemiaire]: 30,
    [enumMois.brumaire]: 60,
    [enumMois.frimaire]: 90,
    [enumMois.nivose]: 120,
    [enumMois.pluviose]: 150,
    [enumMois.ventose]: 180,
    [enumMois.germinal]: 210,
    [enumMois.floreal]: 240,
    [enumMois.prairial]: 270,
    [enumMois.messidor]: 300,
    [enumMois.thermidor]: 330,
    [enumMois.fructidor]: 360,
};