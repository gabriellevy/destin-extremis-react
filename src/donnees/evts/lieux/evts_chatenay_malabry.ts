import {GroupeEvts} from "../../../types/Evt";
import {Perso, Sexe} from "../../../types/Perso";
import {Quartier} from "../../geographie/quartiers";
import {majReputationDansQuartier} from "../../../types/Reputation";
import {getPatronyme} from "../../../fonctions/noms";
import {Coterie} from "../../../types/Coterie";
import {getValeurCompetence, TypeCompetence} from "../../../types/comps/Comps";

export const evts_chatenay_malabry: GroupeEvts = {
    evts: [
        {
            id: "evts_chatenay_malabry1",
            description: (perso: Perso): string => {
                let majReputation: number = 0;
                let texte:string = "Vous êtes invité à un grand banquet celte. "
                    + "Le chef de clan " + getPatronyme(Coterie.celtes, Sexe.male) + " a fait les choses en grand. Du vin de la viande, du miel, tout est excellent. <br/>";
                if (perso.coterie === Coterie.celtes) {
                    majReputation += 1;
                    texte += "En tant que celte vous êtes bien accueilli et vite à l'aise. <br/>";
                }
                if (getValeurCompetence(perso, TypeCompetence.armeCaC) >= 50) {
                    majReputation += 1;
                    texte += "Votre réputation de bon combattant vous donne droit de diner à la table des guerriers. <br/>";
                }


                majReputationDansQuartier(perso, Quartier.chatenay_malabry, majReputation);
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.chatenay_malabry,
        },
    ],
    probaParDefaut: 9999999999999999999999999999999995,
};