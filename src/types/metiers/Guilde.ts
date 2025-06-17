import {metiersEnum} from "./metiers";
import {Perso} from "../Perso";

// undefined si n'appartient pas à la guilde
export enum titreGuildeEnum {
    membre = "Membre de guilde",
    maitre = "Maître de guilde",
}

export function appartientALaGuilde(perso: Perso, metierEnum: metiersEnum) {
    const carriere = perso.carrieres.get(metierEnum);
    return (carriere !== undefined && carriere.guilde);
}

export function rejointGuilde(perso: Perso, metierEnum: metiersEnum) {
    const carriere = perso.carrieres.get(metierEnum);
    if (carriere !== undefined) {
        carriere.guilde = titreGuildeEnum.membre;
    } else {
        console.error("Tentative de rejoindre une guilde a échoé pour métier : " + metierEnum.toString());
    }
}
