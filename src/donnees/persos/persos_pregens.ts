import {anneesToJours} from "../../types/Date";
import {lieuAleatoire} from "../../types/lieux/Lieu";
import {MetalStatut} from "../../types/statut_social/Statut";
import {NiveauIA, PersoForm, Sexe} from "../../types/perso/Perso";
import {compsDeBase} from "../../types/perso/comps/Comps";
import {evts_emeutes_khaos} from "../evts/programmes/evts_emeutes_khaos";
import {Coterie} from "../../types/Coterie";
import {viceVertuDeBase} from "../../types/ViceVertu";
import {bilanLyceeALaNaissance} from "../../types/lycee/StadeUniversite";
import {reputationVide} from "../../fonctions/perso/Reputation";
import {getCognomen, getNom, getPrenom} from "../../fonctions/noms";
import {getCoterieAleatoireSauf} from "../../fonctions/generation";
import {MetiersEnum} from "../metiers";
import {Mode, PhaseDExecution} from "../../types/Mode";
import {rejointCoterie} from "../../fonctions/coteries/generales";
import {ANNEE_DE_DEPART, DATE_NAISSANCE_BASE, NB_POINTS_DESTIN_DEPART, SECONDES_ENTRE_CHAQUE_EVT} from "../ReglagesJouabilite";
import {Religion} from "../../types/Religion";
import {evts_anniversaire} from "../evts/programmes/evts_anniversaire";

export function enfant(empty: boolean): PersoForm {
    const cot: Coterie = getCoterieAleatoireSauf([]);
    const sexe = Sexe.male;
    let perso: PersoForm = {
        prenom: getPrenom(cot, sexe),
        nom: getNom(cot, sexe),
        cognomen: getCognomen(cot, sexe),
        bonheur: 0.5,
        sexe: sexe,
        dateNaissance: anneesToJours(DATE_NAISSANCE_BASE), // début à 13-14 ans
        date: anneesToJours(ANNEE_DE_DEPART),
        anneeDeDepart: ANNEE_DE_DEPART,
        age: ANNEE_DE_DEPART-DATE_NAISSANCE_BASE,
        lieu: lieuAleatoire(),
        jourDuMois: -1,
        statut: {rang: 4, metalStatut: MetalStatut.bronze},
        coterie: empty ? undefined : cot,
        religion: Religion.aucun,
        comps: compsDeBase(),
        viceVertu: empty ? [] : viceVertuDeBase(),
        maitrises: [],
        evtsProgrammes: [
            ...evts_emeutes_khaos,
            ...evts_anniversaire],
        secondesEntreChaqueEvt: SECONDES_ENTRE_CHAQUE_EVT,
        bilanLycee: bilanLyceeALaNaissance,
        reputation: reputationVide(),
        pnjs: [], // TODO : commencer avec parents, frères et soeurs ?
        possessions: [],
        niveauIA: NiveauIA.bouche_trou,
        pbDeSante: [],
        bioniques: [],
        drogues: [],
        nbJoursDHopital: 0,
        debogue: false,
        metier: MetiersEnum.non_travailleur,
        mode: Mode.test,
        phaseDExecution: PhaseDExecution.creation,
        pointDestin: NB_POINTS_DESTIN_DEPART,
    };
    if (!empty) {
        rejointCoterie(perso, cot);
    }
    return perso;
}
