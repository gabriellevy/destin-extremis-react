import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/perso/Perso";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testMetier, testVice} from "../../../../fonctions/des";
import {Coterie} from "../../../../types/Coterie";
import {ajouterVertuVal, ajouterViceVal, getValeurVice, Vertu, Vice} from "../../../../types/ViceVertu";
import {plusUnEnCompetenceMetier} from "../../../../fonctions/metiers/metiersUtils";
import {metiersEnum} from "../../../metiers";
import {augmenterCompetence} from "../../../../fonctions/perso/competences";
import {majReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
export const evts_lycee_acheron: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_acheron1_technomancie",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Pour être initié à la technomancie et chercher l'immortalité par la digitalisation dans le réseau, il faut déjà maîtriser les bases de l'informatique.";

                const resTestInfo:ResultatTest = testMetier(perso, {metier: metiersEnum.informaticien, bonusMalus: 0});
                texte += resTestInfo.resume;
                if (!resTestInfo.reussi) {
                    texte += "Ce n'est pas votre cas, vous recevez donc une solide formation en informatique au sens large. <br/>";
                    const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 20});
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += plusUnEnCompetenceMetier(perso, metiersEnum.informaticien);
                    }
                } else {
                    texte += "Vous avez déjà un bon niveau. Mais il faut aussi maîtriser la magie, car la technomancie est la combinaison de l'informatique et de la magie. <br/>";
                    const resTestInfo:ResultatTest = testMetier(perso, {metier: metiersEnum.informaticien, bonusMalus: 0});
                    texte += resTestInfo.resume;
                    if (!resTestInfo.reussi) {
                        texte += "Ce n'est pas votre cas, vous recevez donc une solide formation en magie nécromantique théoriqe. <br/>";
                        const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 20});
                        texte += resTest.resume;
                        if (resTest.reussi) {
                            texte += plusUnEnCompetenceMetier(perso, metiersEnum.magicien);
                        }
                    } else {
                        // à la fois informaticien et magicien qualifié :
                        const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: -30});
                        texte += resTest.resume;
                        if (resTest.reussi) {
                            texte += "Vos nombreuses compétences ainsi que votre intelligence exceptinnelles vous permettent de saisir les bases de la technomancie. ";
                            texte += plusUnEnCompetenceMetier(perso, metiersEnum.technomancien);
                        } else {
                            texte += "Vous avez beau avoir toutes ls bases l'extrême complexité de la technomancie vous échappe. ";
                        }
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
        {
            id: "evts_lycee_acheron2_magie",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Plusieurs cours complexes visent à vous apprendre les bases de la magie. Ces cours mélangent théorie complexes avec une forme d'instinct qu'on possède ou ne possède pas. <br/>";
                const resTestInt:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: -10});
                const resTestIntuition:ResultatTest = testComp(perso, {comp: TypeCompetence.intuition, bonusMalus: -10});
                texte += resTestInt.resume;
                texte += resTestIntuition.resume;
                if (resTestInt.reussi && resTestIntuition.reussi) {
                    plusUnEnCompetenceMetier(perso, metiersEnum.magicien)
                    texte += "Vous parvenez à retenir les bases de la sorcellerie et à jeter instincivement de manière peu fiable quelques petits sorts. <br/>";
                } else {
                    texte += "Vous ne parvenez pas à lancer le moindre sort. <br/>";
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
        {
            id: "evts_lycee_acheron3_torture",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Les achérons extraient des gemmes de ténèbres utilisables en magie en torturant les criminels. "
                + "Les étudiants sont considérés comme de bons tortionnaires donc on leur demande de participer. "
                + "Les maîtres achéronnais pensent aussi qu'il est toujours une bonne chose de terrifier les délinquants potentiels en les exposant aux punitions les plus terribles. ";

                const resTestCruel:ResultatTest = testVice(perso, Vice.cruel, 0);

                texte += resTestCruel.resume;
                if (resTestCruel.reussi) {
                    texte += "Vous participez de bon coeur avec vos camarades étudiants. <br/>";
                    const resTestIntim:ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 0});
                    texte += resTestIntim.resume;
                    if (resTestIntim.reussi) {
                        texte += "En plus de la torture physiques vous êtes très doués pour terrifier les condamnés. Vos professeurs et collègues sont très impressionnés. <br/>";
                        texte += majReputationDansQuartier(perso, Quartier.noisiel, 1, 1);
                    }
                    if (resTestCruel.critical && getValeurVice(perso, Vice.cruel) < 3) {
                        texte += "Vous y prenez de plus en plus goût. ";
                        texte += ajouterViceVal(perso, Vice.cruel, 1);
                    }
                } else {
                    texte += "Mais vous évitez autant que possible de participer. <br/>";
                }
                if (Math.random() <= 0.3) {
                    texte += "À force vous vous sentez de plus en plus insensibilisé à toute cette souffrance. ";
                    texte += ajouterViceVal(perso, Vice.sociopathique, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
        {
            id: "evts_lycee_acheron4_dur travail",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Les achéronnais sont obsédés par l'étude jusqu'à l'épuisement et l'obsession. <br/>";

                if (Math.random() <= 0.4) {
                    texte += "Plus le temps passe et plus les punitions se succèdent, plus vous ne pensez plus à rien d'autre qu'au travail. "
                    + "Votre humeur, votre apparence et même votre hygiène s'en ressentent. ";
                    texte += ajouterVertuVal(perso, Vertu.travailleur, 1);
                    texte += augmenterCompetence(perso, TypeCompetence.reflexes, -1);
                    texte += augmenterCompetence(perso, TypeCompetence.charme, -1);
                }

                if (Math.random() <= 0.2) {
                    texte += "La concurrence extrêmement rude entre élèves vus épuise. D'autant plus que beaucoup d'entre eux n'ont aucun scrupule pour faire des coups bas sournois. ";
                    texte += ajouterViceVal(perso, Vice.paranoiaque, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
        {
            id: "evts_lycee_acheron5 expérimentations magiques",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vos professeurs achéronnais sont friands d'expérimentations magiques et ont une méchante tendance à vous utiliser comme sujets d'expérience, vous et vos camarades. <br/>";

                if (Math.random() <= 0.5) {
                    texte += "Sans être fatales ces cruautés vous marquent physiquement et mentalement. ";
                    texte += augmenterCompetence(perso, TypeCompetence.charme, -1);
                    texte += augmenterCompetence(perso, TypeCompetence.volonte, -1);
                }
                if (Math.random() <= 0.4) {
                    texte += "Vous devenez de plus en plus méfiant à la limite de la paranoïa. ";
                    texte += ajouterViceVal(perso, Vice.paranoiaque, 1);
                }
                if (Math.random() <= 0.4) {
                    texte += "Vous apprenez à éviter les dangers et à surtout rester discret. ";
                    texte += ajouterVertuVal(perso, Vertu.prudent, 1);
                    texte += augmenterCompetence(perso, TypeCompetence.discretion, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};
