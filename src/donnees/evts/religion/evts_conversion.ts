import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {getValeurVertu, getValeurVice, Vertu, Vice} from "../../../types/ViceVertu";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testVice} from "../../../fonctions/des";
import {Religion} from "../../../types/Religion";
import {suitUneCarriereDe} from "../../../fonctions/metiers/metiersUtils";
import {MetiersEnum} from "../../metiers";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../fonctions/perso/Reputation";
import {Quartier} from "../../geographie/quartiers";
import {infligerBlessureAleatoire} from "../../../fonctions/sante/sante";

export const evts_conversion: GroupeEvts = {
    evts: [
        {
            id: "evts_conversion1 salon des religions",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous allez au grand salon annuel de la religion de Créteil. "
                + "Il y a 100 nouvelles religions par jour dans la Ville, ça en fait un des plus grand salons idéologiques d'Extremis, ce qui n'est pas peu dire !<br/> ";
                let diff:number = -20 + (suitUneCarriereDe(perso, MetiersEnum.journaliste) ? 40 : 0);

                const resTestSceptique:ResultatTest = testVice(perso, Vice.sceptique, diff);
                texte += resTestSceptique.resume;
                if (resTestSceptique.reussi) {
                    // pas convaincu
                    texte += "La quantité de fadaises que vous entendez ici vous agace malheureusement assez vite. "
                    + "Vous ne comptez plus les gourous bizarres visités par des aliens sondeurs d'anus. "
                    const resTestColere:ResultatTest = testVice(perso, Vice.colerique, -20);
                    texte += resTestColere.resume;
                    if (resTestColere.reussi) {
                        texte += "Finalement vous craquez quand vous voyez un trépanateur sacré sur le point de mutiler un jeune homme. "
                        + "Vous commencez à l'insulter et le brutaliser. ";
                        const resTestEloquence: ResultatTest = testComp(perso, TypeCompetence.eloquence, -10);
                        texte += resTestEloquence.resume;
                        if (resTestEloquence.reussi) {
                            texte += "Vous l'humiliez devant le public par vos moqueries sarcastiques sur sa foi stupide et il se fait discret. ";
                            texte += modifierReputationDansQuartier(perso, Quartier.creteil, 5, 2);
                        } else {
                            texte += "Les invectives tournent à la bagarre. "
                            const resTestBag: ResultatTest = testComp(perso, TypeCompetence.bagarre, 0);
                            texte += resTestBag.resume;
                            if (resTestBag.reussi) {
                                texte += "Vous lui démolissez le portrait jusqu'à ce qu'il promette de ne s'en prendre à personne d'autre. "
                                texte += modifierReputationDansQuartier(perso, Quartier.creteil, 0, 4);
                            } else {
                                texte += "Il vous met au sol sous les moqueries de la foule. "
                                    + "Et il vous oblige à entendre toutes ses théories sur la trépanation sacrée. ";
                                const resTestChance: ResultatTest = testComp(perso, TypeCompetence.chance, 0);
                                texte += resTestChance.resume;
                                if (!resTestChance.reussi) {
                                    texte += "Pour finir la démonstration de trépanation il vous transperce la tête de sa lame pour vous faire voir l'illumination. "
                                        + "Vous êtes mort. ";
                                    perso.mort = true;
                                } else {
                                    texte += infligerBlessureAleatoire(perso, 0, 9);
                                }
                            }
                        }
                    }
                } else {
                    // motivé à la conversion, quelle religions compatibles ??
                    texte += "Vous espérez trouver ici la foi qui vous manque. ";
                    let religions:Religion[] = [];

                    if (getValeurVice(perso, Vice.colerique) >= 2) {
                        religions.push(Religion.odinisme);
                    }
                    if (getValeurVice(perso, Vice.gourmand) >= 2) {
                        religions.push(Religion.anaszasi);
                    }
                    if (getValeurVertu(perso, Vertu.sobre) >= 2) {
                        religions.push(Religion.bol_d_air);
                    }
                    if (getValeurVertu(perso, Vertu.naif) >= 2) {
                        religions.push(Religion.jardiniers_aliens);
                    }

                    if (religions.length == 0) {
                        texte += "Vous ne trouvez aucune religion qui vous séduise. ";
                    } else {
                        perso.religion = religions[Math.floor(Math.random() * religions.length)];
                        switch (perso.religion) {
                            case Religion.odinisme:
                                texte += "Vous êtes très intéressés par la prêtrise d'Odin, qui recommande la haine et l'écrasement des faibles ! ";
                                break;
                            case Religion.anaszasi:
                                texte += "Le culte ancien d'Anaszasi vous fait chercher l'illumination spirituelle en mangeant du Peyotl et la chair humaine. "
                                + "Ça a l'air très excitant. ";
                                break;
                            case Religion.jardiniers_aliens:
                                texte += "La fondation du sacrement, basée sur les principes des jardiniers aliens de l'amour vous passionne.  "
                                + "Leurs adeptes sont régulièrement kidnappés par des aliens qui leur mettent des sondes rectales et des puces mentales. "
                                + "Cela semble formidable d'être messager de leur amour cosmique. ";
                                break;
                            case Religion.bol_d_air:
                                texte += "L'église du bol d'air de Jésus recmmande de ne jamais ni manger ni boire. "
                                + "Voilà qui est parfait pour vous. ";
                                break;
                        }
                        texte += "<br/>";
                    }

                }

                return texte;
            },
            conditions: (perso: Perso): boolean =>
                (perso.religion === Religion.aucun && getValeurVertu(perso, Vertu.spirituel) > 0)
                || suitUneCarriereDe(perso, MetiersEnum.journaliste),
            nbJoursEntreOccurences: 300,
        },
    ],
    probaParDefaut: 0.002,
};
