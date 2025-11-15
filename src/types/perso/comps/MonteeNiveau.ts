import {TypeCompetence} from "./Comps";
import {PersoHisto} from "../Perso";
import {getViceOppose, Vertu, Vice} from "../../ViceVertu";
import {Possession, PossessionEnum} from "../../../donnees/possessions/Possession";
import {aleatoireDeTableauString, getAleatoireParSeed, getRandomInt0Seed} from "../../../fonctions/aleatoire";
import {NOMS_DE_CHATS} from "../../../donnees/possessions/animaux";
import {possede} from "../../../fonctions/possessions/possessions";
import {vertusAssociesACompetence, vicesAssociesACompetence} from "../../../donnees/montee_niveau/MonteeViceVertu";

export interface ModificationVice {
    vice: Vice,
    augmente: boolean, // false signifie diminution du vice (donc augmentation de la vertu)
}

export function changementPersonaliteSelonMonteeNiveau(perso:PersoHisto, typeCompetence:TypeCompetence): ModificationVice|undefined {
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

    return modifsVice[Math.floor(getAleatoireParSeed(perso) * modifsVice.length)];
}

export function achatSelonMonteeNiveau(perso:PersoHisto, typeCompetence:TypeCompetence): Possession|undefined {
    const achats:Possession[] = achatsAssociesACompetence(typeCompetence);
    let achat:Possession|undefined = undefined;
    let indexAleatoire:number = getRandomInt0Seed(achats.length, perso);
    let count:number = 0;
    while (achat === undefined || possede(perso, achat.possessionEnum)) {
        if (count === achats.length) break;
        achat = achats[(indexAleatoire+count) % achats.length];
        count++;
    }
    return undefined;
}

export function achatsAssociesACompetence(typeCompetence: TypeCompetence): Possession[] {
    switch (typeCompetence) {
        case TypeCompetence.animaux: return [
            {
                possessionEnum: PossessionEnum.chat,
                nom: aleatoireDeTableauString(NOMS_DE_CHATS),
            },
        ]
        case TypeCompetence.armeCaC: return [
            {possessionEnum: PossessionEnum.couteau},
        ]
        case TypeCompetence.survie: return [
            {possessionEnum: PossessionEnum.couteau},
        ]
        case TypeCompetence.tir: return [
            {possessionEnum: PossessionEnum.pistolet},
            {possessionEnum: PossessionEnum.armes_lourdes}
        ]

        default: {
            return [];
        }
    }
}
