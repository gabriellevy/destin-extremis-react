import {Perso, PersoHisto} from "../../../types/perso/Perso";
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
import {MetiersEnum, metiersObjs} from "../../metiers";

const passageDiplomeBoucher: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous êtes apprenti boucher depuis longtemps. ";
    const resTestMetier:ResultatTest = testMetier(perso, MetiersEnum.apprenti_boucher, 20);
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Votre maître vous juge prêt. Vous allez pouvoir devenir boucher à part entière.";
        texte += commencerCarriere(perso, MetiersEnum.boucher, '', false);
    } else {
        texte += "Malheureusement d'après votre maître vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.push({
            date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
            evt: {
                id: "passageDiplomeBarbierChirurgien",
                description: passageDiplomeBoucher,
            }
        });
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_boucher: GroupeEvts = {
    evts: [
        {
            id: "evts_boucher1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous voudriez devenir boucher. `
                const resTestDex:ResultatTest = testComp(perso, TypeCompetence.force, 0);
                texte += resTestDex.resume;
                if (resTestDex.reussi) {
                    texte += commencerCarriere(perso, MetiersEnum.apprenti_boucher, '', true);
                    texte += `Votre motivation et votre force impressionnent le boucher qui vous engage comme apprenti à l'essai. `;
                    perso.evtsProgrammes.push({
                        date: (persoFutur:Perso) => perso.date + anneesToJours(3) === persoFutur.date,
                        evt: {
                            id: "passageDiplomeBarbierChirurgien",
                            description: passageDiplomeBoucher,
                        }
                    });
                } else {
                    texte += `Malheureusement vous n'impressionnez guère le boucher qui refuse de vous prendre comme apprenti. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Gerd_Fleisher.webp",
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.apprenti_boucher]) >= 0
                && getAge(perso) >= 14,
        },
        {
            id: "evts_boucher2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso,MetiersEnum.boucher, 0);
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Votre viande est appréciée de tous. `;
                } else {
                    texte += `Vous avez beaucoup de mal à faire apprécier votre viande. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Gerd_Fleisher.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, MetiersEnum.boucher),
            nbJoursEntreOccurences: 30,
        },
    ],
    probaParDefaut: 0.005,
};