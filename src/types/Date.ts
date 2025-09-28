import {Perso} from "./perso/Perso";
import {Evt, EvtProgramme} from "./Evt";
import {Carriere} from "./metiers/Metier";
import {
    enumMois,
    JOURS_PAR_AN,
    JOURS_PAR_SEMAINE,
    nbJourDuDernierJourDuMois,
    nbJoursDansMois
} from "../donnees/dates/calendrier";

export function joursToAnnees(jours: number) {return Math.floor(jours / JOURS_PAR_AN)}
export function anneesToJours(annees: number) {return annees * JOURS_PAR_AN}
export function getAge(perso: Perso) {return joursToAnnees(perso.date - perso.dateNaissance)}
// numéro du jour actuel depuis le début de l'année en cours (dibc de 0 à JOURS_PAR_AN-1)
export function jourDansLAnnee(joursDepuis0: number) {return joursDepuis0%JOURS_PAR_AN + 1}

// dénomination complète du jour : "jour_semaine numéro_du_mois mois année"
export function jourStr(joursDepuis0: number): string {
    const numeroJourSemaine: number = joursDepuis0 % JOURS_PAR_SEMAINE;
    const annee = joursToAnnees(joursDepuis0);
    return formatJourStr(numeroJourSemaine, calculJourDuMois(joursDepuis0), calculMoisStr(joursDepuis0), annee);
}

function calculJourDuMois(joursDepuis0: number): number {
    const joursDepuisDebutAnnee: number = jourDansLAnnee(joursDepuis0);

    // détermination du mois
    if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.vendemiaire])
        return joursDepuisDebutAnnee;

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.brumaire])
        return joursDepuisDebutAnnee - nbJourDuDernierJourDuMois[enumMois.vendemiaire];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.frimaire])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.brumaire];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.nivose])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.frimaire];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.pluviose])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.nivose];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.ventose])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.pluviose];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.germinal])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.ventose];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.floreal])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.germinal];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.prairial])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.floreal];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.messidor])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.prairial];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.thermidor])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.messidor];

    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.fructidor])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.thermidor];

    return -1;
}

function calculMoisStr(joursDepuis0: number): string {
    const joursDepuisDebutAnnee: number = jourDansLAnnee(joursDepuis0);

    // détermination du mois
    if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.vendemiaire])
        return enumMois.vendemiaire;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.brumaire])
        return enumMois.brumaire;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.frimaire])
        return enumMois.frimaire;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.nivose])
        return enumMois.nivose;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.pluviose])
        return enumMois.pluviose;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.ventose])
        return enumMois.ventose;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.germinal])
        return enumMois.germinal;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.floreal])
        return enumMois.floreal;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.prairial])
        return enumMois.prairial;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.messidor])
        return enumMois.messidor;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.thermidor])
        return enumMois.thermidor;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.fructidor])
        return enumMois.fructidor;

    return "mois inconnu"
}

export function numJourSemaineToStr(numeroJourSemaine: number): string {
    switch (numeroJourSemaine) {
        case 0: return "Primidi";
        case 1: return "Duodi";
        case 2: return "Tridi";
        case 3: return "Quartidi";
        case 4: return "Quintidi";
        case 5: return "Sextidi";
        case 6: return "Septidi";
        case 7: return "Octidi";
        case 8: return "Nonidi";
        case 9: return "Décadi";
    }
    return "non défini !";
}

export function formatJourStr(numeroJourSemaine: number, jourDuMois:number, moisStr: string, annee: number): string {
    let final: string = numJourSemaineToStr(numeroJourSemaine);
    if (jourDuMois != -1) {
        final += " " + jourDuMois;
    }
    final += " " + moisStr;
    final += " " + annee;
    return final;
}

export function dateCompleteToJourDepuis0(jourDansMois: number, mois: enumMois, annee: number): number {
    return (anneesToJours(annee) +
        nbJourDuDernierJourDuMois[mois] - nbJoursDansMois[mois] + // début du mois
        jourDansMois - 1);
}

export function leTempsPasse(perso: Perso, executerEvt: (evtExecute: Evt, dateDejaAffichee: boolean)=>void): boolean {
    // ajouter 1D20 jours à l'âge du personnage // TODO : quelle vitesse ? paramétrable ?
    const joursAAjouter = Math.floor(Math.random() * 20) + 1;
    let joursRellementAjoutes: number = 0;
    // const joursAAjouter: number = 1;

    let evtProgrammeExecute: boolean = false;
    // vérifier toutes les dates au cas où un evt "forcé" devrait avoir lieu ici avant
    for (joursRellementAjoutes= 0 ; joursRellementAjoutes <= joursAAjouter ; ++joursRellementAjoutes) {
        perso.date = perso.date + 1;
        perso.evtsProgrammes.forEach((evtProgramme: EvtProgramme)=>{
            if (evtProgramme.date == perso.date) {
                executerEvt(evtProgramme.evt, evtProgrammeExecute);
                // TODO: ? nettoyage des evts exécutés ?? suppression de ceux dont la date est dépassée ?
                evtProgrammeExecute = true;
            }
        })
        if (evtProgrammeExecute) {
            // interrompt le défilement des jours
            break;
        }
    }

    const nouvJourDuMois: number = calculJourDuMois(perso.date);
    const nouvMoisStr: string = calculMoisStr(perso.date);
    // ---- Modification des valeurs affectées par le passage du temps
    // - carrières
    Array.from(perso.carrieres.values()).map((carriere: Carriere) => {
        carriere.duree = carriere.duree + joursRellementAjoutes;
    });
    // - blessures
    if (perso.nbJoursDHopital > 0) {
        perso.nbJoursDHopital -= joursRellementAjoutes;
        if (perso.nbJoursDHopital < 0) {
            perso.nbJoursDHopital = 0;
        }
    }

    // console.debug("nouvMoisStr : " + nouvMoisStr);
    perso.mois = nouvMoisStr;
    perso.jourDuMois = nouvJourDuMois;
    return evtProgrammeExecute;
}