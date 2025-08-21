import {Quartier} from "../donnees/geographie/quartiers";
import {Perso} from "./perso/Perso";

export type Reputation = {
    // par quartier -100 = catastrophique, +100 = excellente
    parQuartier: Map<Quartier, number>;
}

export function reputationVide(): Reputation {
    return {
        parQuartier: new Map<Quartier, number>
    };
}

export function getReputationDansQuartier(perso:Perso, quartier:Quartier): number {
    return perso.reputation.parQuartier.get(quartier) ?? 0;
}

export function majReputationDansQuartier(perso:Perso, quartier:Quartier, modif: number): string {
    perso.reputation.parQuartier.set(
        quartier,
        getReputationDansQuartier(perso, quartier) + modif
    );
    return "<b>Réputation à "
        + quartier.toString()
        + " à "
        + (getReputationDansQuartier(perso, quartier) > 0 ? "+" : "")
        + getReputationDansQuartier(perso, quartier)
        + "</b><br/>";
}
