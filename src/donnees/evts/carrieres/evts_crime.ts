import {Perso} from "../../../types/perso/Perso";
import {metiersEnum, metiersObjs} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {MetalStatut} from "../../../types/statut_social/Statut";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {
    arreterCarriere,
    aUneCarriere,
    commencerCarriere, compatibiliteCarriere, plusUnEnCompetenceMetier,
    suitUneCarriereDe,
    suitUneCarriereDepuis
} from "../../../fonctions/metiers/metiersUtils";
import {statut1SuperieurOuEgalAStatut2} from "../../../fonctions/perso/statut";

export const evts_crime: GroupeEvts = {
    evts: [
        {
            id: "evts_crime1",
            description: async (perso: Perso): Promise<string> => {
                let texte = '';
                texte += "À force de trainer parmi les vauriens vous vous êtes intégré à leur bande et commencez à participer à leurs sales coups. " +
                    "Aujourd'hui vous les avez aidés à extorquer de l'argent à un commerçant. <br/>";
                texte += commencerCarriere(perso, metiersEnum.ranconneur, '');
                return texte;
            },
            conditions: (perso: Perso): boolean => !aUneCarriere(perso)
                && compatibiliteCarriere(perso, metiersObjs[metiersEnum.ranconneur]) >= 0
                && !statut1SuperieurOuEgalAStatut2(perso.statut, {metalStatut: MetalStatut.argent, rang: 4}),
        },
        {
            id: "evts_crime2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestCC:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 0});
                texte += resTestCC.resume;
                if (resTestCC.reussi) {
                    texte += "Bagarre après bagarre, vous vous faites remarquer dans la bande pour votre efficacité au combat. ";
                } else {
                    texte += "Vous prenez un mauvais coup de couteau lors d'une des nombreuses bagarres de votre carrière de malandrin. " +
                    "Vous aurez une vilaine cicatrice près de l'oeil jusqu'à la fin de vos jours en souvenir. ";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, metiersEnum.ranconneur),
            repetable: true,
        },
        {
            id: "evts_crime3",
            description: async (_perso: Perso): Promise<string> => "Vous êtes maintenant un membre de la bande à part entière. " +
                "En signe d'appartenance et de fraternité un couteau et une larme vous sont tatoués bien visibles sur le visage. ",
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, metiersEnum.ranconneur, 20),
        },
        {
            id: "evts_crime4_rançonneur",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";

                const resTestI:ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 20});
                texte += resTestI.resume;
                if (resTestI.reussi) {
                    texte += "Vous rançonnez les petits artisans du coin très efficacement. <br/>";
                    texte += plusUnEnCompetenceMetier(perso, metiersEnum.ranconneur);
                } else {
                    texte += "Alors que vous passez prendre la redevance de l'organisation chez un marcand de chaussures il se permet de refuser de payer. <br/>";
                    const resTestB:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 20});
                    texte += resTestB.resume;
                    if (resTestB.reussi) {
                        texte += "Vous lui démontez le portrait. <br/>";
                    } else {
                        texte += "Vous l'attaquez mais vous prenez une dérouillée humiliante et êtes moqué par tout le gang. "
                        "Peut-être n'êtes vous pas fait pour ce boulot. Vous vous mettez à l'écart. <br/>";
                        texte += arreterCarriere(perso, metiersEnum.ranconneur, true);
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, metiersEnum.ranconneur),
            repetable: true,
        },
    ],
    probaParDefaut: 5,
};
