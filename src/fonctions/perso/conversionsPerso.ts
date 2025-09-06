import {Perso, PersoForm} from "../../types/perso/Perso";
import {metierEnCarriere} from "../../types/metiers/Metier";

export function persoFormToPerso(persoForm: PersoForm): Perso {
    return  {
        ...persoForm,
        // Convertir `metier` en une entrée dans `carrieres`
        carrieres: persoForm.metier ? [metierEnCarriere(persoForm.metier)] : [],
    }
}