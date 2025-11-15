import {aleatoireDeTableauString} from "../../../fonctions/aleatoire";

export const JOURNAUX:string[] = [
    "Transmetropolitan",
    "Le Monde",
    "Le Figaro",
    "Libération",
    "L’Obs",
    "La Croix",
    "Les Échos",
    "La Tribune",
    "L’Équipe",
    "Télérama",
    "Elle",
    "Marie Claire",
    "Phosphore",
    "Science et vie",
    "Canard PC",
    "01Net",
    "Terra eco",
    "Charlie Hebdo",
    "Sciences et Avenir",
    "Valeurs actuelles",
    "Le Point",
    "Le Canard enchaîné",
];

export function journalAleatoire(): string {
    return aleatoireDeTableauString(JOURNAUX);
}