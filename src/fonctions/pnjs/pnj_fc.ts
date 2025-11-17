import {Perso} from "../../types/perso/Perso";
import {PNJ} from "../../types/perso/PNJ";

export function supprimerPnj(perso:Perso, prenom: string, nom: string) {
    perso.pnjs = perso.pnjs.filter((pnj: PNJ) => !(pnj.nom === nom && pnj.prenom === prenom));
}