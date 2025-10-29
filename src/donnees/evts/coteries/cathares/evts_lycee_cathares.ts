import {GroupeEvts} from "../../../../types/Evt";
import {NiveauIA, Perso} from "../../../../types/perso/Perso";
import {appelLeChatParaphrase} from "../../../../fonctions/le_chat";
import {Coterie} from "../../../../types/Coterie";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {ajouterVertuVal, Vertu} from "../../../../types/ViceVertu";
import {ajouterMaitrise} from "../../../../fonctions/perso/maitrise";
import {Maitrise} from "../../../maitrise";


export const evts_lycee_cathares: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_cathares1 reclus",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Pour renforcer votre volonté et tester votre pureté vous êtes reclus dans une cellule et réduit au pain sec et à l'eau pendant deux semaines complètes. ";

                const resTestVol:ResultatTest = testComp(perso, {comp: TypeCompetence.volonte, bonusMalus: 0});
                texte += resTestVol.resume;
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 0});
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
                const resTestPer:ResultatTest = testComp(perso, {comp: TypeCompetence.perception, bonusMalus: 0});
                texte += resTestPer.resume;
                if (resTestPer.reussi) {
                    texte += "Vous repérez deux amoureux qui se tiennent la main et s'embrassent sans même avoir de papiers en règles de fiançailles bénies par un prêtre. "
                    + "L'inquisiteur leur inflige une forte amende et à venir faire pénitence à l'église. ";
                    nbSucces += 1;
                }
                const resTestRag:ResultatTest = testComp(perso, {comp: TypeCompetence.ragot, bonusMalus: 0});
                texte += resTestRag.resume;
                if (resTestRag.reussi) {
                    texte += "Vous êtes particulièrement doué pour attraper les rumeurs et dénoncer les gens louches. ";
                    nbSucces += 1;
                }
                const resTestIntim:ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 0});
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

                const resTestPer:ResultatTest = testComp(perso, {comp: TypeCompetence.perception, bonusMalus: 0});
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

                const resTestIntel:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 0});
                texte += resTestIntel.resume;
                if (resTestIntel.reussi) {
                    texte += "Avec le temps vous finissez par extrêmement bien la connaître. ";
                    texte += ajouterMaitrise(perso, Maitrise.catechisme);
                } else {
                    texte += "Mais vous ne retenez pas grand chose. ";
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: false,
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.cathares,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};