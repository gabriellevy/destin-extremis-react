import {MetalStatut, Statut} from "../statut_social/Statut";
import {Perso} from "../perso/Perso";
import {titreGuildeEnum} from "./Guilde";
import {Quartier} from "../../donnees/geographie/quartiers";

export enum metiersEnum {
    maitre_de_guilde = "Maître de guilde",
    serveur = "Serveur",
    macon = "Maçon",
    edile = "Édile",
    ranconneur = "Rançonneur",
    novice = "Moine novice",
    moine = "Moine",
    initie_pretre = "Initié prêtre",
    pretre = "Prêtre",
    stalker = "Stalker",
    etudiant_ingenieur = "Étudiant ingénieur",
    ingenieur = "Ingénieur",
    batelier = "Batelier",
    apprenti_Forgeron = "Apprenti forgeron",
    forgeron = "Forgeron",
    apprenti_brasseur = "Apprenti brasseur",
    brasseur = "Brasseur",
    apprenti_boulanger = "Apprenti boulanger",
    boulanger = "Boulanger",
    apprenti_boucher = "Apprenti boucher",
    boucher = "boucher",
    apprenti_barbier_chirurgien = "Apprenti barbier chirurgien",
    barbier_chirurgien = "Barbier chirurgien",
    centurion = "Centurion",
    gladiateur = "Gladiateur",
    legionnaire = "Légionnaire",
    pamphletaire = "Pamphlétaire",
}

export type Metier = {
    nom: metiersEnum,
    statut: Statut,
    statutMax: Statut,
    intitule: (perso: Perso,carriere: Carriere) => string,
}

export type MetierObj = Record<metiersEnum, Metier>;

