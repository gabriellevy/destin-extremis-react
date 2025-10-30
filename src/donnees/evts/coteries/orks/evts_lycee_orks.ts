import {GroupeEvts} from "../../../../types/Evt";
import {NiveauIA, Perso} from "../../../../types/perso/Perso";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp, testVertu} from "../../../../fonctions/des";
import {modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {Coterie} from "../../../../types/Coterie";
import {infligerBlessureAleatoire} from "../../../../fonctions/sante/sante";
import {Maitrise} from "../../../maitrise";
import {ajouterMaitrise} from "../../../../fonctions/perso/maitrise";
import {ajouterVertuVal, ajouterViceVal, Vertu, Vice} from "../../../../types/ViceVertu";
import {appelLeChat, NiveauInfosPerso} from "../../../../fonctions/le_chat";
import {plusUnEnCompetenceMetier} from "../../../../fonctions/metiers/metiersUtils";
import {MetiersEnum} from "../../../metiers";
import {poserBioniqueAleatoire} from "../../../../fonctions/sante/bionique";
import {Bionique} from "../../../../types/sante/Bionique";
import { augmenterCompetence } from "../../../../fonctions/perso/competences";

export const evts_lycee_orks: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_orks1_fosse",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Vous vous entrainez à la plus violente des coutumes orks : le combat au corps à corps dans les fosses de justice.";

                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: -10});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous êtes étonament doué et dominez votre adversaire. <br/>";
                    texte += "Vous vous en sortez avec quelques bleus et contusions. <br/>";
                    // se fait connaître dans le coin
                    texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 2, 2);
                } else {
                    const blessureSubie = infligerBlessureAleatoire(perso, 0, 7);
                    if (blessureSubie != null) {
                        const texteBlessure: string = blessureSubie.nom;
                        texte += "Au cours de l'entrainement vous recevez une blessure : " + texteBlessure + ". <br/>";
                    }
                    texte += "Les orks en rigolent un bon coup et vous tappent dans le dos joyeusement. ";
                    texte += "Tu verras quand tu s'ras un vrai ork ça r'poussera. ";
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks2_fou de la vitesse",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Tout ork se doit de savoir piloter les bolides et aimer la vitesse. Vos instructeurs font en sorte que vous fassiez un bon paquet de tours de pistes sans faire vot' mauviet'.";
                texte += "Attention au virage  !! <br/>";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.adresse, bonusMalus: 10});
                texte += resTest.resume;
                if (resTest.reussi) {
                    if (resTest.critical) {
                        texte += "Vous avez un sacré talent pour cela. <br/>";
                        texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 2, 2);
                        texte += ajouterMaitrise(perso, Maitrise.conduite_voiture);

                    } else {
                        texte += "Vous avez un bon talent pour cela et impressionnez les orks. <br/>";
                        texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
                    }
                } else {
                    texte += "Vous êtes un piètre pilote et les orks se moquent de vous avec grand plaisir. <br/>";
                    texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, -1, 2);
                    if (resTest.critical) {
                        const blessureSubie = infligerBlessureAleatoire(perso, 0, 7);
                        if (blessureSubie) {
                            texte += "Malheureusement vous faites quelques chutes violentes sous les moqueries de votre instructeur. Vous avez maintenant la blessure : " + blessureSubie?.nom + ".<br/>";
                        }
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks3_pilote davion",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Les autres coteries se moquent de l'aspect rudimentaire de la technologie ork et pourtant ils sont une des rares à être capable de produire et faire tourner des avions grâces à leurs techniques très économiques en énergie."
                + "Votre instructeur vous offre l'insigne honneur de voler avec lui et vous montre les bases du pilotage. <br/>";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.adresse, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous avez un bon talent pour cela et impressionnez votre instructeur. <br/>";
                    texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
                    if (resTest.critical) {
                        texte += ajouterMaitrise(perso, Maitrise.pilotage_avion);
                    }
                } else {
                    texte += "C'est extrêmement difficile. <br/>";
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks4soulé à la bière",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Personne ne respecte un ork qui ne tient pas la bière aux champignons. Votre instructeur fait en sorte que vous goûtiez de tous les alcools ork. Et en grande quantité. "
                + "Aucun humain ayant subi une telle épreuve n'en ressort indemne. <br/>";

                if (perso.niveauIA !== NiveauIA.desactive) {
                    // pour les evts de remplissage l'IA est utilisée même en mode bouche_trou
                    texte += await appelLeChat(
                        perso,
                        "Racontez une soirée de beuverie d personnage principal avec des orks.",
                        NiveauInfosPerso.prenom) + "<br/>";
                }

                let rand = Math.random();
                if (rand <= 0.3) {
                    texte += "Votre organisme est durement affecté.";
                    texte += augmenterCompetence(perso, TypeCompetence.endurance, -1);
                } else if (rand > 0.7) {
                    texte += "Après des gueules de bois violentes vous êtes surpris de constater que vous vous êtes habitué même à leurs pires bières frelatées.";
                    texte += augmenterCompetence(perso, TypeCompetence.endurance, 1);
                }

                rand = Math.random();
                if (rand <= 0.1) {
                    texte += "Toutes vos angoisses profondes fondent définitivement.";
                    texte += ajouterVertuVal(perso, Vertu.placide, 1);
                }

                rand = Math.random();
                if (rand <= 0.1) {
                    texte += "Durablement affecté par la boisson empoisonnée mais violemment addictive, vous devenez alcoolique.";
                    texte += ajouterViceVal(perso, Vice.gourmand, 1);
                }

                rand = Math.random();
                if (rand <= 0.3) {
                    texte += "L'alcool vous a salement endommagé le cerveau.";
                    texte += augmenterCompetence(perso, TypeCompetence.intelligence, -1);
                }
                rand = Math.random();
                if (rand <= 0.3) {
                    texte += "L'alcool est tellement persistant qu'il vous fait sauter vos inhibitions et votre prudence sur le coup mais aussi à long terme.";
                    texte += ajouterViceVal(perso, Vice.rebelle, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks5formation mékano",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Un mékano a remarqué vos capacités et vous a formé aux bases de la réparation de moteurs. Bien que sa technique semble rudimentaire à première vue il est véritablement doué et très entousiaste comme enseignant. "
                 + "Il vous promet que quand vous serez un vrai ork il vous apprendra à fabriquer des armes, ce qui est encore plus rigolo. <br/>";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += plusUnEnCompetenceMetier(perso, MetiersEnum.mecanicien)
                    texte += "Vous parvenez à retenir les bases du métier. <br/>";
                } else {
                    texte += "Mais vous n'y comprenez pas grand chose. <br/>";
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.orks,
        },
        {
            id: "evts_lycee_orks6formation médiko",
            description: async (perso: Perso): Promise<string> => {
                let texte = "Un médiko a remarqué vos capacités et vous a formé aux bases de la rudimentaire médecine ork."
                 + "Leur vrai point fort est leur obsession des améliorations bioniques combinée à la capacité des patients orques à accepter à peu près toutes les greffes. <br/>";

                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: -10});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += plusUnEnCompetenceMetier(perso, MetiersEnum.medecin)
                    texte += plusUnEnCompetenceMetier(perso, MetiersEnum.cyberneticien)
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
                    texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
                } else {
                    texte += "(mal).";
                    if (resTest.critical) {
                        texte += "Si effroyablement mal que les orks viennent de loin pour rire de vous. <br/>";
                        texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
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
                    texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
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

                const resTestEmpathie:ResultatTest = testVertu(perso, Vertu.empathique, -10);

                texte += resTestEmpathie.resume;
                if (resTestEmpathie.reussi) {
                    texte += "Mais vous évitez autant que possible de participer. <br/>";
                } else {
                    texte += "Vous participez de bon coeur avec vos camarades étudiants. <br/>";
                    const resTestE:ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 0});
                    texte += resTestE.resume;
                    if (resTestE.reussi) {
                        texte += "Vous faites pleurer plusieurs gretchins. <br/>";
                        texte += modifierReputationDansQuartier(perso, Quartier.genevilliers, 1, 1);
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
