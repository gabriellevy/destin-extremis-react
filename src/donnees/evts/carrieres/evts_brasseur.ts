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
    compatibiliteCarriere, SEUIL_COMPATIBILITE_METIER,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";

const passageDiplomeBrasseur: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous êtes apprenti brasseur depuis longtemps. ";
    const resTestMetier:ResultatTest = testMetier(perso, MetiersEnum.apprenti_brasseur, 20);
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Votre maître vous juge prêt. Vous allez pouvoir devenir brasseur à part entière.";
        texte += commencerCarriere(perso, MetiersEnum.brasseur, '', false);
    } else {
        texte += "Malheureusement d'après votre maître vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.push({
            date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
            evt: {
                id: "passageDiplomeBoulanger",
                description: passageDiplomeBrasseur,
            }
        });
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_brasseur: GroupeEvts = {
    evts: [
        {
            id: "evts_brasseur1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous voudriez devenir brasseur. `
                const resTestDex:ResultatTest = testComp(perso, TypeCompetence.adresse, 20);
                const resTestEnd:ResultatTest = testComp(perso, TypeCompetence.endurance, 20);
                texte += resTestEnd.resume;
                texte += resTestDex.resume;
                if (resTestEnd.reussi && resTestDex.reussi) {
                    texte += commencerCarriere(perso, MetiersEnum.apprenti_brasseur, '', false);
                    texte += `Votre motivation et votre dextérité impressionnent le brasseur qui vous engage comme apprenti à l'essai. `;
                    perso.evtsProgrammes.push({
                        date: (persoFutur:Perso) => perso.date + anneesToJours(3) === persoFutur.date,
                        evt: {
                            id: "passageDiplomeBoulanger",
                            description: passageDiplomeBrasseur,
                        }
                    });
                } else {
                    texte += `Malheureusement vous n'impressionnez guère le brasseur qui refuse de vous prendre comme apprenti. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Emil_Brauer.webp",
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.apprenti_brasseur]) >= SEUIL_COMPATIBILITE_METIER
                && getAge(perso) >= 14,
        },
        {
            id: "evts_brasseur2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, MetiersEnum.brasseur, 0);
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Votre bière a très bonne qualité. `;
                } else {
                    texte += `Vous avez beaucoup de mal à brasser de la bière de qualité. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Emil_Brauer.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, MetiersEnum.brasseur),
            nbJoursEntreOccurences: 30,
        },
    ],
    probaParDefaut: 0.005,
};