export const metiersObjs: MetierObj = {
    // citadins
    [metiersEnum.pamphletaire] : {
        nom: metiersEnum.pamphletaire,
        intitule: () => metiersEnum.pamphletaire,
        statut: {rang: 1, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.bronze},
    },

    // ------ ------- artisans
    [metiersEnum.etudiant_ingenieur] : {
        nom: metiersEnum.etudiant_ingenieur,
        intitule: () => metiersEnum.etudiant_ingenieur,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.bronze},
    },
    [metiersEnum.apprenti_Forgeron] : {
        nom: metiersEnum.apprenti_Forgeron,
        intitule: () => metiersEnum.apprenti_Forgeron,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.bronze},
    },
    [metiersEnum.apprenti_brasseur] : {
        nom: metiersEnum.apprenti_brasseur,
        intitule: () => metiersEnum.apprenti_brasseur,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.bronze},
    },
    [metiersEnum.apprenti_boulanger] : {
        nom: metiersEnum.apprenti_boulanger,
        intitule: () => metiersEnum.apprenti_boulanger,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.bronze},
    },
    [metiersEnum.apprenti_boucher] : {
        nom: metiersEnum.apprenti_boucher,
        intitule: () => metiersEnum.apprenti_boucher,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.bronze},
    },
    [metiersEnum.ingenieur] : {
        nom: metiersEnum.ingenieur,
        intitule: () => metiersEnum.ingenieur,
        statut: {rang: 2, metalStatut: MetalStatut.argent},
        statutMax: {rang: 2, metalStatut: MetalStatut.or},
    },
    [metiersEnum.forgeron] : {
        nom: metiersEnum.forgeron,
        intitule: () => metiersEnum.forgeron,
        statut: {rang: 1, metalStatut: MetalStatut.argent},
        statutMax: {rang: 1, metalStatut: MetalStatut.or},
    },
    [metiersEnum.macon] : {
        nom: metiersEnum.macon,
        intitule: () => metiersEnum.macon,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 2, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.brasseur] : {
        nom: metiersEnum.brasseur,
        intitule: () => metiersEnum.brasseur,
        statut: {rang: 1, metalStatut: MetalStatut.argent},
        statutMax: {rang: 1, metalStatut: MetalStatut.or},
    },
    [metiersEnum.boulanger] : {
        nom: metiersEnum.boulanger,
        intitule: () => metiersEnum.boulanger,
        statut: {rang: 1, metalStatut: MetalStatut.argent},
        statutMax: {rang: 1, metalStatut: MetalStatut.or},
    },
    [metiersEnum.boucher] : {
        nom: metiersEnum.boucher,
        intitule: () => metiersEnum.boucher,
        statut: {rang: 1, metalStatut: MetalStatut.argent},
        statutMax: {rang: 1, metalStatut: MetalStatut.or},
    },

    [metiersEnum.apprenti_barbier_chirurgien] : {
        nom: metiersEnum.apprenti_barbier_chirurgien,
        intitule: () => metiersEnum.apprenti_barbier_chirurgien,
        statut: {rang: 3, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 1, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.barbier_chirurgien] : {
        nom: metiersEnum.barbier_chirurgien,
        intitule: () => metiersEnum.barbier_chirurgien,
        statut: {rang: 3, metalStatut: MetalStatut.argent},
        statutMax: {rang: 1, metalStatut: MetalStatut.or},
    },
    [metiersEnum.centurion] : {
        nom: metiersEnum.centurion,
        intitule: () => metiersEnum.centurion,
        statut: {rang: 4, metalStatut: MetalStatut.argent},
        statutMax: {rang: 1, metalStatut: MetalStatut.or},
    },
    [metiersEnum.legionnaire] : {
        nom: metiersEnum.legionnaire,
        intitule: () => metiersEnum.legionnaire,
        statut: {rang: 1, metalStatut: MetalStatut.argent},
        statutMax: {rang: 3, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.gladiateur] : {
        nom: metiersEnum.gladiateur,
        intitule: () => metiersEnum.gladiateur,
        statut: {rang: 0, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 3, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.batelier] : {
        nom: metiersEnum.batelier,
        intitule: () => metiersEnum.batelier,
        statut: {rang: 1, metalStatut: MetalStatut.argent},
        statutMax: {rang: 5, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.maitre_de_guilde] : {
        nom: metiersEnum.maitre_de_guilde,
        intitule: () => metiersEnum.maitre_de_guilde,
        statut: {rang: 1, metalStatut: MetalStatut.or},
        statutMax: {rang: 2, metalStatut: MetalStatut.or},
    },
    [metiersEnum.serveur] : {
        nom: metiersEnum.serveur,
        intitule: (_perso: Perso, carriere: Carriere) => {
            return metiersEnum.serveur + " à " + carriere?.groupeLieu;
        },
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 2, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.edile] : {
        nom: metiersEnum.edile,
        intitule: (_perso: Perso, carriere: Carriere) => {
            return metiersEnum.edile + " à " + carriere?.groupeLieu;
        },
        statut: {rang: 4, metalStatut: MetalStatut.argent},
        statutMax: {rang: 1, metalStatut: MetalStatut.or},
    },
    [metiersEnum.ranconneur] : {
        nom: metiersEnum.ranconneur,
        intitule: () => metiersEnum.ranconneur,
        statut: {rang: 3, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.novice] : {
        nom: metiersEnum.novice,
        intitule: (perso: Perso) => {
            return metiersEnum.novice + " de " + perso.dieu.id;
        },
        statut: {rang: 1, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 2, metalStatut: MetalStatut.bronze},
    },
    [metiersEnum.initie_pretre] : {
        nom: metiersEnum.initie_pretre,
        intitule: (perso: Perso) => metiersEnum.initie_pretre + " de " + perso.dieu.id,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 4, metalStatut: MetalStatut.bronze},
    },
    [metiersEnum.moine] : {
        nom: metiersEnum.moine,
        intitule: (perso: Perso) => metiersEnum.moine + " de " + perso.dieu.id,
        statut: {rang: 4, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 5, metalStatut: MetalStatut.argent},
    },
    [metiersEnum.pretre] : {
        nom: metiersEnum.pretre,
        intitule: (perso: Perso) => metiersEnum.pretre + " de " + perso.dieu.id,
        statut: {rang: 1, metalStatut: MetalStatut.argent},
        statutMax: {rang: 2, metalStatut: MetalStatut.or},
    },
    [metiersEnum.stalker] : {
        nom: metiersEnum.stalker,
        intitule: (_perso: Perso, _carriere: Carriere) => metiersEnum.stalker,
        statut: {rang: 2, metalStatut: MetalStatut.bronze},
        statutMax: {rang: 4, metalStatut: MetalStatut.argent},
    },
}

export type Carriere = {
    metier: Metier,
    groupeLieu?: string, // ou ?
    employeur?: string, // quel groupe ou employeur ?
    duree: number, // temps passé à pratiquer ce métier (en jours)
    competence: number, // sur 100. 1 en débutant
    actif: boolean, // false pour une ancienne carrière (dont on conserve tout de même les compétences etc)
    nbDeTestsFaits: number,
    guilde?: titreGuildeEnum,
}

export const serveurDebutant: Carriere = {
    metier: metiersObjs[metiersEnum.serveur],
    groupeLieu: "Auberge du pont",
    duree: 0,
    competence: 1,
    actif: true,
    nbDeTestsFaits: 0,
};

export const metierTest: Carriere = {
    metier: metiersObjs[metiersEnum.edile],
    groupeLieu: Quartier.la_defense,
    duree: 0,
    competence: 1,
    actif: true,
    nbDeTestsFaits: 0,
};
