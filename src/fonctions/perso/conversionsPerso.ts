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
        idEvtsNonExecutables: [],
    } as PersoHisto
}

export function persoToPersoHisto(perso: Perso): PersoHisto {
    return  {
        ...perso,
        idTemporel: "persoFormDebutant",
        sauvegardes: [], // vide pour l'instant à la création
    }
}

/**
 * fait une copie profonde pour éviter que les différents persos pointent vers les même tableaux de données
 */
export function clonePersoHistoToPerso(persoHisto: PersoHisto): Perso {
    const { sauvegardes, ...perso } = JSON.parse(JSON.stringify(persoHisto));
    return perso as Perso;
}

/**
 * fait une copie profonde pour éviter que les différents persos pointent vers les même tableaux de données
 */
export function clonePersoHistoToPersoForm(persoHisto: PersoHisto): PersoForm {
    const {
        idTemporel, carrieres, evtsPasses, idEvtsNonExecutables, sauvegardes, ...persoForm
    } = JSON.parse(JSON.stringify(persoHisto));
    return persoForm as PersoForm;
}
