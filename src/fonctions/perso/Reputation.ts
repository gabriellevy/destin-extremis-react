import {Quartier} from "../../donnees/geographie/quartiers";
import {Perso} from "../../types/perso/Perso";
import {Reputation, ReputationQuartier} from "../../types/perso/Reputation";

export function reputationVide(): Reputation {
    return {
        parQuartier: []
    };
}

export function getReputationQuartier(perso:Perso, quartier:Quartier): ReputationQuartier|undefined {
    return perso.reputation.parQuartier.find((repQuartier:ReputationQuartier) =>
        repQuartier.quartier === quartier);
}

export function getNiveauReputationDansQuartier(perso:Perso, quartier:Quartier): number {
    return getReputationQuartier(perso, quartier)?.niveau ?? 0;
}

export function majReputationDansQuartier(perso:Perso, quartier:Quartier, modif: number): string {
    let repQuartier: ReputationQuartier|undefined = getReputationQuartier(perso, quartier);
    let niveauFinal = modif;
    if (repQuartier) {
        repQuartier.niveau += modif;
        niveauFinal = repQuartier.niveau;
    } else {
        perso.reputation.parQuartier.push({
            quartier: quartier,
            niveau: modif,
        })
    }
    return "<b>Réputation à "
        + quartier.toString()
        + " à "
        + (niveauFinal > 0 ? "+" : "")
        + niveauFinal
        + "</b><br/>";
}
