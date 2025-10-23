import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVice, Vice} from "../../../types/ViceVertu";
import {acquerirEtNomme} from "../../../fonctions/possessions/possessions";
import {PossessionEnum} from "../../possessions/Possession";
import {nombreDAnimauxDomestiques} from "../../../fonctions/possessions/animaux";
import {aleatoireDeTableauString} from "../../../fonctions/random";
import {NOMS_DE_CHATS} from "../../possessions/animaux";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../fonctions/perso/Reputation";

export const evts_animaux: GroupeEvts = {
    evts: [
        {
            id: "evts_animaux adoption chat",
            description: async (perso: Perso): Promise<string> => {
                const nomChat: string = aleatoireDeTableauString(NOMS_DE_CHATS);
                let texte:string = "Vous recueillez un chat errant et l'appelez " + nomChat + ".";
                // TODO : ajouter un test animaux car sinon il se barre
                acquerirEtNomme(perso, PossessionEnum.chat, nomChat);

                return texte;
            },
        conditions: (perso: Perso): boolean =>
            nombreDAnimauxDomestiques(perso) < (getValeurVice(perso, Vice.naturaliste))*2,
            repetable: true,
        },
        {
            id: "evts_animaux2 persécuteur d'animaux",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Vous prenez l'habitude d'attraper et de torturer de petits animaux.";
                const resTestAnimaux:ResultatTest = testComp(perso, {comp: TypeCompetence.adresse, bonusMalus: 20});
                texte += resTestAnimaux.resume;
                if (resTestAnimaux.reussi) {
                    texte += "Efficace et discret, vous savourez votre sadisme pendant de longues années. ";
                    perso.bonheur += 0.1;
                } else {
                    texte += "Vous finissez par arrêter à force de vous faire griffer ou repérer à cause des cris de vos victimes. "
                    + "D'autant plus que cela commence à vous donner une très mauvaise réputation dans le quartier. ";
                    // TODO : blessure si critique ?
                    texte += modifierReputationDansQuartier(perso, undefined, -5, 3);
                }

                return texte;
            },
            proba: 10,
            conditions: (perso: Perso): boolean =>
                getValeurVice(perso, Vice.cruel) >= 2,
                repetable: false,
        },
    ],
    probaParDefaut: 3,
};