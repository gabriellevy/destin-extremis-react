import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../../types/metiers/metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {calculeAge} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, travailleEnCeMomentComme} from "../../../types/metiers/metiersUtils";
import {Coterie} from "../../../types/Coterie";

export const evts_legionnaire: GroupeEvts = {
    evts: [
        {
            id: "evts_legionnaire1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous voulez rejoindre la légion. `
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                texte += resTestFor.resume;
                texte += resTestEnd.resume;
                if (resTestFor.reussi && resTestEnd.reussi) {
                    commencerCarriere(perso, metiersEnum.legionnaire, '');
                    texte += `Coriace comme vous l'êtes, vous impressionnez le recruteur et êtes engagé. `;
                } else {
                    texte += `Malheureusement c'est un métier qui demande une très robuste constitution et vous êtes jugé trop frêle par le recruteur. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && calculeAge(perso) >= 17
                && calculeAge(perso) <= 46
                && perso.coterie === Coterie.conquistador,
        },
        {
            id: "evts_legionnaire2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 40});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 40});
                texte += resTestFor.resume;
                texte += resTestEnd.resume;
                if (resTestFor.reussi && resTestEnd.reussi) {
                    texte += `Vous êtes un légionnaire efficace et respecté. `;
                } else {
                    texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre métier de légionnaire. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.legionnaire),
        },
    ],
    probaParDefaut: 5,
};