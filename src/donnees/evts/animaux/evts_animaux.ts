import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVice, Vice} from "../../../types/ViceVertu";
import {acquerirEtNomme} from "../../../fonctions/possessions/possessions";
import {PossessionEnum} from "../../possessions/Possession";
import {nombreDAnimauxDomestiques} from "../../../fonctions/possessions/animaux";
import {getRandomDeTableauString} from "../../../fonctions/random";
import {NOMS_DE_CHATS} from "../../possessions/animaux";

export const evts_animaux: GroupeEvts = {
    evts: [
        {
            id: "evts_animaux adoption chat",
            description: async (perso: Perso): Promise<string> => {
                const nomChat: string = getRandomDeTableauString(NOMS_DE_CHATS);
                let texte:string = "Vous recuaillez un chat errant et l'appelez " + nomChat + ".";
                // TODO : ajouter un test animaux car sinon il se barre
                acquerirEtNomme(perso, PossessionEnum.chat, nomChat);

                return texte;
            },
        conditions: (perso: Perso): boolean =>
            nombreDAnimauxDomestiques(perso) < (getValeurVice(perso, Vice.naturaliste))*2,
            repetable: true,
        },
        ],
    probaParDefaut: 3,
};