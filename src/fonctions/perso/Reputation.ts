import {Quartier} from "../../donnees/geographie/quartiers";
import {Perso} from "../../types/perso/Perso";
import {Reputation, ReputationQuartier} from "../../types/perso/Reputation";
import {ajouteLigneDeTexteGras} from "../texte_fc";

export function reputationVide(): Reputation {
    return {
        parQuartier: [],
        apprecieDeLaPopulation: 0,
        apprecieDesAutorites: 0,
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
    let repDansQuartier:ReputationQuartier|undefined = perso.reputation.parQuartier.find((repQuartier:ReputationQuartier) =>
        repQuartier.quartier === quartier);
    while(!repDansQuartier) {
        if (!quartier) {
            quartier = Quartier.inconnu;
        }
        perso.reputation.parQuartier.push({
            quartier: quartier,
            qualite: 0,
            amplitude: 0,
        });
        repDansQuartier = perso.reputation.parQuartier.find((repQuartier:ReputationQuartier) =>
            repQuartier.quartier === quartier);
    }
    return repDansQuartier;
}

export function getNiveauReputationDansQuartier(perso:Perso, quartier:Quartier): number {
    return getReputationQuartier(perso, quartier)?.qualite ?? 0;
}

export function modifierReputationAupresPopulation(perso:Perso, modifQualite: number, modifAmplitude: number): string {
    perso.reputation.apprecieDeLaPopulation += modifQualite;
    perso.reputation.amplitude += modifAmplitude;
    return ajouteLigneDeTexteGras(affichageReputatioPopulation(perso));
}

export function modifierReputationAupresAutorites(perso:Perso, modifQualite: number): string {
    perso.reputation.apprecieDesAutorites += modifQualite;
    return ajouteLigneDeTexteGras(affichageReputatioAutorites(perso));
}

export function modifierReputationDansQuartier(perso:Perso, quartier:Quartier|undefined, modifQualite: number, modifAmplitude: number): string {
    const quartierFinal:Quartier|undefined = quartier ?? perso.lieu.quartier;
    if (!quartierFinal) {
        console.error("pas de quartier actuel à affecter");
        return "";
    }

    let repQuartier: ReputationQuartier|undefined = getReputationQuartier(perso, quartierFinal);
    if (repQuartier) {
        repQuartier.qualite = repQuartier.qualite + modifQualite;
        repQuartier.amplitude = repQuartier.amplitude + modifAmplitude;
    } else {
        perso.reputation.parQuartier.push({
            quartier: quartierFinal,
            qualite: modifQualite,
            amplitude: modifAmplitude,
        })
    }
    if (repQuartier.amplitude === 0) return "";
    return ajouteLigneDeTexteGras("Réputation : " + affichageReputationQuartier(perso, quartierFinal) + ". <br/>");
}

export function affichageReputatioPopulation(perso: Perso):string {
    if (perso.reputation.amplitude > 0) {
        if (perso.reputation.apprecieDeLaPopulation < 0) {
            return "Connu par la population et mal vu";
        } else {
            return "Très apprécié du grand public";
        }
    }
    return "Inconnu du public";
}

export function affichageReputatioAutorites(perso: Perso):string {
    if (perso.reputation.apprecieDesAutorites < 0) {
        if (perso.reputation.apprecieDesAutorites < -50) {
            return "Criminel recherché";
        }
        return "Fiché comme délinquant à surveiller";
    }
    if (perso.reputation.apprecieDesAutorites > 0) {
        return "Réputation d'honnête homme";
    }
    return "Inconnu des autorité";
}

export function affichageReputationQuartier(perso: Perso, quartier:Quartier) {
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
