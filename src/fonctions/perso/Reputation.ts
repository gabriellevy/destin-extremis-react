import {Quartier} from "../../donnees/geographie/quartiers";
import {Perso} from "../../types/perso/Perso";
import {Reputation, ReputationQuartier} from "../../types/perso/Reputation";

export function reputationVide(): Reputation {
    return {
        parQuartier: [],
        amplitude: 0,
    };
}

export function getReputationQuartier(perso:Perso, quartier:Quartier): ReputationQuartier|undefined {
    return perso.reputation.parQuartier.find((repQuartier:ReputationQuartier) =>
        repQuartier.quartier === quartier);
}

export function getNiveauReputationDansQuartier(perso:Perso, quartier:Quartier): number {
    return getReputationQuartier(perso, quartier)?.qualite ?? 0;
}

export function majReputationDansQuartier(perso:Perso, quartier:Quartier, modifQualite: number, modifAmplitude: number): string {
    let repQuartier: ReputationQuartier|undefined = getReputationQuartier(perso, quartier);
    let niveauFinal = modifAmplitude;
    if (repQuartier) {
        repQuartier.qualite += modifQualite;
        niveauFinal = repQuartier.qualite;
    } else {
        perso.reputation.parQuartier.push({
            quartier: quartier,
            qualite: modifQualite,
            amplitude: modifAmplitude,
        })
    }
    return "<b>Réputation à "
        + quartier.toString()
        + " à "
        + (niveauFinal > 0 ? "+" : "")
        + niveauFinal
        + "</b><br/>";
}
