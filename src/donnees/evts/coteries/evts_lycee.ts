import {Perso} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {calculeAge} from "../../../types/Date";
import {Coterie} from "../../../types/Coterie";
import {PhaseLycee} from "../../../types/lycee/StadeUniversite";
import {getQuartierDeCoterie} from "../../coteries/Quartiers";
import {getCoterieAleatoireSauf} from "../../../fonctions/generation";
import {descriptionCot} from "../../coteries/description";

export const evts_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_engagement_lycee_1ere_annee",
            description: async (perso: Perso): Promise<string> => {
                //const coterieRejointe: Coterie = Coterie.orks;
                const coterieRejointe: Coterie = getCoterieAleatoireSauf([]);
                let texte: string = "Votre première année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee1 = coterieRejointe;
                perso.lieu.quartier = getQuartierDeCoterie(coterieRejointe);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie1;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee1 === undefined // si n'a asp encore commencé l'université
                && calculeAge(perso) == 14,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_engagement_lycee_2eme_annee",
            description: async (perso: Perso): Promise<string> => {
                const coterieRejointe: Coterie = getCoterieAleatoireSauf(perso.bilanLycee.coterieAnnee1 ? [perso.bilanLycee.coterieAnnee1] : []);
                let texte: string = "Votre deuxième année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee2 = coterieRejointe;
                perso.lieu.quartier = getQuartierDeCoterie(coterieRejointe);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie2;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee2 === undefined
                && calculeAge(perso) == 15,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_engagement_lycee_3eme_annee",
            description: async (perso: Perso): Promise<string> => {
                const coterieRejointe: Coterie = getCoterieAleatoireSauf(
                    [perso.bilanLycee.coterieAnnee1,
                    perso.bilanLycee.coterieAnnee2]
                );
                let texte: string = "Votre troisième année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee3 = coterieRejointe;
                perso.lieu.quartier = getQuartierDeCoterie(coterieRejointe);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie3;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee3 === undefined
                && calculeAge(perso) == 16,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_engagement_lycee_4eme_annee",
            description: async (perso: Perso): Promise<string> => {
                const coterieRejointe: Coterie = getCoterieAleatoireSauf(
                    [perso.bilanLycee.coterieAnnee1,
                    perso.bilanLycee.coterieAnnee2,
                    perso.bilanLycee.coterieAnnee3]
                );
                let texte: string = "Votre quatrième année de lycée commence. Vous rejoignez les <b>" + coterieRejointe.toString() + "</b>. ";
                texte += descriptionCot[coterieRejointe];
                perso.bilanLycee.coterieActuelle = coterieRejointe;
                perso.bilanLycee.coterieAnnee4 = coterieRejointe;
                perso.lieu.quartier = getQuartierDeCoterie(coterieRejointe);
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie4;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.coterieAnnee4 === undefined
                && calculeAge(perso) == 17,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
        {
            id: "evts_fin_de_lycee",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous avez finie vos années de lycée idéologique. Vous allez pouvoir commencer vos études proprement dites... et choisir une coterie.";
                perso.bilanLycee.phaseActuelle = PhaseLycee.finie;
                perso.bilanLycee.coterieActuelle = undefined;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.bilanLycee.phaseActuelle === PhaseLycee.coterie4
                && calculeAge(perso) == 18,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
    ],
    probaParDefaut: 5,
};