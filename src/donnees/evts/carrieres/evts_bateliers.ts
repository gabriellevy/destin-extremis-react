import {Perso} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {getAge} from "../../../types/Date";
import {auBordDeLaRiviere} from "../../../types/lieux/Lieu";
import {
    aUneActiviteATempsPlein,
    aUneCarriere,
    commencerCarriere,
    compatibiliteCarriere,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";
import {MetiersEnum, metiersObjs} from "../../metiers";

export const evts_batelier: GroupeEvts = {
    evts: [
        {
            id: "evts_batelier1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous hésitez à devenir batelier. `
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                texte += resTestFor.resume;
                texte += resTestEnd.resume;
                if (resTestFor.reussi && resTestEnd.reussi) {
                    texte += commencerCarriere(perso, MetiersEnum.batelier, '');
                    texte += `Coriace comme vous l'êtes, vous impressionnez le capitaine qui vous engage à l'essai. `;
                } else {
                    texte += `Malheureusement c'est un métier qui demande une très robuste constitution et vous êtes jugé trop frêle par le capitaine. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && getAge(perso) >= 14
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.batelier]) >= 0
                && auBordDeLaRiviere(perso),
        },
        {
            id: "evts_batelier2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 40});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 40});
                texte += resTestFor.resume;
                texte += resTestEnd.resume;
                if (resTestFor.reussi && resTestEnd.reussi) {
                    texte += `Vous êtes un batelier efficace et respecté. `;
                } else {
                    texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre métier de batelier. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, MetiersEnum.batelier),
            repetable: true,
        },
    ],
    probaParDefaut: 5,
};