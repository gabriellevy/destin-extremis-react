import {Perso} from "../../../types/Perso";
import {metiersEnum} from "../../../types/metiers/metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/comps/Comps";
import {age} from "../../../types/Date";
import {commencerCarriere, travailleEnCeMomentComme} from "../../../types/metiers/metiersUtils";
import {compareStatut, MetalStatut} from "../../../types/statut_social/Statut";
import {tailleVille} from "../../geographie/villes";

export const evts_bourgmestre: GroupeEvts = {
    evts: [
        {
            id: "evts_bourgmestre1", // TODO convertir en vrai édile
            description: (perso: Perso): string => {
                let texte: string = `Vous sentez qu'avec votre âge, votre expérience et votre respectabilité, vous feriez un excellent édile. `
                const resTestInt:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 0});
                const resTestSoc:ResultatTest = testComp(perso, {comp: TypeCompetence.charme, bonusMalus: 0});
                texte += resTestInt.resume;
                texte += resTestSoc.resume;
                if (!resTestSoc.reussi! && resTestInt.reussi) {
                    texte += `Malheureusement vos concitoyens sont d'un autre avis et vous n'êtes pas choisi par les notables de la ville. `;
                }
                else {
                    commencerCarriere(perso, metiersEnum.edile, perso.lieu.ville);
                    texte += `À votre grande joie les notables jugent en effet que vous êtes le meilleur candidat. Vous voilà bourgmestre. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Wilhelm_Kreigrisch.webp",
            conditions: (perso: Perso): boolean =>
                compareStatut(perso.statut, {metalStatut: MetalStatut.argent, rang: 4}) // richesse minimum
                && tailleVille(perso.lieu.ville).valueOf() > 1
                && age(perso) >= 40,
        },
        {
            id: "evts_bourgmestre2",
            description: (perso: Perso): string => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.edile, bonusMalus: 20});
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Vous administrez efficacement la ville. `;
                } else {
                    texte += `Vous avez beaucoup de mal à administrer la ville. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Wilhelm_Kreigrisch.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.edile),
        },
    ],
    probaParDefaut: 59999999999,
};