import {Quartier} from "../../donnees/geographie/quartiers";
import {Perso} from "../../types/perso/Perso";
import {Reputation, ReputationQuartier} from "../../types/perso/Reputation";

export function reputationVide(): Reputation {
    return {
        parQuartier: [],
        qualite: 0,
        amplitude: 0,
    };
}

/**
 *
 * @param perso personnage joué
 * @param quartier quartier interrogé. Si undefined, le quartier interrogé est le quartier actuel de résidence du perso
 */
export function getReputationQuartier(perso:Perso, quartier:Quartier|undefined): ReputationQuartier {
    if (!quartier) {
        quartier = perso.lieu.quartier;
    }
    const repDansQuartier:ReputationQuartier|undefined = perso.reputation.parQuartier.find((repQuartier:ReputationQuartier) =>
        repQuartier.quartier === quartier);
    if (!repDansQuartier) {
        if (!quartier) {
            quartier = Quartier.inconnu;
        }
        return {
            quartier: quartier,
            qualite: 0,
            amplitude: 0,
        };
    }
    return repDansQuartier;
}

export function getNiveauReputationDansQuartier(perso:Perso, quartier:Quartier): number {
    return getReputationQuartier(perso, quartier)?.qualite ?? 0;
}

export function modifierReputationDansQuartier(perso:Perso, quartier:Quartier|undefined, modifQualite: number, modifAmplitude: number): string {
    const quartierFinal:Quartier|undefined = quartier ?? perso.lieu.quartier;
    if (!quartierFinal) {
        console.error("pas de quartier actuel à affecter");
        return "";
    }

    let repQuartier: ReputationQuartier|undefined = getReputationQuartier(perso, quartierFinal);
    if (repQuartier) {
        repQuartier.qualite += modifQualite;
        repQuartier.amplitude += modifAmplitude;
    } else {
        perso.reputation.parQuartier.push({
            quartier: quartierFinal,
            qualite: modifQualite,
            amplitude: modifAmplitude,
        })
    }
    return "<b>Réputation : " + affichageReputation(perso, quartierFinal)
        + "</b><br/>";
}

export function affichageReputation(perso: Perso, quartier:Quartier) {
    let repQuartier: ReputationQuartier|undefined = getReputationQuartier(perso, quartier);
    let amplitude:number;
    let qualite:number;
    if (repQuartier) {
        amplitude = repQuartier.amplitude;
        qualite = repQuartier.qualite;
    } else {
        amplitude = 0;
        qualite = 0;
    }

    if (amplitude <= 0) {
        return "Inconnu à " + quartier.toString();
    }
    if (amplitude <= 20) {
        let texte:string =  "Un peu connu à " + quartier.toString();
        if (qualite < -10) {
            texte += " (en mal)"
        } else if (qualite > 10) {
            texte += " (en bien)"
        }
        return texte;
    }
    if (amplitude <= 80) {
        let texte:string =  "Bien connu à " + quartier.toString();
        if (qualite < -10) {
            texte += " (en mal)"
        } else if (qualite > 10) {
            texte += " (en bien)"
        }
        return texte;
    }
    if (amplitude <= 100) {
        let texte:string =  "Célèbre à " + quartier.toString();
        if (qualite < -10) {
            texte += " (en mal)"
        } else if (qualite > 10) {
            texte += " (en bien)"
        }
        return texte;
    }
    if (amplitude >= 100) {
        let texte:string =  "Très connu par tout le monde à " + quartier.toString();
        if (qualite < -10) {
            texte += " (en mal)"
        } else if (qualite > 10) {
            texte += " (en bien)"
        }
        return texte;
    }
}
