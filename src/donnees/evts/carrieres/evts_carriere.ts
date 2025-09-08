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
import {metiersObjs} from "../../metiers";
import {ResultatTest} from "../../../types/LancerDe";
import {testVice} from "../../../fonctions/des";
import {Vices} from "../../../types/ViceVertu";
import {vaA} from "../../../types/lieux/Lieu";
import {Quartier} from "../../geographie/quartiers";

// événements basiques accessibles à à peu près toutes els carrières
export const evts_carriere: GroupeEvts = {
    evts: [
        {
            id: "evts_carriere1 améliore",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const carriere: Carriere|undefined = getCarriereActive(perso);
                if (carriere) {
                    texte += "Vous êtes un " + carriere.metier + " très efficace. ";
                    texte += modifierStatut(perso, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, undefined, 1)
                && !statut1SuperieurOuEgalAStatut2(perso.statut, metiersObjs[getCarriereActive(perso)?.metier].statutMax),
        },
        {
            id: "evts_carriere2 train train",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                if (perso.niveauIA !== NiveauIA.desactive) {
                    // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                    texte = await appelLeChat(
                        perso,
                        "Racontez une journée de travail comme " + getCarriereActive(perso)?.intitule + " du personnage principal.",
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
                    let fonceALaMontagne = false;
                    const resTstSolitaire:ResultatTest = testVice(perso, {typeMauvais: Vices.solitaire, bonusMalus: -10});
                    if (resTstSolitaire.reussi) {
                        fonceALaMontagne = true;
                    }
                    if (perso.niveauIA !== NiveauIA.desactive) {
                        // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                        texte = await appelLeChat(
                            perso,
                            "Racontez la démission du personnage principal de son métier"
                            + fonceALaMontagne ? " et sa retraite en solitaire à la montagne." : ".",
                            NiveauInfosPerso.plus_metier);
                    } else {
                        texte += "Vous démissionnez"
                        + fonceALaMontagne ? " et décidez d'aller vivre en solitaire à la montagne." : ".";
                    }
                    arreterCarriere(perso, carriere.metier);
                    if (fonceALaMontagne) {
                        vaA(perso, Quartier.pyrenees);
                        perso.bonheur += 0.3;
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => aUneCarriere(perso)
                && perso.bonheur < 0.6
                && compatibiliteCarriere(perso, metiersObjs[getCarriereActive(perso).metier]) < 0,
        },
    ],
    probaParDefaut: 3,
};