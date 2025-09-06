import {Perso} from "../perso/Perso";
import {metiersEnum} from "../../donnees/metiers";
import {Carriere} from "./Metier";

// undefined si n'appartient pas à la guilde
export enum titreGuildeEnum {
    membre = "Membre de guilde",
    maitre = "Maître de guilde",
}

export function appartientALaGuilde(perso: Perso, metierEnum: metiersEnum) {
    const carriere = perso.carrieres.find((carriere: Carriere) => carriere.metier.nom === metierEnum);
    return (carriere !== undefined && carriere.guilde);
}

export function rejointGuilde(perso: Perso, metierEnum: metiersEnum) {
    const carriere = perso.carrieres.find((carriere: Carriere) => carriere.metier.nom === metierEnum);
    if (carriere !== undefined) {
        carriere.guilde = titreGuildeEnum.membre;
    } else {
        console.error("Tentative de rejoindre une guilde a échoé pour métier : " + metierEnum.toString());
    }
}
