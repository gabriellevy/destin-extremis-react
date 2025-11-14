import {Statut} from "../statut_social/Statut";
import {Perso} from "../perso/Perso";
import {titreGuildeEnum} from "./Guilde";
import {Quartier} from "../../donnees/geographie/quartiers";
import {MetiersEnum} from "../../donnees/metiers";
import {Vertu, Vice} from "../ViceVertu";

export enum PhaseProfessionnelle {
    etudie,
    travaille,
    arret, // TODO : devrait remplacer active === false
}

// données du métier en général, indépendamment du personnage
export type Metier = {
    nom: MetiersEnum,
    statut: Statut,
    statutMax: Statut,
    intitule: (perso: Perso,carriere: Carriere) => string,
    // probabilité d'avoir ce métier dans la Ville :
    // 0 pour les métiers spécialisés extérieurs (Stalker)
    // 0.5 pour les courants (boulanger)
    // 1 pour les très courants (bureaucrate)
    proba: number,
    // vertus et vices associés : si le personnage a ces traits il aura plus de chances d'apprécier ce travail :
    //  les deux combinés devraient inclure de 4 à 6 vices vertus pour rester équitables
    vertusCompatibles: Vertu[],
    vicesCompatibles: Vice[],
}

export type MetierObj = Record<MetiersEnum, Metier>;

// carrière est ce que le perso a effectué dans un métier donné
export type Carriere = {
    metier: MetiersEnum,
    phaseProfessionnelle?: PhaseProfessionnelle, // empty means travaille
    intitule: string,
    groupeLieu?: string, // ou ?
    employeur?: string, // quel groupe ou employeur ?
    duree: number, // temps passé à pratiquer ce métier (en jours)
    competence: number, // sur 100. 25 en débutant
    actif: boolean, // false pour une ancienne carrière (dont on conserve tout de même les compétences etc) // TODO retirer et remplacer usage par 'phaseProfessionnelle'
    nbDeTestsFaits: number,
    guilde?: titreGuildeEnum,
}

export function metierEnCarriere(metiersEnum:MetiersEnum): Carriere {
    return {
        metier: metiersEnum,
        intitule: metiersEnum.toString(),
        duree: 0,
        competence: 25,
        actif: true,
        nbDeTestsFaits: 0
    }
}

export const serveurDebutant: Carriere = {
    metier: MetiersEnum.serveur,
    intitule: MetiersEnum.toString(),
    groupeLieu: "Auberge du pont",
    duree: 0,
    competence: 25,
    actif: true,
    nbDeTestsFaits: 0,
};

export const metierTest: Carriere = {
    metier: MetiersEnum.edile,
    intitule: MetiersEnum.toString(),
    groupeLieu: Quartier.la_defense,
    duree: 0,
    competence: 25,
    actif: true,
    nbDeTestsFaits: 0,
};
