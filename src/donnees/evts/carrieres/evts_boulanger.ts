import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {calculeAge, anneesToJours} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, travailleEnCeMomentComme} from "../../../fonctions/metiers/metiersUtils";

const passageDiplomeBoulanger: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous êtes apprenti boulanger depuis longtemps. ";
    const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.apprenti_boulanger, bonusMalus: 20});
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Votre maître vous juge prêt. Vous allez pouvoir devenir boulanger à part entière.";
        commencerCarriere(perso, metiersEnum.boulanger, '');
    } else {
        texte += "Malheureusement d'après votre maître vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.set(perso.date + anneesToJours(1), passageDiplomeBoulanger);
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_boulanger: GroupeEvts = {
    evts: [
        {
            id: "evts_boulanger1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous voudriez devenir boulanger. `
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.dexterite, bonusMalus: 0});
                texte += resTestDex.resume;
                if (resTestDex.reussi) {
                    commencerCarriere(perso, metiersEnum.apprenti_boulanger, '');
                    texte += `Votre motivation et votre dextérité impressionnent le boulanger qui vous engage comme apprenti à l'essai. `;
                    perso.evtsProgrammes.set(perso.date + anneesToJours(3), passageDiplomeBoulanger);
                } else {
                    texte += `Malheureusement vous n'impressionnez guère le boulanger qui refuse de vous prendre comme apprenti. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Bruno_B%C3%A4cker.webp",
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && calculeAge(perso) >= 14,
        },
        {
            id: "evts_boulanger2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.boulanger, bonusMalus: 0});
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Votre pain est apprécié de tous. `;
                } else {
                    texte += `Vous avez beaucoup de mal à faire apprécier votre pain. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Bruno_B%C3%A4cker.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.boulanger),
        },
    ],
    probaParDefaut: 5,
};