import {getRandomEnumValue} from "./random";
import {Carriere, metiersEnum, metiersObjs} from "../types/metiers/metiers";
import {Coterie, getCoterieAleatoireSauf} from "../types/Coterie";
import {Sexe} from "../types/perso/Perso";
import {anneesToJours} from "../types/Date";
import {lieuParDefaut} from "../types/lieux/Lieu";
import {viceVertuDeBase} from "../types/ViceVertu";
import {PNJ} from "../types/perso/PNJ";

export function getCarriereAleatoire(): Carriere {
    let metierAleatoire: metiersEnum = getRandomEnumValue(metiersEnum);

    return {
        metier: metiersObjs[metierAleatoire],
        duree: 0,
        competence: 1,
        actif: true,
        nbDeTestsFaits: 0,
    };
}

export function genererPNJ():PNJ {
    const cot: Coterie = getCoterieAleatoireSauf([]);
    const carriere: Carriere = getCarriereAleatoire();
    return {
        prenom: "prénom bidon",
        nom: "nom bidon",
        sexe: Sexe.male,
        dateNaissance: anneesToJours(478),
        lieu: lieuParDefaut,
        coterie: cot,
        carriere: carriere,
        viceVertu:  viceVertuDeBase(),
        mort: false,
    }
}
