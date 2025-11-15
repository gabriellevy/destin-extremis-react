import {TypeCompetence} from "./Comps";
import {Perso} from "../Perso";
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
    /*return modifsVice.reduce((acc: ModificationVice, viceSuivant: ModificationVice) => {
        const valeurPersoAcc: number = getValeurVice(perso, acc.vice);
        const valeurPersoViceSuivant: number = getValeurVice(perso, viceSuivant.vice);

        // pseudo "note" d'accordement du vice du perso par rapport à la modification
        // plus elle est élevée, plus e perso est loin de la direction du ModificationVice
        const noteViceAcc: number = acc.augmente ? -valeurPersoAcc : valeurPersoAcc;
        const noteViceSuivant: number = viceSuivant.augmente ? -valeurPersoViceSuivant : valeurPersoViceSuivant;

        return noteViceAcc > noteViceSuivant ? acc : viceSuivant;
    });*/

    // TODO : aléatoire dépendant du dernier evt exécuté comme seed :
    // - semi déterministe car le dernier evt exécuté changera régulièrement (mais avec un bon délai)
    // - pousse à attendre le prochain evt pour voir si on aura "mieux"
    return modifsVice[Math.floor(getAleatoireParSeed(perso) * modifsVice.length)];
}

export function achatSelonMonteeNiveau(perso:Perso, typeCompetence:TypeCompetence): Possession|undefined {
    const achats:Possession[] = achatsAssociesACompetence(typeCompetence);
    let achat:Possession|undefined = undefined;
    let indexAleatoire:number = getRandomInt0Seed(achats.length, perso);
    let count:number = 0;
    while (achat === undefined || possede(perso, achat.possessionEnum)) {
        achat = achats[(indexAleatoire+count) % achats.length];
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
