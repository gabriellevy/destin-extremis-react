import {Perso} from "./Perso";
import {Evt} from "./Evt";
import {Carriere} from "./metiers/metiers";
import {
    enumMois,
    JOURS_PAR_AN,
    JOURS_PAR_SEMAINE,
    nbJourDuDernierJourDuMois,
    nbJoursDansMois
} from "../donnees/dates/calendrier";

export function joursToAnnees(jours: number) {return Math.floor(jours / JOURS_PAR_AN)}
export function anneesToJours(annees: number) {return annees * JOURS_PAR_AN}
export function age(perso: Perso) {return joursToAnnees(perso.date - perso.dateNaissance)}
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
    if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.MARTIUS]) {
        return -1;
    }
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.APRILIS]) {
        return joursDepuisDebutAnnee - nbJourDuDernierJourDuMois[enumMois.MARTIUS];
    }
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.MAIUS])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.MARTIUS];
    else if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.SEPTEMBER])
        return -1;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.IUNIUS])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.SEPTEMBER];
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.QUINTILIS])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.IUNIUS];
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.SEXTILIS])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.QUINTILIS];
    else if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.OCTOBER])
        return -1;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.NOVEMBER])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.OCTOBER];
    else if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.DECEMBER])
        return -1;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.IANUARIUS])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.DECEMBER];
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.FEBRUARIUS])
        return joursDepuisDebutAnnee-nbJourDuDernierJourDuMois[enumMois.IANUARIUS];

    return -1;
}

function calculMoisStr(joursDepuis0: number): string {
    const joursDepuisDebutAnnee: number = jourDansLAnnee(joursDepuis0);

    // détermination du mois
    if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.MARTIUS]) {
        return enumMois.MARTIUS;
    }
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.APRILIS])
        return enumMois.APRILIS;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.MAIUS])
        return enumMois.MAIUS;
    else if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.SEPTEMBER])
        return enumMois.SEPTEMBER;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.IUNIUS])
        return enumMois.IUNIUS;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.QUINTILIS])
        return enumMois.QUINTILIS;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.SEXTILIS])
        return enumMois.SEXTILIS;
    else if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.OCTOBER])
        return enumMois.OCTOBER;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.NOVEMBER])
        return enumMois.NOVEMBER;
    else if (joursDepuisDebutAnnee == nbJourDuDernierJourDuMois[enumMois.DECEMBER])
        return enumMois.DECEMBER;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.IANUARIUS])
        return enumMois.IANUARIUS;
    else if (joursDepuisDebutAnnee <= nbJourDuDernierJourDuMois[enumMois.FEBRUARIUS])
        return enumMois.FEBRUARIUS;

    return "mois inconnu"
}

export function numJourSemaineToStr(numeroJourSemaine: number): string {
    switch (numeroJourSemaine) {
        case 0: return "Dies Solis";
        case 1: return "Dies Lunae";
        case 2: return "Dies Martis";
        case 3: return "Dies Mercurii";
        case 4: return "Dies Iovis";
        case 5: return "Dies Veneris";
        case 6: return "Dies Saturni";
        case 7: return "Dies Nundinae";
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
        perso.evtsProgrammes.forEach((value, key)=>{
            if (key == perso.date) {
                const evt: Evt = {
                    id: "evt",
                    description:value,
                };
                executerEvt(evt, evtProgrammeExecute);
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
    Array.from(perso.carrieres.values()).map((carriere: Carriere) => {
        carriere.duree = carriere.duree + joursRellementAjoutes;
    });

    // console.debug("nouvMoisStr : " + nouvMoisStr);
    perso.mois = nouvMoisStr;
    perso.jourDuMois = nouvJourDuMois;
    return evtProgrammeExecute;
}