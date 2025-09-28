import {NiveauIA, Perso} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {getAge} from "../../../types/Date";
import {Coterie} from "../../../types/Coterie";
import {PhaseLycee} from "../../../types/lycee/StadeUniversite";
import {getQuartierDeCoterie} from "../../coteries/Quartiers";
import {getCoterieAleatoireSauf} from "../../../fonctions/generation";
import {descriptionCot} from "../../coteries/description";
import {appelLeChat, NiveauInfosPerso} from "../../../fonctions/le_chat";
import {calculerAffinite, SEUIL_AFFINITE} from "../../../fonctions/coteries/affinite";
import {getRandomInt} from "../../../fonctions/random";
import {rejointCoterie} from "../../../fonctions/coteries/generales";
import {changerQuartier} from "../../../fonctions/geographie/quartier";

export const evts_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_engagement_lycee_1ere_annee",
            description: async (perso: Perso): Promise<string> => {
                perso.coterie = undefined;
                const coterieRejointe: Coterie = getCoterieAleatoireSauf([]);
                let texte: string = "Votre première année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee1 = coterieRejointe;
                texte += changerQuartier(perso, getQuartierDeCoterie(coterieRejointe), false);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie1;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee1 === undefined // si n'a asp encore commencé l'université
                && getAge(perso) == 14,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_engagement_lycee_2eme_annee",
            description: async (perso: Perso): Promise<string> => {
                perso.coterie = undefined;
                const coterieRejointe: Coterie = getCoterieAleatoireSauf(perso.bilanLycee.coterieAnnee1 ? [perso.bilanLycee.coterieAnnee1] : []);
                let texte: string = "Votre deuxième année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee2 = coterieRejointe;
                texte += changerQuartier(perso, getQuartierDeCoterie(coterieRejointe), false);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie2;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee2 === undefined
                && getAge(perso) == 15,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_engagement_lycee_3eme_annee",
            description: async (perso: Perso): Promise<string> => {
                perso.coterie = undefined;
                const coterieRejointe: Coterie = getCoterieAleatoireSauf(
                    [perso.bilanLycee.coterieAnnee1,
                    perso.bilanLycee.coterieAnnee2]
                );
                let texte: string = "Votre troisième année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee3 = coterieRejointe;
                texte += changerQuartier(perso, getQuartierDeCoterie(coterieRejointe), false);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie3;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee3 === undefined
                && getAge(perso) == 16,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_engagement_lycee_4eme_annee",
            description: async (perso: Perso): Promise<string> => {
                perso.coterie = undefined;
                const coterieRejointe: Coterie = getCoterieAleatoireSauf(
                    [perso.bilanLycee.coterieAnnee1,
                    perso.bilanLycee.coterieAnnee2,
                    perso.bilanLycee.coterieAnnee3]
                );
                let texte: string = "Votre quatrième année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee4 = coterieRejointe;
                texte += changerQuartier(perso, getQuartierDeCoterie(coterieRejointe), false);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie4;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee4 === undefined
                && getAge(perso) == 17,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_fin_de_lycee",
            description: async (perso: Perso): Promise<string> => {
                perso.coterie = undefined;
                let texte: string = "Vous avez finie vos années de lycée idéologique. Vous allez pouvoir commencer vos études proprement dites... et choisir une coterie.";
                perso.bilanLycee.phaseActuelle = PhaseLycee.finie;
                perso.bilanLycee.coterieActuelle = undefined;

                const coteriesProches: Coterie[] = [];
                Object.values(Coterie).forEach((co: Coterie) => {
                    const affinite = calculerAffinite(perso, co);
                    if (affinite >= SEUIL_AFFINITE) {
                        coteriesProches.push(co);
                    }
                })
                const coterieRejointe = coteriesProches.at(getRandomInt(coteriesProches.length)-1);
                if (coterieRejointe) {
                    texte += "Vous rejoignez les " + coterieRejointe.toString();
                    rejointCoterie(perso, coterieRejointe);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.phaseActuelle === PhaseLycee.coterie4
                && getAge(perso) == 18,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            // événement bidon pour remettre le lycée à une valeur valide si il y a décalage entre âge et phaseActuelle
            id: "evts_nettoyage_fin_de_lycee",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                perso.bilanLycee.phaseActuelle = PhaseLycee.finie;
                perso.bilanLycee.coterieActuelle = undefined;
                if (perso.niveauIA !== NiveauIA.desactive) {
                    // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                    texte = await appelLeChat(
                        perso,
                        "Racontez la vie courante du personnage principal.",
                        NiveauInfosPerso.plus_metier);
                } else {
                    texte += "";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.phaseActuelle !== PhaseLycee.finie
                && getAge(perso) >= 20,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
    ],
    probaParDefaut: 5,
};