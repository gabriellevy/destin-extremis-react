import {GroupeEvts} from "../../../../types/Evt";
import {Perso, PersoHisto} from "../../../../types/perso/Perso";
import {MetalStatut} from "../../../../types/statut_social/Statut";
import {Coterie} from "../../../../types/Coterie";
import {getValeurVertu, Vertu} from "../../../../types/ViceVertu";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";

export const evts_acheronais: GroupeEvts = {
    evts: [
        {
            id: "evts_acheronais1 téléchargement de la conscience",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Ça y est vous avez  enfin les moyens de faire télécharger votre conscience dans internet pour devenir un pur esprit immortel. <br/> ";
                const resChance:ResultatTest = testComp(perso, TypeCompetence.chance, 0);
                texte += resChance.resume;
                if (resChance.reussi) {
                    texte += "L'Opération est un succès vous semble-t'il. Sans sensation, sans corps, vous n'êtes plus vraiment le même, mais vous vous reconnaissez, votre conscience de vous-même existe encore. "
                    + "Une nouvelle vie commence pour vous. Une vie éternelle. ";
                    perso.victoire = true;
                } else {
                    texte += "Du moins c'est ce que vous croyiez. L'opération se contente de vous tuer et d'enrichir les techniciens que vous aviez engagés. Vous êtes mort...";
                    perso.mort = true;
                }

                return texte;
            },
            image: (_perso:PersoHisto):string => "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/coteries/ach%C3%A9ron/devient%20virtuel.jpg",
            conditions: (perso: Perso): boolean =>
                perso.coterie === Coterie.acheron
                && getValeurVertu(perso, Vertu.artificialiste) >= 2
                && perso.statut.metalStatut === MetalStatut.or,
        },
    ],
    probaParDefaut: 0.002,
};
