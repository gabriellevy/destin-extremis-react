import {anneesToJours} from "../../types/Date";
import {lieuParDefaut} from "../../types/lieux/Lieu";
import {MetalStatut} from "../../types/statut_social/Statut";
import {Perso, Sexe} from "../../types/Perso";
import {compsDeBase} from "../../types/comps/Comps";
import {evts_programmes} from "../evts/evts_programmes";
import {Carriere, metiersEnum} from "../../types/metiers/metiers";
import {Coterie} from "../../types/Coterie";
import {viceVertuDeBase} from "../../types/ViceVertu";
import {bilanLyceeALaNaissance} from "../../types/lycee/StadeUniversite";
import {reputationVide} from "../../types/Reputation";

export const enfant: Perso = {
    prenom: "Caius",
    nom: "Aemilius",
    cognomen: "Paullus",
    sexe: Sexe.male,
    dateNaissance: anneesToJours(478), // un peu avant 490 ab urbe condita cad le début de la 1ère guerre punique
    jourDuMois: -1,
    date: anneesToJours(490), // début du pouvoir derrière le trône 3ème volume
    anneeDeDepart: 490,
    age: 13,
    lieu: lieuParDefaut,
    statut: {rang: 4, metalStatut: MetalStatut.bronze},
    coterie: Coterie.aucune, // TODO : en mettre une au hasard ? (celle des parents)
    carrieres: new Map<metiersEnum, Carriere>,
    comps: compsDeBase(),
    viceVertu: viceVertuDeBase(),
    maitrises: [],
    dieu: {id: "Aucun"},
    evtsProgrammes: evts_programmes,
    vitesseExecution: 5000,
    bilanLycee: bilanLyceeALaNaissance,
    reputation: reputationVide(),
};
