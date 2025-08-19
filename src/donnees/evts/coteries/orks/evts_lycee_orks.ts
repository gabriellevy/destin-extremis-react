import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/perso/Perso";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {majReputationDansQuartier} from "../../../../types/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {Coterie} from "../../../../types/Coterie";
import {infligerBlessureAleatoire} from "../../../../fonctions/sante/sante";
import {Maitrise} from "../../../maitrise";
import {ajouterMaitrise} from "../../../../fonctions/perso/maitrise";

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
                    texte += majReputationDansQuartier(perso, Quartier.genevilliers, 2);
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
                        texte += majReputationDansQuartier(perso, Quartier.genevilliers, 2);
                        texte += ajouterMaitrise(perso, Maitrise.conduite_voiture);

                    } else {
                        texte += "Vous avez un bon talent pour cela et impressionnez les orks. <br/>";
                        texte += majReputationDansQuartier(perso, Quartier.genevilliers, 1);
                    }
                } else {
                    texte += "Vous êtes un piètre pilote et les orks se moquent de vous avec grand plaisir. <br/>";
                    texte += majReputationDansQuartier(perso, Quartier.genevilliers, -1);
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
                    texte += majReputationDansQuartier(perso, Quartier.genevilliers, 1);
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
    ],
    probaParDefaut: 40, // >>> à la moyenne car spécifique à une phase importante
};
