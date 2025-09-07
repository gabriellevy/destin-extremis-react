import {Quartier} from "../../donnees/geographie/quartiers";

export type Reputation = {
    parQuartier: ReputationQuartier[];
}

// par quartier -100 = catastrophique, +100 = excellente
export type ReputationQuartier = {
    quartier: Quartier;
    niveau: number;
}
