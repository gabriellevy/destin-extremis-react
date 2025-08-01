import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../../types/metiers/metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {calculeAge} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, travailleEnCeMomentComme} from "../../../types/metiers/metiersUtils";

export const evts_macon: GroupeEvts = {
    evts: [
        {
            id: "evts_macon1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous avez décidé de devenir maçon. `
                const resTestF:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                const resTestE:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                texte += resTestF.resume;
                texte += resTestE.resume;
                if (!resTestF.reussi || !resTestE.reussi) {
                    texte += `Malheureusement vous vous révélez trop faible pour ce métier épuisant. `;
                }
                else {
                    commencerCarriere(perso, metiersEnum.macon, '');
                    texte += `Solide comme vous êtes, vous êtes engagé. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Kai_Bauerr.webp",
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && calculeAge(perso) >= 14,
        },
        {
            id: "evts_macon2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.macon, bonusMalus: 20});
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Vous êtes un maçon efficace. `;
                } else {
                    texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre métier de maçon. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Kai_Bauerr.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.macon),
        },
    ],
    probaParDefaut: 5,
};