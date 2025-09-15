import {anneesToJours} from "../../types/Date";
import {lieuParDefaut} from "../../types/lieux/Lieu";
import {MetalStatut} from "../../types/statut_social/Statut";
import {NiveauIA, PersoForm, Sexe} from "../../types/perso/Perso";
import {compsDeBase} from "../../types/perso/comps/Comps";
import {evts_programmes} from "../evts/evts_programmes";
import {Coterie} from "../../types/Coterie";
import {viceVertuDeBase} from "../../types/ViceVertu";
import {bilanLyceeALaNaissance} from "../../types/lycee/StadeUniversite";
import {reputationVide} from "../../fonctions/perso/Reputation";
import {getCognomen, getNom, getPrenom} from "../../fonctions/noms";
import {getCoterieAleatoireSauf} from "../../fonctions/generation";
import {metiersEnum} from "../metiers";
import {Mode, PhaseDExecution} from "../../types/Mode";
import {rejointCoterie} from "../../fonctions/coteries/generales";

export function enfant(empty: boolean): PersoForm {
    const cot: Coterie = getCoterieAleatoireSauf([]);
    const sexe = Sexe.male;
    let perso: PersoForm = {
        prenom: getPrenom(cot, sexe),
        nom: getNom(cot, sexe),
        cognomen: getCognomen(cot, sexe),
        bonheur: 0.5,
        sexe: sexe,
        dateNaissance: anneesToJours(476),
        date: anneesToJours(490),
        anneeDeDepart: 490,
        age: 14,
        lieu: lieuParDefaut,
        jourDuMois: -1,
        statut: {rang: 4, metalStatut: MetalStatut.bronze},
        coterie: empty ? undefined : cot,
        dieu: {id: "Aucun"},
        comps: compsDeBase(),
        viceVertu: empty ? [] : viceVertuDeBase(),
        maitrises: [],
        evtsProgrammes: evts_programmes,
        vitesseExecution: 5000,
        bilanLycee: bilanLyceeALaNaissance,
        reputation: reputationVide(),
        pnjs: [], // TODO : commencer avec parents, frères et soeurs ?
        possessions: [],
        niveauIA: NiveauIA.desactive,
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
