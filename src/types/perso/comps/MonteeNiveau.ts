import {TypeCompetence} from "./Comps";
import {Perso} from "../Perso";
import {getValeurVice, getViceOppose, Vertu, Vice} from "../../ViceVertu";

export interface ModificationVice {
    vice: Vice,
    augmente: boolean, // false signifie diminution du vice (donc augmentation de la vertu)
}

export function vicesAssociesACompetence(typeCompetence: TypeCompetence): Vice[] {
    switch (typeCompetence) {
        case TypeCompetence.intimidation: return [
            Vice.cruel,
            Vice.paresseux,
            Vice.orgueilleux,
            Vice.colerique,
        ]

        default: {
            return [];
        }
    }
}

export function vertusAssociesACompetence(typeCompetence: TypeCompetence): Vertu[] {
    switch (typeCompetence) {

        default: {
            return [];
        }
    }
}

export function changementPersonaliteSelonMonteeNiveau(perso:Perso, typeCompetence:TypeCompetence): ModificationVice|undefined {
    const vicesAssocies:Vice[] = vicesAssociesACompetence(typeCompetence);
    const vertusAssocies:Vertu[] = vertusAssociesACompetence(typeCompetence);
    const modifsVice:ModificationVice[] = [];
    vicesAssocies.forEach((vice:Vice) => {
        modifsVice.push({
            vice: vice,
            augmente: true,
        })
    })
    vertusAssocies.forEach((vertu:Vertu) => {
        modifsVice.push({
            vice: getViceOppose(vertu),
            augmente: false,
        })
    })

    if (modifsVice.length === 0) {
        console.error("pas de modification de personnalité disponible pour une montée de niveau en " + typeCompetence);
        return undefined;
    }

    // sélection déterministe :
    // - garder ceux dans lesquels le perso a la valeur la plus éloignée
    // - si il en reste plusieurs, prendre le premier
    const modifFinale:ModificationVice = modifsVice.reduce((acc:ModificationVice, viceSuivant:ModificationVice) => {
        const valeurPersoAcc:number = getValeurVice(perso, acc.vice);
        const valeurPersoViceSuivant:number = getValeurVice(perso, viceSuivant.vice);

        // pseudo "note" d'accordement du vice du perso par rapport à la modification
        // plus elle est élevée, plus e perso est loin de la direction du ModificationVice
        const noteViceAcc: number = acc.augmente ? -valeurPersoAcc : valeurPersoAcc;
        const noteViceSuivant: number = viceSuivant.augmente ? -valeurPersoViceSuivant : valeurPersoViceSuivant;

        return noteViceAcc > noteViceSuivant ? acc : viceSuivant;
    });
    return modifFinale;
}