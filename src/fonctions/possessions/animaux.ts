import {Perso} from "../../types/perso/Perso";
import {Possession, PossessionEnum} from "../../donnees/possessions/Possession";

export function estUnAnimalDomestique(possessionEnum:PossessionEnum):boolean {
    const animaux:PossessionEnum[] = [
        PossessionEnum.chat,
    ]
    return (animaux.includes(possessionEnum));
}

export function nombreDAnimauxDomestiques(perso:Perso):number {
    return perso.possessions.filter((possession: Possession) =>
        estUnAnimalDomestique(possession.possessionEnum)).length;
}