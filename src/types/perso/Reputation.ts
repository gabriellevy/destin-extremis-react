import {Quartier} from "../../donnees/geographie/quartiers";

export type Reputation = {
    parQuartier: ReputationQuartier[];
    // réputation générale "dans le monde" (mais surtout dans la ville)
    // 0 est une personne normale (inconnue)
    // 100 est une star mondiale, ou le président
    // il n'y a pas de notion de qualité dans l'amplitude
    amplitude: number;
}

// par quartier
export type ReputationQuartier = {
    quartier: Quartier;
    // -100 = catastrophique, +100 = excellente
    qualite: number;
    // 0 inconnu
    // 100 tout le monde le connaît sans exception
    amplitude: number;
}
