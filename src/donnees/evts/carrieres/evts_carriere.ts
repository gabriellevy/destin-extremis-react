import {GroupeEvts} from "../../../types/Evt";
import {NiveauIA, Perso} from "../../../types/perso/Perso";
import {
    arreterCarriere,
    aUneCarriere, compatibiliteCarriere,
    getCarriereActive,
    suitUneCarriereDepuis
} from "../../../fonctions/metiers/metiersUtils";
import {modifierStatut, statut1SuperieurOuEgalAStatut2} from "../../../fonctions/perso/statut";
import {Carriere} from "../../../types/metiers/Metier";
import {appelLeChat, NiveauInfosPerso} from "../../../fonctions/le_chat";

// événements basiques accessibles à à peu près toutes els carrières
export const evts_carriere: GroupeEvts = {
    evts: [
        {
            id: "evts_carriere1 améliore",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const carriere: Carriere|undefined = getCarriereActive(perso);
                if (carriere) {
                    texte += "Vous êtes un " + carriere.metier.nom + " très efficace. ";
                    texte += modifierStatut(perso, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, undefined, 1)
                && !statut1SuperieurOuEgalAStatut2(perso.statut, getCarriereActive(perso)?.metier.statutMax),
        },
        {
            id: "evts_carriere2 train train",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                if (perso.niveauIA !== NiveauIA.desactive) {
                    // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                    texte = await appelLeChat(
                        perso,
                        "Racontez une journée de travail comme " + getCarriereActive(perso)?.metier.intitule + " du personnage principal.",
                        NiveauInfosPerso.prenom);
                } else {
                    texte += "Le petit train train quotidien. ";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => aUneCarriere(perso),
            proba: 2,
        },
        {
            id: "evts_carriere3 démission",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                const carriere: Carriere|undefined = getCarriereActive(perso);
                if (carriere) {
                    if (perso.niveauIA !== NiveauIA.desactive) {
                        // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                        texte = await appelLeChat(
                            perso,
                            "Racontez la démission du personnage principal de son métier.",
                            NiveauInfosPerso.plus_metier);
                    } else {
                        texte += "Vous démissionnez. ";
                    }
                    arreterCarriere(perso, carriere.metier.nom);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => aUneCarriere(perso)
                && compatibiliteCarriere(perso, getCarriereActive(perso)?.metier) < 0,
        },
    ],
    probaParDefaut: 3,
};