import {Lieu} from "../lieux/Lieu";
import {Statut} from "../statut_social/Statut";
import {Carriere} from "../metiers/Metier";
import {Religion} from "../Religion";
import {Maitrise} from "../../donnees/maitrise";
import {Coterie} from "../Coterie";
import {ViceVertu} from "../ViceVertu";
import {BilanLycee} from "../lycee/StadeUniversite";
import {Competence} from "./comps/Comps";
import {PNJ} from "./PNJ";
import {MetiersEnum} from "../../donnees/metiers";
import {PbDeSante} from "../sante/pbDeSante";
import {Bionique} from "../sante/Bionique";
import {Mode, PhaseDExecution} from "../Mode";
import {EvtExecute, EvtProgramme} from "../Evt";
import {Reputation} from "./Reputation";
import {Possession} from "../../donnees/possessions/Possession";
import {droguesEnum} from "../../donnees/sante/drogues";

export type PersoCommon = {
    prenom: string;
    nom?: string;
    cognomen?: string;
    // 0 (suicidaire)
    // 0.5 : normal
    // à 1 (heureux)
    bonheur: number,
    sexe: Sexe;
    dateNaissance: number; // en nombre de jours depuis l'an 0 du calendrier consulaire
    date: number, // en nombre de jours depuis l'an 0 du calendrier consulaire
    lieu: Lieu,
    // aide à la programmation mais pas à afficher directement :
    mois?: string, // déduit de date mais pratique pour optimiser les calculs de conditions en masse
    jourDuMois: number, // déduit de date mais pratique pour optimiser les calculs de conditions en masse
    statut: Statut;
    coterie?: Coterie;
    religion: Religion,
    comps: Competence[],
    viceVertu: ViceVertu[],
    maitrises: Maitrise[],
    evtsProgrammes: EvtProgramme[],
    secondesEntreChaqueEvt: number, // en millisecondes entre chaque événement
    mort?: boolean,
    victoire?: boolean,
    bilanLycee: BilanLycee
    reputation: Reputation
    // personnes avec qui le perso est en relation
    pnjs: PNJ[],
    // IA :
    niveauIA: NiveauIA,
    // santé
    pbDeSante: PbDeSante[],
    bioniques: Bionique[],
    drogues: droguesEnum[],
    // seulement les possessions "spéciales" qui ne sont pas implicites via le statut du perso
    possessions: Possession[],
    nbJoursDHopital: number,
    mode: Mode; // mode actuel d'exécution // immutable
    phaseDExecution: PhaseDExecution;
    debogue?: boolean;
    pointDestin: number;
    // ------------------ orks ------------------------ //
    esclaveGtrechin?: string, // nom de l'esclave gretchin
};

/**
 * Perso simplifié, pour la sélection initiale dans le formulaire de création
 * => ses valeurs doivent être converties en valeurs de 'Perso' lors de la validation de création de personnage
 * puis elles sont inutiles
 */
export interface PersoForm extends PersoCommon {
    metier?: MetiersEnum,
    anneeDeDepart?: number,
    age: number,
}

/**
 * type standard utilisé lors de l'exécution
 */
export type Perso = PersoCommon & {
    idTemporel: string, // identifiant du perso à un événement précis
    carrieres: Carriere[],
    evtsPasses: EvtExecute[],
    // ids des evts non exécutables à l'avenir (en général parce qu'ils nt déjà été exécutés et ne sont pas répétables)
    idEvtsNonExecutables: string[],
    evtsNonRexecutablesTemporairement: EvtNonRexecutableTemporairement[],
}

export type EvtNonRexecutableTemporairement = {
    id: string,
    nbJoursRestants:number
}

/**
 * état complet du jeu donc :
 * - perso à l'instant t
 * - état complet du perso lors de chaque evt passé
 * (doit être sauvegardable en json)
 */
export type PersoHisto = Perso & {
    // ------------ sauvegarde de l'historique
    sauvegardes: Perso[],
}

export enum NiveauIA {
    desactive = 'Désactivé', // aucune IA, mode par défaut
    bouche_trou = 'Bouche trou', // pour les scènes de remplissage et à la rigueur quand un texte a été trop répété
    // tout ce qui peut être IAtisé l'est, donc tout sauf les messages formels précis et indispensables
    // en théorie tous les messages devraient avoir une version "prompt" pour IA, mais bon ne rêvons pas trop
    systematique = 'Systématique',
}
export enum Sexe {
    male = 'Mâle',
    femelle = 'Femelle',
}

export function getSexeOppose(sexe:Sexe) {
    return sexe === Sexe.male ? Sexe.femelle : Sexe.male;
}
