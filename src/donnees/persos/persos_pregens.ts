import {anneesToJours} from "../../types/Date";
import {enVoyageEnSiberie, lieuParDefaut} from "../../types/lieux/Lieu";
import {MetalStatut} from "../../types/statut_social/Statut";
import {Perso, Sexe} from "../../types/Perso";
import {compsDeBase} from "../../types/comps/Comps";
import {evts_programmes} from "../evts/evts_programmes";
import {Carriere, metiersEnum} from "../../types/metiers/metiers";
import {APOLLON} from "../dieux/dieux";
import {Coterie} from "../../types/Coterie";

export const enfant: Perso = {
    prenom: "Caius",
    nom: "Aemilius",
    cognomen: "Paullus",
    sexe: Sexe.male,
    dateNaissance: anneesToJours(478), // un peu avant 490 ab urbe condita cad le début de la 1ère guerre punique
    jourDuMois: -1,
    date: anneesToJours(490), // début du pouvoir derrière le trône 3ème volume
    anneeDeDepart: 490,
    age: 17,
    lieu: lieuParDefaut,
    statut: {rang: 4, metalStatut: MetalStatut.bronze},
    coterie: Coterie.acheron,
    carrieres: new Map<metiersEnum, Carriere>,
    comps: compsDeBase(),
    maitrises: [],
    dieu: {id: APOLLON},
    evtsProgrammes: evts_programmes,
    vitesseExecution: 5000,
};

export const jeuneHommeEnVoyageEnCampanie: Perso = {
    prenom: "Lucius",
    nom: "Aemilius",
    cognomen: "Paullus",
    sexe: Sexe.male,
    dateNaissance: anneesToJours(478),
    date: anneesToJours(490),
    jourDuMois: -1,
    lieu: enVoyageEnSiberie,
    coterie: Coterie.acheron,
    statut: {rang: 2, metalStatut: MetalStatut.argent},
    carrieres: new Map<metiersEnum, Carriere>,
    comps: compsDeBase(),
    maitrises: [],
    dieu: {id: APOLLON},
    evtsProgrammes: evts_programmes,
    vitesseExecution: 5000,
};
