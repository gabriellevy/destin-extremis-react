import {anneesToJours} from "../../types/Date";
import {lieuParDefaut} from "../../types/lieux/Lieu";
import {MetalStatut} from "../../types/statut_social/Statut";
import {NiveauIA, Perso, Sexe} from "../../types/perso/Perso";
import {compsDeBase} from "../../types/perso/comps/Comps";
import {evts_programmes} from "../evts/evts_programmes";
import {Carriere, metiersEnum} from "../../types/metiers/metiers";
import {Coterie, rejointCoterie} from "../../types/Coterie";
import {viceVertuDeBase} from "../../types/ViceVertu";
import {bilanLyceeALaNaissance} from "../../types/lycee/StadeUniversite";
import {reputationVide} from "../../types/Reputation";
import {getCognomen, getNom, getPrenom} from "../../fonctions/noms";
import {getCoterieAleatoireSauf} from "../../fonctions/generation";

export function enfant(): Perso {
    const cot: Coterie = getCoterieAleatoireSauf([]);
    const sexe = Sexe.male;
    let perso: Perso = {
        prenom: getPrenom(cot, sexe),
        nom: getNom(cot, sexe),
        cognomen: getCognomen(cot, sexe),
        sexe: sexe,
        dateNaissance: anneesToJours(478), // un peu avant 490 ab urbe condita cad le début de la 1ère guerre punique
        jourDuMois: -1,
        date: anneesToJours(490), // début du pouvoir derrière le trône 3ème volume
        anneeDeDepart: 490,
        age: 14,
        lieu: lieuParDefaut,
        statut: {rang: 4, metalStatut: MetalStatut.bronze},
        coterie: cot,
        carrieres: new Map<metiersEnum, Carriere>,
        comps: compsDeBase(),
        viceVertu: viceVertuDeBase(),
        maitrises: [],
        dieu: {id: "Aucun"},
        evtsProgrammes: evts_programmes,
        vitesseExecution: 5000,
        bilanLycee: bilanLyceeALaNaissance,
        reputation: reputationVide(),
        niveauIA: NiveauIA.systematique,
        pnjs: [], // TODO : commencer avec parents, frères et soeurs ?
    };
    rejointCoterie(perso, cot);
    return perso;
}
