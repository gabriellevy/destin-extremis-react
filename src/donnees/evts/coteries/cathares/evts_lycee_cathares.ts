import {GroupeEvts} from "../../../../types/Evt";
import {NiveauIA, Perso, Sexe} from "../../../../types/perso/Perso";
import {appelLeChatParaphrase} from "../../../../fonctions/le_chat";
import {Coterie} from "../../../../types/Coterie";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testVertu} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {ajouterVertuVal, getValeurVertu, Vertu} from "../../../../types/ViceVertu";
import {ajouterMaitrise, aLaMaitrise} from "../../../../fonctions/perso/maitrise";
import {Maitrise} from "../../../maitrise";
import {getPrenom} from "../../../../fonctions/noms";
import {DieuEnum} from "../../../../types/Dieu";

export const evts_lycee_cathares: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_cathares1 reclus",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Pour renforcer votre volonté et tester votre pureté vous êtes reclus dans une cellule et réduit au pain sec et à l'eau pendant deux semaines complètes. ";

                const resTestVol:ResultatTest = testComp(perso, TypeCompetence.volonte, 0);
                texte += resTestVol.resume;
                const resTestEnd:ResultatTest = testComp(perso, TypeCompetence.endurance, 0);
                texte += resTestEnd.resume;
                if (resTestVol.reussi && resTestEnd.reussi) {
                    texte += "Vous résistez à ces privations avec une constance qui frappe vos maîtres d'étonnement. ";
                    modifierReputationDansQuartier(perso, Quartier.saint_maur_des_fosses,5 , 3);
                } else {
                    texte += "Ces dures privations vous affectent durablement. ";
                    perso.bonheur -= 0.2;
                }
                if (Math.random() < 0.3) {
                    texte += ajouterVertuVal(perso, Vertu.sobre, 1);
                }
                if (Math.random() < 0.3) {
                    texte += ajouterVertuVal(perso, Vertu.chaste, 1);
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: false,
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.cathares,
        },
        {
            id: "evts_lycee_cathares2 inquisition",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Un inquisiteur vous prend comme assistant et vous entraîne à repérer les contrevenants aux règles de conduite de Saint Maur Des Fossés. ";

                let nbSucces:number = 0;
                const resTestPer:ResultatTest = testComp(perso, TypeCompetence.perception, 0);
                texte += resTestPer.resume;
                if (resTestPer.reussi) {
                    texte += "Vous repérez deux amoureux qui se tiennent la main et s'embrassent sans même avoir de papiers en règles de fiançailles bénies par un prêtre. "
                    + "L'inquisiteur leur inflige une forte amende et à venir faire pénitence à l'église. ";
                    nbSucces += 1;
                }
                const resTestRag:ResultatTest = testComp(perso, TypeCompetence.ragot, 0);
                texte += resTestRag.resume;
                if (resTestRag.reussi) {
                    texte += "Vous êtes particulièrement doué pour attraper les rumeurs et dénoncer les gens louches. ";
                    nbSucces += 1;
                }
                const resTestIntim:ResultatTest = testComp(perso, TypeCompetence.intimidation, 0);
                texte += resTestIntim.resume;
                if (resTestIntim.reussi) {
                    texte += "Personne n'ose plus briser la loi autour de vous tant votre réputation grandit vite. ";
                    nbSucces += 1;
                }
                texte += modifierReputationDansQuartier(perso, Quartier.saint_maur_des_fosses, nbSucces, nbSucces * 2);

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: false,
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.cathares,
        },
        {
            id: "evts_lycee_cathares3 chants",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Les chants, en particulier en choeur, sont pratiqués régulièrement par tous les étudiants cathares. ";

                const resTestPer:ResultatTest = testComp(perso, TypeCompetence.perception, 0);
                texte += resTestPer.resume;
                if (resTestPer.reussi) {
                    texte += "Votre belle voix et votre bonne oreille vous font remarquer. ";
                    texte += modifierReputationDansQuartier(perso, Quartier.saint_maur_des_fosses, 3, 2);
                    texte += ajouterMaitrise(perso, Maitrise.chant);
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: false,
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.cathares,
        },
        {
            id: "evts_lycee_cathares4 cathéchisme",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Hui c'est catéchisme. Vous lisez et étudiez la bible. ";

                const resTestIntel:ResultatTest = testComp(perso,TypeCompetence.intelligence, 0);
                texte += resTestIntel.resume;
                if (resTestIntel.reussi) {
                    texte += "Avec le temps vous finissez par extrêmement bien la connaître. ";
                    texte += ajouterMaitrise(perso, Maitrise.catechisme);
                } else {
                    texte += "Mais vous ne retenez pas grand chose. ";
                }

                if (Math.random() < 0.4) {
                    texte += "Les professeurs vous répètent si souvent votre insignifiance face à Dieu que cela finit par vous affecter. ";
                    texte += ajouterVertuVal(perso, Vertu.humble, 1);
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: true,
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.cathares
            && !aLaMaitrise(perso, Maitrise.catechisme),
        },
        {
            id: "evts_lycee_cathares5 pélerinage",
            description: async (perso: Perso): Promise<string> => {
                const maitre:string = getPrenom(Coterie.cathares, Sexe.male);
                let texte:string = "Mené par votre maître " + maitre
                + " vous et vos camarades entreprenez le pélerinage à Lourdes à pied !"
                + "L'essentiel du chemin est à travers la campagne et "
                + maitre + " a volontairement pris peu de bagages et de provisions pour vous mettre à l'épreuve. <br/>"
                + "À votre grande surprise les animaux s'approchent régulièrement sans crainte de " + maitre
                + " et même lui apportent à manger des fruits et graînes. Vous tentez en douceur de vous immiscer ";

                let nbSucces:number = 0;
                const resTestAnim:ResultatTest = testComp(perso,TypeCompetence.animaux, 0);
                texte += resTestAnim.resume;
                if (resTestAnim.reussi) {
                    texte += " et ils se laissent approcher. Un écureuil vous donne même une noisette !  ";
                    nbSucces += 1;
                } else {
                    texte += " mais ils fuient à votre approche. ";
                }
                const resTestSurvie:ResultatTest = testComp(perso, TypeCompetence.survie, 0);
                texte += resTestSurvie.resume;
                if (resTestSurvie.reussi) {
                    texte += "Vous êtes exceptionnellement doué pour trouver fruits, racines et autres plantes comestibles ainsi que pour installer un camps. "
                    + "VOus devenez très populaire parmi vos camarades. ";
                    texte += modifierReputationDansQuartier(perso, Quartier.saint_maur_des_fosses, 5, 1);
                    nbSucces += 1;
                }
                const resTestEloquence:ResultatTest = testComp(perso, TypeCompetence.eloquence, 0);
                texte += resTestEloquence.resume;
                if (resTestEloquence.reussi) {
                    texte += "En accord avec les principes cathares de " + maitre
                    + " vous mendiez votre subsistance dans les maisons que vous voyez sur votre chemin. ";
                    nbSucces += 1;
                }
                const resTestVolonte:ResultatTest = testComp(perso, TypeCompetence.volonte, -50 + 30 * nbSucces);
                texte += resTestVolonte.resume;
                if (resTestVolonte.reussi) {
                    texte += "Cette expérience vous transforme. Vous priez avec ferveur à Lourdes et tout le long du chemin. ";
                    texte += ajouterVertuVal(perso, Vertu.spirituel, 1);
                } else {
                    texte += "Cette mauvaise expérience vous fait détester la nature. ";
                    texte += ajouterVertuVal(perso, Vertu.artificialiste, 1);
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: false,
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.cathares,
        },
        {
            id: "evts_lycee_cathares6 soupe populaire",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Les étudiants cathares doivent participer à des actions caritatives. "
                + "En d'autres termes aujourd'hui vous êtes obligé de servir la soupe populaire aux pauvres du quartier. ";

                if (Math.random() < 0.4) {
                    texte += "Vos finissez par y prendre goût et appréciez de plus en plus d'aider les gens dans le besoin. ";
                    texte += ajouterVertuVal(perso, Vertu.altruiste, 1);
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: true,
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.cathares && getValeurVertu(perso, Vertu.altruiste) < 3,
        },
        {
            id: "evts_lycee_cathares7 providence",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "On vous répète sans cesse que si vous priez avec sincérité pour aider l'humanité pécheresse, "
                + "Dieu vous bénira et vous permettra d'accomplir des miracles. ";

                const resTestChance:ResultatTest = testComp(perso, TypeCompetence.chance, 0);
                texte += resTestChance.resume;
                const resAltruisme:ResultatTest = testVertu(perso, Vertu.altruiste, -30);
                texte += resAltruisme.resume;
                const resSpirituel:ResultatTest = testVertu(perso, Vertu.spirituel, -30);
                texte += resSpirituel.resume;
                if (resTestChance.reussi && resAltruisme.reussi && resSpirituel.reussi) {
                    texte += "Vous l'avez senti dans votre âme : votre dévotion sans faille a attiré la grâce de Dieu sur vous.  ";
                    texte += ajouterMaitrise(perso, Maitrise.beni);
                    perso.dieu = {
                        religion: DieuEnum.christianisme
                    };
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: true,
            proba: 10,
            conditions: (perso: Perso): boolean =>
                (perso.bilanLycee.coterieActuelle === Coterie.cathares || perso.coterie === Coterie.cathares)
                && !aLaMaitrise(perso, Maitrise.beni),
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};