import {Quartier} from "../../donnees/geographie/quartiers";

export type Reputation = {
    parQuartier: ReputationQuartier[];
    // -------------- réputation générale "dans le monde" (mais surtout dans la ville)
    // -100 = catastrophique (criminel ultra dangereux),
    // +100 = excellente (bienfaiteur universel héroïque)
    qualite: number;
    // 0 est une personne normale (inconnue)
    // 1 à 20 : passé à la télé 1 ou 2 fois
    // 21 à 80 : très connu
    // 81+ est une star mondiale, ou le président
    // il n'y a pas de notion de qualité dans l'amplitude
    amplitude: number;
}

// par quartier
export type ReputationQuartier = {
    quartier: Quartier;
    // -100 = catastrophique (criminel ultra dangereux),
    // +100 = excellente (bienfaiteur universel héroïque)
    qualite: number;
    // 0 inconnu
    // 1 à 20 : un peu connu dans le coin
    // 21 à 80 : petit notable (médecin, chef de la mafia, président d'association...)
    // 81+ : parmi les 10 personnes les plus connues du quartier
    // 100 tout le monde le connaît sans exception
    amplitude: number;
}
