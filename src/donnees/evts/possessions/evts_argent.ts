import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVertu, getValeurVice, Vertu, Vice} from "../../../types/ViceVertu";
import {getAge} from "../../../types/Date";
import {modifierStatut, statutPersoSuperieurAStatut2} from "../../../fonctions/perso/statut";
import {MetalStatut} from "../../../types/statut_social/Statut";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";

export const evts_argent: GroupeEvts = {
    evts: [
        {
            id: "evts_argent1 placement",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous prenez le temps de réfléchir à comment placer intelligemment votre argent. `;
                let difficulte:number = 0;
                if (perso.statut.metalStatut === MetalStatut.bronze) {
                    texte += "Même si vous n'avez pas grand chose. ";
                    difficulte = -30;
                } else if (perso.statut.metalStatut === MetalStatut.or) {
                    texte += "Une agence de gestion de fortune s'en charge pour vous. ";
                    difficulte = 20;
                }
                const resTestEv:ResultatTest = testComp(perso, TypeCompetence.evaluation, difficulte);
                texte += resTestEv.resume;
                if (resTestEv.reussi) {
                    texte += "Les dividendes paieront à long terme. ";
                    texte += modifierStatut(perso, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean =>
                getValeurVertu(perso, Vertu.reflechi) > 0
                && getValeurVice(perso, Vice.cupide) > 0
                && getAge(perso) >= 18
                && statutPersoSuperieurAStatut2(perso, {
                        rang: 2,
                        metalStatut: MetalStatut.bronze,
                    }),
            nbJoursEntreOccurences: 60,
        },
    ],
    probaParDefaut: 3,
}