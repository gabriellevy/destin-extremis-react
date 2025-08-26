import {GroupeEvts} from "../../../../types/Evt";
import {Perso, Sexe} from "../../../../types/perso/Perso";
import {Coterie} from "../../../../types/Coterie";
import {statut1SuperieurOuEgalAStatut2} from "../../../../fonctions/perso/statut";
import {MetalStatut} from "../../../../types/statut_social/Statut";
import {getPrenom} from "../../../../fonctions/noms";

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
    ],
    probaParDefaut: 9999999999999999, // un peu > à la moyenne car spécifique à une coterie
};