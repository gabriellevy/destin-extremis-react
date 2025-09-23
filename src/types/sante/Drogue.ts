import {ModificateurCompetence} from "../perso/comps/Comps";
import {ModificateurViceVertu} from "../ViceVertu";
import {droguesEnum} from "../../donnees/sante/drogues";

export type Drogue = {
    nom: string;
    // ce qui arrive aux caracs du perso si il prend cette drogue régulièrement
    modifsCompetences: ModificateurCompetence[],
    modifsVicesVertus: ModificateurViceVertu[],
    // texte affiché quand le personnage prend cette drogue
    description: string,
    prix?: number, // baisse du statut (si c'est vraiment très cher)
}

export type DrogueObj = Record<droguesEnum, Drogue>;
