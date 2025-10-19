import {Perso} from "../../../../types/perso/Perso";
import {GroupeEvts} from "../../../../types/Evt";
import {
    estAuLycee,
} from "../../../../fonctions/metiers/metiersUtils";
import {getAge} from "../../../../types/Date";
import {getValeurVice, Vice} from "../../../../types/ViceVertu";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {modifierStatut} from "../../../../fonctions/perso/statut";

export const evts_voleur: GroupeEvts = {
    evts: [
        {
            id: "evts_voleur1 de lycée",
            description: async (perso: Perso): Promise<string> => {
                let texte = '';
                texte += "Vous prenez l'habitude de voler des objets et fournitures à droite à gauche, à l'établissement comme à vos camarades. <br/>";

                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.adresse, bonusMalus: 20});
                texte += resTestDex.resume;
                if (resTestDex.reussi) {
                    texte += "Vous ne vous faites jamais prendre et finissez par en tirer un joli petit revenu. ";
                    modifierStatut(perso, 1);
                } else {
                    texte += "Mais vous n'êtes pas très doué. Vous vous faites régulièrement repérer et attraper et finissez par être (défavorablement) connu. ";
                    texte += modifierReputationDansQuartier(perso, undefined, -3, 2);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => estAuLycee(perso)
                && getValeurVice(perso, Vice.cupide) > 0
                && getValeurVice(perso, Vice.rebelle) > 0
                && getAge(perso) <= 18,
            repetable: false,
        },
    ],
    probaParDefaut: 10,
};
