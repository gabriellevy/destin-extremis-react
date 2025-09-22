import {GroupeEvts} from "../../../../types/Evt";
import {Perso, Sexe} from "../../../../types/perso/Perso";
import {Coterie} from "../../../../types/Coterie";
import {modifierStatut, statut1SuperieurOuEgalAStatut2} from "../../../../fonctions/perso/statut";
import {MetalStatut} from "../../../../types/statut_social/Statut";
import {getPrenom} from "../../../../fonctions/noms";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testVice} from "../../../../fonctions/des";
import {getValeurCompetence, TypeCompetence} from "../../../../types/perso/comps/Comps";
import {aUneCarriere, commencerCarriere} from "../../../../fonctions/metiers/metiersUtils";
import {metiersEnum} from "../../../metiers";
import {ajouterVertuVal, ajouterViceVal, Vertu, Vice} from "../../../../types/ViceVertu";
import {infligerBlessureAleatoire} from "../../../../fonctions/sante/sante";

export const evts_orks: GroupeEvts = {
    evts: [
        {
            id: "evts_orks1_esclave",
            description: async (perso: Perso): Promise<string> => {
                const nomGretchin:string = getPrenom(Coterie.orks, Sexe.male);
                perso.esclaveGtrechin = nomGretchin;
                return "Vous vous payez un esclave gretchin. Il s'appelle " + nomGretchin + ".";
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && statut1SuperieurOuEgalAStatut2(perso.statut, {metalStatut: MetalStatut.bronze, rang: 5})
                && !perso.esclaveGtrechin,
        },
        {
            id: "evts_orks2_squid juteux",
            description: async (perso: Perso): Promise<string> => {
                return "Hui vous vous faites un petit plaisir : votre gretchin esclave " + perso.esclaveGtrechin + "  vous cuisine un bon squig juteux qu'il a trouvé au fond de le fosse à ordure. "
                    + "Vous allez vous régaler ! ";
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && !!perso.esclaveGtrechin,
        },
        {
            id: "evts_orks3",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous décidez de devenir marchand de champignon. `
                const resTestMarch:ResultatTest = testComp(perso, {comp: TypeCompetence.marchandage, bonusMalus: 20});
                texte += resTestMarch.resume;
                if (resTestMarch.reussi) {
                    texte += commencerCarriere(perso, metiersEnum.marchand_de_champignon, '');
                } else {
                    texte += `Malheureusement vous êtes un trop mauvais marchand, vous devenez vite abandonner. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && !aUneCarriere(perso),
        },
        {
            id: "evts_orks4 racketté",
            description: async (perso: Perso): Promise<string> => {
                const nomBrute:string = getPrenom(Coterie.orks, Sexe.male);
                let texte: string = "Hui " + nomBrute + ", une grosse brute, vous rackette. "
                    + "Il profite de tous les orks un peu entreprenants comme vous. ";

                if (Math.random() <= 0.1) {
                    texte += "Vous avez beau savoir que vous n'êtes pas le plus fort, votre colère monte. <br/>.";
                    texte += ajouterViceVal(perso, Vice.colerique, 1);
                }
                else if (Math.random() <= 0.1) {
                    texte += "Ces mauvais traitements et votre sentiment d'impuissance vous rendent de plus en plus mou et inquiet.<br/>.";
                    texte += ajouterVertuVal(perso, Vertu.placide, 1);
                }

                const resTestColere:ResultatTest = testVice(perso, Vice.colerique,0);
                texte += resTestColere.resume;
                if (resTestColere.reussi) {
                    texte += "Vous n'y tenez plus et attaquez " + nomBrute + " le rançonneur. ";
                    const resTesBag:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 20});
                    const resTesFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                    texte += resTesBag.resume;
                    texte += resTesFor.resume;
                    if (resTesBag.reussi && resTesFor.reussi) {
                        texte += "Furieux, vous lui démolissez le portrait. <br/>";
                    } else {
                        texte += `Malheureusement il est plus fort que vous et non seulement il vous démolit le portrait, mais il vous fait payer encore plus. <br/>`;
                        infligerBlessureAleatoire(perso, 1, 4);
                        texte += modifierStatut(perso, -1);
                    }
                } else {
                    texte += "Humilié, vous payez régulièrement. Pas moyen de faire autrement. <br/>";
                    texte += modifierStatut(perso, -1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.orks
                && getValeurCompetence(perso, TypeCompetence.force) <= 35
                && aUneCarriere(perso),
        },
    ],
    probaParDefaut: 10, // un peu > à la moyenne car spécifique à une coterie
};