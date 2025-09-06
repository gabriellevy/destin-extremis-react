import {Statut} from "../statut_social/Statut";
import {Perso} from "../perso/Perso";
import {titreGuildeEnum} from "./Guilde";
import {Quartier} from "../../donnees/geographie/quartiers";
import {metiersEnum} from "../../donnees/metiers";
import {Vertus, Vices} from "../ViceVertu";

// données du métier en général, indépendamment du personnage
export type Metier = {
    nom: metiersEnum,
    statut: Statut,
    statutMax: Statut,
    intitule: (perso: Perso,carriere: Carriere) => string,
    // probabilité d'avoir ce métier dans la Ville :
    // 0 pour les métiers spécialisés extérieurs (Stalker)
    // 0.5 pour les courants (boulanger)
    // 1 pour les très courants (bureaucrate)
    proba: number,
    // vertus et vices associés : si le personnage a ces traits il aura plus de chances d'apprécier ce travail :
    vertusCompatibles: Vertus[],
    vicesCompatibles: Vices[],
}

export type MetierObj = Record<metiersEnum, Metier>;

// carrière est ce que le perso a effectué dans un métier donné
export type Carriere = {
    metier: metiersEnum,
    intitule: string,
    groupeLieu?: string, // ou ?
    employeur?: string, // quel groupe ou employeur ?
    duree: number, // temps passé à pratiquer ce métier (en jours)
    competence: number, // sur 100. 25 en débutant
    actif: boolean, // false pour une ancienne carrière (dont on conserve tout de même les compétences etc)
    nbDeTestsFaits: number,
    guilde?: titreGuildeEnum,
}

export function metierEnCarriere(metiersEnum:metiersEnum): Carriere {
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
    metier: metiersEnum.serveur,
    intitule: metiersEnum.toString(),
    groupeLieu: "Auberge du pont",
    duree: 0,
    competence: 25,
    actif: true,
    nbDeTestsFaits: 0,
};

export const metierTest: Carriere = {
    metier: metiersEnum.edile,
    intitule: metiersEnum.toString(),
    groupeLieu: Quartier.la_defense,
    duree: 0,
    competence: 25,
    actif: true,
    nbDeTestsFaits: 0,
};
