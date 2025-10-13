import {Perso, PersoForm, PersoHisto} from "../../types/perso/Perso";
import {metierEnCarriere} from "../../types/metiers/Metier";

export function persoFormToPersoHisto(persoForm: PersoForm): PersoHisto {
    return  {
        ...persoForm,
        // Convertir `metier` en une entrée dans `carrieres`
        idTemporel: "persoFormDebutant",
        carrieres: persoForm.metier ? [metierEnCarriere(persoForm.metier)] : [],
        sauvegardes: [], // vide pour l'instant à la création
        evtsPasses: [],
    }
}

export function persoToPersoHisto(perso: Perso): PersoHisto {
    return  {
        ...perso,
        idTemporel: "persoFormDebutant",
        sauvegardes: [], // vide pour l'instant à la création
    }
}
