import {GroupeEvts} from "../../../../types/Evt";
import {NiveauIA, Perso} from "../../../../types/perso/Perso";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testMetier, testVertu} from "../../../../fonctions/des";
import {majReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {Coterie} from "../../../../types/Coterie";
import {infligerBlessureAleatoire} from "../../../../fonctions/sante/sante";
import {Maitrise} from "../../../maitrise";
import {ajouterMaitrise} from "../../../../fonctions/perso/maitrise";
import {ajouterVertuVal, ajouterViceVal, Vertu, Vice} from "../../../../types/ViceVertu";
import {appelLeChat, NiveauInfosPerso} from "../../../../fonctions/le_chat";
import {plusUnEnCompetenceMetier} from "../../../../fonctions/metiers/metiersUtils";
import {metiersEnum} from "../../../metiers";
import {poserBioniqueAleatoire} from "../../../../fonctions/sante/bionique";
import {Bionique} from "../../../../types/sante/Bionique";
import { augmenterCompetence } from "../../../../fonctions/perso/competences";

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
            id: "evts_lycee_orks6formation médiko",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Un médiko a remarqué vos capacités et vous a formé aux bases de la rudimentaire médecine ork."
                    + "Leur vrai point fort est leur obsession des améliorations bioniques combinée à la capacité des patients orques à accepter à peu près toutes les greffes. <br/>";

                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: -10});
                texte += resTest.resume;
                if (resTest.reussi) {
                    plusUnEnCompetenceMetier(perso, metiersEnum.medecin)
                    plusUnEnCompetenceMetier(perso, metiersEnum.cyberneticien)
                    texte += "Vous parvenez à retenir les bases du métier. <br/>";
                } else {
                    texte += "Mais vous n'y comprenez pas grand chose. <br/>";
                }

                if (Math.random() <= 0.4) {
                    texte += "Malheureusement il en profite pour faire des expériences amusantes sur vous après vous avoir assommé avec un maillet.";
                    const blessureSubie = infligerBlessureAleatoire(perso, 0, 7);
                    if (blessureSubie != null) {
                        const texteBlessure: string = blessureSubie.nom;
                        texte += texteBlessure + ". <br/>";
                    }
                    const bionique: Bionique|null = poserBioniqueAleatoire(perso);
                    if (bionique) {
                        if (bionique.description.length == 0 && perso.niveauIA !== NiveauIA.desactive
                            || perso.niveauIA === NiveauIA.systematique) {
                            texte += await appelLeChat(
                                perso,
                                "Racontez la pose du bionique suivant sur le personnage principal : " + bionique.nom,
                                NiveauInfosPerso.prenom);
                        } else {
                            texte += bionique.description + "<br/>"
                        }
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks6_oisiveté",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Si il y a une chose que vos professeurs veulent vous faire apprendre c'est qu'il 'faut pas sen fair'. "
                    + "Vous passez des journées entières à boire, jouer et fumer des mélanges étranges dans les kafés orks. Vous allez aussi souvent à la foir'. <br/>";

                if (Math.random() <= 0.4) {
                    texte += "Plus le temps passe, plus vous vous désintéressez de ce que les autres pensent de vous, vous négligez votre hygiène, votre diction devient médiocre. ";
                    texte += ajouterViceVal(perso, Vice.paresseux, 1);
                    texte += augmenterCompetence(perso, TypeCompetence.eloquence, -1);
                    texte += augmenterCompetence(perso, TypeCompetence.charme, -1);
                }
                texte += "Vous passez aussi beaucoup de temps à chanter et jouer du tambour ";

                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intuition, bonusMalus: 20});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous avez un certain talent. <br/>";
                    texte += majReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
                } else {
                    texte += "(mal).";
                    if (resTest.critical) {
                        texte += "Si effroyablement mal que les orks viennent de loin pour rire de vous. <br/>";
                        texte += majReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks7bgarre",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Les rixes font partie intégrante de la vie d'un ork. Hui vous vous retrouvez une fois encore aux prises avec un ork qui n'a pas apprécié que vous lui fassiez de l'ombre en passant. <br/>";

                const resTestB:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 20});
                const resTestF:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                texte += resTestF.resume;
                texte += resTestB.resume;
                if (resTestF.reussi && resTestB.reussi) {
                    texte += "Vous lui casse les dents puis vous réconciliez devant une bière en s'marrant. <br/>";
                    texte += majReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
                } else {
                    if (resTestF.critical) {
                        const blessureSubie = infligerBlessureAleatoire(perso, 0, 4);
                        if (blessureSubie != null) {
                            const texteBlessure: string = blessureSubie.nom;
                            texte += "Il vous blesse gravement : " + texteBlessure + "<br/>";
                        }
                    } else {
                        texte += "Il vous casse une dent puis vous réconciliez devant une bière en s'marrant. <br/>";
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks8impulsivité",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Hui vous voulez aller à la fête foraine et faire l'attraction la plus dangereuse possible. <br/>";
                texte += "Votre prof' vous répond 'quand un ork sen kcé lmoment il fait ! Fonc' morveux !'. <br/>";
                texte += "L'attraction est un tourniquet géant qui monte et descend tout en tounoyant dans tous les sens et chaque ork a une jambe accrochée en haut du tourniquet par un élastique mal attaché. <br/>";

                const resTestE:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 0});
                texte += resTestE.resume;
                if (resTestE.reussi) {
                    texte += "Meilleure journée de votre vie ! <br/>";
                } else {
                    const blessureSubie = infligerBlessureAleatoire(perso, 0, 4);
                    if (blessureSubie != null) {
                        const texteBlessure: string = blessureSubie.nom;
                        texte += "Après vous être cogné contre 3 autres festivaliers votre élastique lâche, vous êtes expulsé du manège à grande vitesse et subissez : " + texteBlessure + " <br/>";
                    }
                }

                if (Math.random() <= 0.3) {
                    texte += "En tout cas vous vous êtes fait plein d'potes à coups d'tatanes et vous êtes tous bien vomis d'ssus.<br/>.";
                    texte += ajouterVertuVal(perso, Vertu.sociable, 1);
                }
                if (Math.random() <= 0.3) {
                    texte += "Décidément les études c'est pour les crétins.<br/>.";
                    texte += ajouterViceVal(perso, Vice.rebelle, 1);
                }
                if (Math.random() <= 0.3) {
                    texte += "Après cette expérience vous n'avez plus peur de rien.<br/>.";
                    texte += ajouterViceVal(perso, Vice.aventureux, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks9harcèlement",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Frapper et humilier les plus faible est un trait typique de la culture ork. ";

                const resTestEmpathie:ResultatTest = testVertu(perso, {typeBon: Vertu.empathique, bonusMalus: -10});

                texte += resTestEmpathie.resume;
                if (resTestEmpathie.reussi) {
                    texte += "Mais vous évitez autant que possible de participer. <br/>";
                } else {
                    texte += "Vous participez de bon coeur avec vos camarades étudiants. <br/>";
                    const resTestE:ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 0});
                    texte += resTestE.resume;
                    if (resTestE.reussi) {
                        texte += "Vous faites pleurer plusieurs gretchins. <br/>";
                        texte += majReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
                    }
                }
                if (Math.random() <= 0.3) {
                    texte += ajouterViceVal(perso, Vice.sociopathique, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};
