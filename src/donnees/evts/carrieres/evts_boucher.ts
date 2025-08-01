import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../../types/metiers/metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {calculeAge, anneesToJours} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, travailleEnCeMomentComme} from "../../../types/metiers/metiersUtils";

const passageDiplomeBoucher: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous êtes apprenti boucher depuis longtemps. ";
    const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.apprenti_boucher, bonusMalus: 20});
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Votre maître vous juge prêt. Vous allez pouvoir devenir boucher à part entière.";
        commencerCarriere(perso, metiersEnum.boucher, '');
    } else {
        texte += "Malheureusement d'après votre maître vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.set(perso.date + anneesToJours(1), passageDiplomeBoucher);
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_boucher: GroupeEvts = {
    evts: [
        {
            id: "evts_boucher1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous voudriez devenir boucher. `
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 0});
                texte += resTestDex.resume;
                if (resTestDex.reussi) {
                    commencerCarriere(perso, metiersEnum.apprenti_boucher, '');
                    texte += `Votre motivation et votre force impressionnent le boucher qui vous engage comme apprenti à l'essai. `;
                    perso.evtsProgrammes.set(perso.date + anneesToJours(3), passageDiplomeBoucher);
                } else {
                    texte += `Malheureusement vous n'impressionnez guère le boucher qui refuse de vous prendre comme apprenti. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Gerd_Fleisher.webp",
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && calculeAge(perso) >= 14,
        },
        {
            id: "evts_boucher2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.boucher, bonusMalus: 0});
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Votre viande est appréciée de tous. `;
                } else {
                    texte += `Vous avez beaucoup de mal à faire apprécier votre viande. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Gerd_Fleisher.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.boucher),
        },
    ],
    probaParDefaut: 5,
};