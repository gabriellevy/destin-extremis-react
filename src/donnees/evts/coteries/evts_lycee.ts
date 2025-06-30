import {Perso} from "../../../types/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {age} from "../../../types/Date";
import {Coterie} from "../../../types/Coterie";
import {getRandomEnumValue} from "../../../fonctions/random";
import {PhaseLycee} from "../../../types/lycee/StadeUniversite";

export const evts_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_engagement_lycee_1ere_annee",
            description: (perso: Perso): string => {
                const coterieRejointe: Coterie = getRandomEnumValue(Coterie);
                let texte: string = "Votre première année de lycée commence. Vous rejoignez les " + coterieRejointe.toString();
                perso.bilanLycee.coterieAnnee1 = coterieRejointe;
                perso.bilanLycee.phaseActuelle = PhaseLycee.coterie1;
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !perso.bilanLycee.coterieAnnee1 // si n'a asp encore commencé l'université
                && age(perso) == 14,
            proba: 999999999999999999999999999,// à peu près obligatoire
        },
    ],
    probaParDefaut: 5,
};