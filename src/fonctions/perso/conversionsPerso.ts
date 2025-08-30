import {Perso, PersoForm} from "../../types/perso/Perso";
import {metiersEnum} from "../../donnees/metiers";
import {Carriere, metierEnCarriere} from "../../types/metiers/Metier";

export function persoFormToPerso(persoForm: PersoForm): Perso {
    return  {
        ...persoForm,
        // Convertir `metier` en une entrée dans `carrieres`
        carrieres: persoForm.metier ? new Map<metiersEnum, Carriere>([
            [persoForm.metier, metierEnCarriere(persoForm.metier)]
        ]) : new Map<metiersEnum, Carriere>(),
    }
}