import {GroupeEvts} from "../../../../types/Evt";
import {Perso, Sexe} from "../../../../types/perso/Perso";
import {Coterie} from "../../../../types/Coterie";
import {statut1SuperieurOuEgalAStatut2} from "../../../../fonctions/perso/statut";
import {MetalStatut} from "../../../../types/statut_social/Statut";
import {getPrenom} from "../../../../fonctions/noms";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {aUneCarriere, commencerCarriere} from "../../../../types/metiers/metiersUtils";
import {metiersEnum} from "../../../metiers";

export const evts_orks: GroupeEvts = {
    evts: [
        {
            id: "evts_orks1_esclave",
            description: async (perso: Perso): Promise<string> => {
                const nomGretchin:string = getPrenom(Coterie.orks, Sexe.male);
                perso.esclaveGtrechin = nomGretchin;
                return "Vous vous payez un esclave gretchin. Il s'appelle " + nomGretchin + ".";
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && statut1SuperieurOuEgalAStatut2(perso.statut, {metalStatut: MetalStatut.bronze, rang: 5})
                && !perso.esclaveGtrechin,
        },
        {
            id: "evts_orks2_squid juteux",
            description: async (perso: Perso): Promise<string> => {
                return "Hui vous vous faites un petit plaisir : votre gretchin esclave " + perso.esclaveGtrechin + "  vous cuisine un bon squig juteux qu'il a trouvé au fond de le fosse à ordure. "
                    + "Vous allez vous régaler ! ";
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && !!perso.esclaveGtrechin,
        },
        {
            id: "evts_orks3",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous décidez de devenir marchand de champignon. `
                const resTestMarch:ResultatTest = testComp(perso, {comp: TypeCompetence.marchandage, bonusMalus: 20});
                texte += resTestMarch.resume;
                if (resTestMarch.reussi) {
                    commencerCarriere(perso, metiersEnum.marchand_de_champignon, '');
                } else {
                    texte += `Malheureusement vous êtes un trop mauvais marchand, vous devenez vite abandonner. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && !aUneCarriere(perso),
        },
        {
            id: "evts_orks2_squid juteux",
            description: async (perso: Perso): Promise<string> => {
                return "Hui vous vous faites un petit plaisir : votre gretchin esclave " + perso.esclaveGtrechin + "  vous cuisine un bon squig juteux qu'il a trouvé au fond de le fosse à ordure. "
                    + "Vous allez vous régaler ! ";
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && !!perso.esclaveGtrechin,
        },
    ],
    probaParDefaut: 9999999999999999999999999999, // un peu > à la moyenne car spécifique à une coterie
};