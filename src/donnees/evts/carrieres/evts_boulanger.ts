import {Perso, PersoHisto} from "../../../types/perso/Perso";
import {MetiersEnum, metiersObjs} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {getAge, anneesToJours} from "../../../types/Date";
import {
    aUneActiviteATempsPlein,
    commencerCarriere,
    compatibiliteCarriere,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";

const passageDiplomeBoulanger: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous êtes apprenti boulanger depuis longtemps. ";
    const resTestMetier:ResultatTest = testMetier(perso, {metier: MetiersEnum.apprenti_boulanger, bonusMalus: 20});
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Votre maître vous juge prêt. Vous allez pouvoir devenir boulanger à part entière.";
        texte += commencerCarriere(perso, MetiersEnum.boulanger, '');
    } else {
        texte += "Malheureusement d'après votre maître vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.push({
            date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
            evt: {
                id: "passageDiplomeBoulanger",
                description: passageDiplomeBoulanger,
            }
        });
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_boulanger: GroupeEvts = {
    evts: [
        {
            id: "evts_boulanger1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous voudriez devenir boulanger. `
                const resTestDex:ResultatTest = testComp(perso, TypeCompetence.adresse, 0);
                texte += resTestDex.resume;
                if (resTestDex.reussi) {
                    texte += commencerCarriere(perso, MetiersEnum.apprenti_boulanger, '');
                    texte += `Votre motivation et votre dextérité impressionnent le boulanger qui vous engage comme apprenti à l'essai. `;
                    perso.evtsProgrammes.push({
                        date: (persoFutur:Perso) => perso.date + anneesToJours(3) === persoFutur.date,
                        evt: {
                            id: "passageDiplomeBoulanger",
                            description: passageDiplomeBoulanger,
                        }
                    });
                } else {
                    texte += `Malheureusement vous n'impressionnez guère le boulanger qui refuse de vous prendre comme apprenti. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Bruno_B%C3%A4cker.webp",
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.apprenti_boulanger]) >= 0
                && getAge(perso) >= 14,
        },
        {
            id: "evts_boulanger2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, {metier: MetiersEnum.boulanger, bonusMalus: 0});
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Votre pain est apprécié de tous. `;
                } else {
                    texte += `Vous avez beaucoup de mal à faire apprécier votre pain. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Bruno_B%C3%A4cker.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, MetiersEnum.boulanger),
            repetable: true,
        },
    ],
    probaParDefaut: 5,
};