import {Lieu} from "./lieux/Lieu";
import {Statut} from "./statut_social/Statut";
import {Carriere, metiersEnum} from "./metiers/metiers";
import {Dieu} from "./Dieu";
import {Competence} from "./comps/Comps";
import {maitrises} from "../donnees/maitrises";
import {Coterie} from "./Coterie";
import {ViceVertu} from "./ViceVertu";

export type Perso = {
    prenom: string;
    nom: string;
    cognomen: string;
    sexe: Sexe;
    dateNaissance: number;
    date: number, // en nombre de jours depuis l'an 0 du calendrier impérial
    anneeDeDepart?: number, // cette donnée est utilisée pour el formulaire mais inutile ensuite => faire une structure de donnée pour formulaire qui hériterait de celle ci ??
    age?: number, // cette donnée est utilisée pour el formulaire mais inutile ensuite => faire une structure de donnée pour formulaire qui hériterait de celle ci ??
    lieu: Lieu,
    // aide à la programmation mais pas à afficher directement :
    mois?: string, // déduit de date mais pratique pour optimiser les calculs de conditions en masse
    jourDuMois: number, // déduit de date mais pratique pour optimiser les calculs de conditions en masse
    statut: Statut;
    coterie: Coterie;
    carrieres: Map<metiersEnum, Carriere>, // TODO : conversion en tableau plutôt : évitera des pb d'export de json etc
    // surtout utile si affilié à un temple (ou très très croyant en un dieu particulier)
    dieu: Dieu,
    comps: Competence[],
    viceVertu: ViceVertu[],
    maitrises: maitrises[],
    evtsProgrammes: Map<number, (perso: Perso)=>string> // TODO : conversion en tableau plutôt : évitera des pb d'export de json etc
    vitesseExecution: number, // en millisecondes entre chaque événement
    mort?: boolean,
};

export enum Sexe {
    male = 'Mâle',
    femelle = 'Femelle',
}
