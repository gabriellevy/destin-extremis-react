import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVertu, Vertu} from "../../../types/ViceVertu";
import {getAge} from "../../../types/Date";
import {modifierStatut, statutPersoSuperieurAStatut2} from "../../../fonctions/perso/statut";
import {MetalStatut} from "../../../types/statut_social/Statut";
import {StatutLogement} from "../../../types/lieux/Lieu";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";

export const evts_logement: GroupeEvts = {
    evts: [
        {
            id: "evts_logement1 achat",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous décidez d'acheter un logement dans ` + perso.lieu.quartier + ". ";
                perso.lieu.statutLogement = StatutLogement.Possession;
                let cout:number = 2;
                const resTestEv:ResultatTest = testComp(perso, TypeCompetence.evaluation, 0);
                texte += resTestEv.resume;
                if (!resTestEv.reussi) {
                    cout+=1;
                }
                const resTestMarch:ResultatTest = testComp(perso, TypeCompetence.marchandage, 0);
                texte += resTestMarch.resume;
                if (!resTestMarch.reussi) {
                    cout+=1;
                }
                modifierStatut(perso, -cout);
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.lieu.statutLogement !== StatutLogement.Possession
                && getValeurVertu(perso, Vertu.prudent) > 0
                && getAge(perso) >= 18
                && statutPersoSuperieurAStatut2(perso, {
                        rang: 1,
                        metalStatut: MetalStatut.argent,
                    }),
            repetable: true,
        },
        {
            id: "evts_logement2 travaux",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous faites des travaux dans votre appartement. ";
                modifierStatut(perso, -1);
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                perso.lieu.statutLogement === StatutLogement.Possession
                && getValeurVertu(perso, Vertu.artificialiste) > 0
                && statutPersoSuperieurAStatut2(perso, {
                        rang: 1,
                        metalStatut: MetalStatut.argent,
                    }),
            repetable: true,
        },
    ],
    probaParDefaut: 0.002,
}