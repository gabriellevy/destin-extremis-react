import {dateCompleteToJourDepuis0} from "../../types/Date";
import {enumMois} from "./calendrier";

// date prévue pour laisser au perso le temps de "vivre" avant que les problèmes commencent
export const unAnAvantDebutCampagne: number = dateCompleteToJourDepuis0(5, enumMois.MAIUS, 2511);

// I. L'ennemi intérieur

export const assassinatDeVonTasseninck: number = dateCompleteToJourDepuis0(27, enumMois.IUNIUS, 2512);

// II. Mort sur le Reik
export const editSurLesMutants: number = dateCompleteToJourDepuis0(5, enumMois.IUNIUS, 2512);

// III. Pouvoir derrière le trône
export const finDuCarnavalPDT: number = dateCompleteToJourDepuis0(19, enumMois.FEBRUARIUS, 2512);


// V. L'empire en flammes
export const grafBorisArriveAAltdorf: number = dateCompleteToJourDepuis0(20, enumMois.SEXTILIS, 2513);


// ------------------
export const finCampagneInterieur: number = dateCompleteToJourDepuis0(14, enumMois.FEBRUARIUS, 2513);