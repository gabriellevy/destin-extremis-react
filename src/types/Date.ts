import {EvtNonRexecutableTemporairement, Perso} from "./perso/Perso";
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
export function anneesToJours(annees: number) {return Math.floor(annees * JOURS_PAR_AN)}
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

export function jourDeLaSemaineStr(joursDepuis0:number): string {
    return  numJourSemaineToStr(joursDepuis0 % JOURS_PAR_SEMAINE);
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
    let evtProgrammeExecute: boolean = false;
    // vérifier au cas où un evt "forcé" devrait avoir lieu ce jour précis
    perso.date = perso.date + 1;
    perso.evtsProgrammes.forEach((evtProgramme: EvtProgramme)=>{
        if (evtProgramme.date !== undefined && evtProgramme.date(perso)) {
            executerEvt(evtProgramme.evt, evtProgrammeExecute);
            // TODO: ? nettoyage des evts exécutés ?? suppression de ceux dont la date est dépassée ?
            evtProgrammeExecute = true;
        }
    })

    // tous les événements non réexecutables temporairement perdent un jour de délai de blocage :
    perso.evtsNonRexecutablesTemporairement = perso.evtsNonRexecutablesTemporairement
        .map((evt:EvtNonRexecutableTemporairement) => {
            return {
                id: evt.id,
                nbJoursRestants: evt.nbJoursRestants -= 1
            }
        })
        .filter((evt: EvtNonRexecutableTemporairement) => evt.nbJoursRestants > 0);

    const nouvJourDuMois: number = calculJourDuMois(perso.date);
    const nouvMoisStr: string = calculMoisStr(perso.date);
    // ---- Modification des valeurs affectées par le passage du temps
    // - carrières
    Array.from(perso.carrieres.values()).map((carriere: Carriere) => {
        carriere.duree = carriere.duree + 1;
    });
    // - blessures
    if (perso.nbJoursDHopital > 0) {
        perso.nbJoursDHopital -= 1;
        if (perso.nbJoursDHopital < 0) {
            perso.nbJoursDHopital = 0;
        }
    }

    // console.debug("nouvMoisStr : " + nouvMoisStr);
    perso.mois = nouvMoisStr;
    perso.jourDuMois = nouvJourDuMois;
    return evtProgrammeExecute;
}

/**
 *
 * @param date1 en nombre de secondes depuis l'an 0
 * @param date2
 */
export function nbMoisEntre2Dates(date1:number, date2:number): number {
    return date2 > date1 ? Math.floor((date2 - date1)/30)
         : Math.floor((date1 - date2)/30);
}

export function dureeEntre2DatesToStr(date1:number, date2:number): string {
    let nbMois:number = nbMoisEntre2Dates(date1, date2);
    if (nbMois < 12) return nbMois + " mois";
    else return Math.floor(nbMois/12) + " années";
}