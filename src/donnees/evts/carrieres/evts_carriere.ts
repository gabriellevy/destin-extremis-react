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
import {appelLeChat, appelLeChatParaphrase, NiveauInfosPerso} from "../../../fonctions/le_chat";
import {metiersObjs} from "../../metiers";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier, testVice} from "../../../fonctions/des";
import {Vice} from "../../../types/ViceVertu";
import {vaA} from "../../../types/lieux/Lieu";
import {Quartier} from "../../geographie/quartiers";
import {TypeCompetence} from "../../../types/perso/comps/Comps";

// événements basiques génériques accessibles à peu près toutes les carrières
export const evts_carriere: GroupeEvts = {
    evts: [
        {
            id: "evts_carriere1 améliore",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                let texteTests: string = "";
                const carriere: Carriere|undefined = getCarriereActive(perso);
                if (carriere) {
                    const resultatTestMetier:ResultatTest = testMetier(perso, {metier: carriere.metier, bonusMalus: 20});
                    texteTests += resultatTestMetier.resume + "<br/>";
                    if (resultatTestMetier.reussi) {
                        texte += "Vous êtes un " + carriere.metier + " efficace. ";
                        const resultatTestMarch:ResultatTest = testComp(perso, {comp: TypeCompetence.marchandage, bonusMalus: 20});
                        texteTests += resultatTestMarch.resume + "<br/>";
                        if (resultatTestMarch.reussi) {
                            texte += "Et vous savez vous mettre en avant pour vous faire augmenter. ";
                            texteTests += modifierStatut(perso, 1);
                        } else {
                            texte += "Mais vous êtes trop peu doué en négociation pour vous faire augmenter. ";
                        }
                    } else {
                        texte += "Vous êtes un " + carriere.metier + " passable mais avez du mal à briller. ";
                    }
                } else {
                    console.error("evts_carriere1 améliore sans carrière !  : perso : ", perso);
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte + "<br/>" + texteTests;
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
                    const resTstSolitaire:ResultatTest = testVice(perso, Vice.solitaire, -10);
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
                    texte += arreterCarriere(perso, carriere.metier, false);
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