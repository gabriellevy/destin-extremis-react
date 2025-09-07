import {anneesToJours} from "../../types/Date";
import {lieuParDefaut} from "../../types/lieux/Lieu";
import {MetalStatut} from "../../types/statut_social/Statut";
import {NiveauIA, PersoForm, Sexe} from "../../types/perso/Perso";
import {compsDeBase} from "../../types/perso/comps/Comps";
import {evts_programmes} from "../evts/evts_programmes";
import {Coterie, rejointCoterie} from "../../types/Coterie";
import {viceVertuDeBase} from "../../types/ViceVertu";
import {bilanLyceeALaNaissance} from "../../types/lycee/StadeUniversite";
import {reputationVide} from "../../fonctions/perso/Reputation";
import {getCognomen, getNom, getPrenom} from "../../fonctions/noms";
import {getCoterieAleatoireSauf} from "../../fonctions/generation";
import {metiersEnum} from "../metiers";
import {Mode, PhaseDExecution} from "../../types/Mode";

export function enfant(empty: boolean): PersoForm {
    const cot: Coterie = getCoterieAleatoireSauf([]);
    const sexe = Sexe.male;
    let perso: PersoForm = {
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
        coterie: empty ? undefined : cot,
        comps: compsDeBase(),
        viceVertu: empty ? [] : viceVertuDeBase(),
        maitrises: [],
        dieu: {id: "Aucun"},
        evtsProgrammes: evts_programmes,
        vitesseExecution: 5000,
        bilanLycee: bilanLyceeALaNaissance,
        reputation: reputationVide(),
        niveauIA: NiveauIA.systematique,
        pnjs: [], // TODO : commencer avec parents, frères et soeurs ?
        pbDeSante: [],
        bioniques: [],
        nbJoursDHopital: 0,
        metier: metiersEnum.non_travailleur,
        mode: Mode.test,
        phaseDExecution: PhaseDExecution.creation,
    };
    if (!empty) {
        rejointCoterie(perso, cot);
    }
    return perso;
}
