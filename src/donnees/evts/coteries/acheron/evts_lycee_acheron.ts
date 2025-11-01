import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/perso/Perso";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testMetier, testVice} from "../../../../fonctions/des";
import {Coterie} from "../../../../types/Coterie";
import {ajouterVertuVal, ajouterViceVal, getValeurVice, Vertu, Vice} from "../../../../types/ViceVertu";
import {plusUnEnCompetenceMetier} from "../../../../fonctions/metiers/metiersUtils";
import {MetiersEnum} from "../../../metiers";
import {augmenterCompetence} from "../../../../fonctions/perso/competences";
import {modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {ajouteLigneDeTexteGras} from "../../../../fonctions/texte_fc";
export const evts_lycee_acheron: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_acheron1_technomancie",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Pour être initié à la technomancie et chercher l'immortalité par la digitalisation dans le réseau, il faut déjà maîtriser les bases de l'informatique.";

                const resTestInfo:ResultatTest = testMetier(perso, {metier: MetiersEnum.informaticien, bonusMalus: 0});
                texte += resTestInfo.resume;
                if (!resTestInfo.reussi) {
                    texte += "Ce n'est pas votre cas, vous recevez donc une solide formation en informatique au sens large. <br/>";
                    const resTest:ResultatTest = testComp(perso, TypeCompetence.intelligence, 20);
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += plusUnEnCompetenceMetier(perso, MetiersEnum.informaticien);
                    }
                } else {
                    texte += "Vous avez déjà un bon niveau. Mais il faut aussi maîtriser la magie, car la technomancie est la combinaison de l'informatique et de la magie. <br/>";
                    const resTestInfo:ResultatTest = testMetier(perso, {metier: MetiersEnum.informaticien, bonusMalus: 0});
                    texte += resTestInfo.resume;
                    if (!resTestInfo.reussi) {
                        texte += "Ce n'est pas votre cas, vous recevez donc une solide formation en magie nécromantique théoriqe. <br/>";
                        const resTest:ResultatTest = testComp(perso, TypeCompetence.intelligence, 20);
                        texte += resTest.resume;
                        if (resTest.reussi) {
                            texte += plusUnEnCompetenceMetier(perso, MetiersEnum.magicien);
                        }
                    } else {
                        // à la fois informaticien et magicien qualifié :
                        const resTest:ResultatTest = testComp(perso, TypeCompetence.intelligence, -30);
                        texte += resTest.resume;
                        if (resTest.reussi) {
                            texte += "Vos nombreuses compétences ainsi que votre intelligence exceptinnelles vous permettent de saisir les bases de la technomancie. ";
                            texte += plusUnEnCompetenceMetier(perso, MetiersEnum.technomancien);
                        } else {
                            texte += "Vous avez beau avoir toutes ls bases l'extrême complexité de la technomancie vous échappe. ";
                        }
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
            repetable: true,
        },
        {
            id: "evts_lycee_acheron2_magie",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Plusieurs cours complexes visent à vous apprendre les bases de la magie. Ces cours mélangent théories complexes avec une forme d'instinct qu'on possède ou ne possède pas. <br/>";
                const resTestInt:ResultatTest = testComp(perso, TypeCompetence.intelligence, -10);
                const resTestIntuition:ResultatTest = testComp(perso,TypeCompetence.intuition, -10);
                texte += resTestInt.resume;
                texte += resTestIntuition.resume;
                if (resTestInt.reussi && resTestIntuition.reussi) {
                    plusUnEnCompetenceMetier(perso, MetiersEnum.magicien)
                    texte += "Vous parvenez à retenir les bases de la sorcellerie et à jeter instincivement de manière peu fiable quelques petits sorts. <br/>";
                } else {
                    texte += "Vous ne parvenez pas à lancer le moindre sort. <br/>";
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
            repetable: true,
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
                    const resTestIntim:ResultatTest = testComp(perso, TypeCompetence.intimidation, 0);
                    texte += resTestIntim.resume;
                    if (resTestIntim.reussi) {
                        texte += "En plus de la torture physiques vous êtes très doués pour terrifier les condamnés. Vos professeurs et collègues sont très impressionnés. <br/>";
                        texte += modifierReputationDansQuartier(perso, Quartier.noisiel, 1, 1);
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
                    texte += ajouteLigneDeTexteGras(ajouterVertuVal(perso, Vertu.travailleur, 1));
                    texte += ajouteLigneDeTexteGras(augmenterCompetence(perso, TypeCompetence.reflexes, -1));
                    texte += ajouteLigneDeTexteGras(augmenterCompetence(perso, TypeCompetence.charme, -1));
                }

                if (Math.random() <= 0.2) {
                    texte += "La concurrence extrêmement rude entre élèves vus épuise. D'autant plus que beaucoup d'entre eux n'ont aucun scrupule pour faire des coups bas sournois. ";
                    texte += ajouterViceVal(perso, Vice.mefiant, 1);
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
                    texte += ajouterViceVal(perso, Vice.mefiant, 1);
                }
                if (Math.random() <= 0.4) {
                    texte += "Vous apprenez à éviter les dangers et à surtout rester discret. ";
                    texte += ajouterVertuVal(perso, Vertu.prudent, 1);
                    texte += augmenterCompetence(perso, TypeCompetence.discretion, 1);
                    texte += augmenterCompetence(perso, TypeCompetence.tromperie, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
        {
            id: "evts_lycee_acheron6 méditations mortelles",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "La mort est au coeur des obsessions achéroniennes. Son étude et la méditation à son sujet sont incontournables et oppressantes au lycée." +
                    "Vos professeurs vous obligent à méditer immobiles pendant des heures, jusqu'à engourdir votre corps et ovus approcher de la psychose. <br/>";

                const resTestVolonte:ResultatTest = testComp(perso, TypeCompetence.volonte, 0);
                texte += resTestVolonte.resume;
                if (resTestVolonte.reussi) {
                    texte += "Vous faites preuve d'une grande résistance à ces traitements et impressionnez vos professeurs. "
                    + " Mais vous sentez votre vivacité s'affaiblir, comme si vous vieillissiez prématurément. "
                    + "Au bous de plusieurs mois de ce traitement vous avez été durement marqué physiquement et avez une sorte d'aura inquiétante qui effraye vos correlégionnaires. ";
                    texte += augmenterCompetence(perso, TypeCompetence.reflexes, -1);
                    texte += augmenterCompetence(perso, TypeCompetence.charme, -1);
                    texte += augmenterCompetence(perso, TypeCompetence.intimidation, 1);
                    texte += modifierReputationDansQuartier(perso, Quartier.noisiel, 1, 3);
                }
                if (Math.random() <= 0.3) {
                    texte += "Vous devenez de plus en plus méfiant à la limite de la paranoïa. ";
                    texte += ajouterViceVal(perso, Vice.mefiant, 1);
                }
                if (Math.random() <= 0.4) {
                    texte += "Vous avez le sentiment que cet isolement mental brise vos aptitudes sociales. ";
                    texte += augmenterCompetence(perso, TypeCompetence.eloquence, -1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
        {
            id: "evts_lycee_acheron7 domination des mort-vivants",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Dans le quartier de Noisiel vous devez vous habituer à vivre aux côté de nombreux mort-vivants ou quasi morts. "
                    + "Beaucoup semblent n'avoir aucun sentiment ni aucune sensation. D'autres ont l'air tourmentés en permanence et vous regardent avec leur orbites vides. <br/>";

                const resTestVolonte:ResultatTest = testComp(perso, TypeCompetence.volonte, -10);
                texte += resTestVolonte.resume;
                if (resTestVolonte.reussi) {
                    texte += "Votre volonté solide vous permet de vous habituer étonamment vite et même de vaguement communiquer avec eux quand c'est possible. ";
                    if (Math.random() <= 0.5) {
                        texte += "Vous sentez vite à quel point vous êtes supérieur à ces quasi esclaves et mêmes aux autres étudiants qui ne surmontent pas leur peur. ";
                        texte += ajouterViceVal(perso, Vice.orgueilleux, 1);
                    }
                    texte += modifierReputationDansQuartier(perso, Quartier.noisiel, 1, 2);
                } else {
                    texte += "Cette situation terrifiante vous affecte énormément. ";

                    if (Math.random() <= 0.2) {
                        texte += "Vous devenez de plus en plus méfiant à la limite de la paranoïa. ";
                        texte += ajouterViceVal(perso, Vice.mefiant, 1);
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.acheron,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};
