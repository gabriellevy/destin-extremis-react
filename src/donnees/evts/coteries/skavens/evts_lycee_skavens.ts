import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/Perso";
import {TypeCompetence} from "../../../../types/comps/Comps";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {
    ajouterVertuVal,
    ajouterViceVal,
    getValeurVertu,
    getValeurVice,
    TypeVertu,
    TypeVice
} from "../../../../types/ViceVertu";
import {majReputationDansQuartier} from "../../../../types/Reputation";
import {Quartier} from "../../../geographie/quartiers";
import {ajouterMaitrise, Maitrise} from "../../../maitrise";
import {Coterie} from "../../../../types/Coterie";

export const evts_lycee_skavens: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee_skavens1_tromperie",
            description: (perso: Perso): string => {
                let texte:string = "Le lycée skaven met votre intégrité à rude épreuve. Les élèves, volent, mentent, trichent, et les professeurs, au lieu de punir, récompensent. "
                    + "Ils insistent sur le fait que c'est ainsi qu'on s'en sort et que c'est la bonne voie vers le succès.<br/>";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.tromperie, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous vous en accommodez cependant très vite. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                    if (getValeurVice(perso, TypeVice.trompeur) < 2) {
                        if (Math.random() >= 0.9) {
                            texte += ajouterViceVal(perso, TypeVice.trompeur, 1);
                        }
                    }
                } else {
                    texte += "Vous sentez qu'il est de votre devoir de vous intégrer, mais vous avez beaucoup de mal et êtes régulièrement victimes des manigances de vos camarades. <br/>";
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens2_fuite",
            description: (perso: Perso): string => {
                let texte:string = "Le premier but d'un skaven est la survie. Apprendre à fuir à toute vitesse, par les fenêtres, par les toits, dans les catacombes, est une nécessité qu'on vous enseigne encore et encore.<br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.mouvement, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous devenez rapidement agile comme un chat et vif comme l'éclair. <br/>";
                    if (getValeurVice(perso, TypeVice.lache) < 2) {
                        if (Math.random() >= 0.9) {
                            texte += ajouterViceVal(perso, TypeVice.lache, 1);
                            texte += "Mais surtout, cette habitude fuir au moindre danger devient une seconde nature chez vous. <br/>";
                        }
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens3_artisanat",
            description: (perso: Perso): string => {
                let texte:string = "Être agile de ses mains et surtout rapide est précieux chez les skavens, qui adorent fabriquer des chsoes et détestent faire quoique de soit lentement.<br/>"
                    + "Les cours d'artisanat sont donc toujours chronométrés et demandent une excellente coordination.<br/>";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.adresse, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous impressionnez vos professeurs par votre habileté et votre précision. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                }

                if (getValeurVertu(perso, TypeVertu.travailleur) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterVertuVal(perso, TypeVertu.travailleur, 1);
                        texte += "Vous prenez goût au travail bien fait. <br/>";
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens4_discrétion",
            description: (perso: Perso): string => {
                let texte:string = "Entre les punitions incessantes sans raison et les agressions et vols des élèves vous êtes bien obligé de vous faire discret.<br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.discretion, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    if (getValeurVice(perso, TypeVice.trompeur) < 2) {
                        if (Math.random() >= 0.9) {
                            texte += ajouterViceVal(perso, TypeVice.trompeur, 1);
                            texte += "Non seulement vous devenez discret, mais vous trompez de plus en plus facilement tout le monde sur votre position ou vos intention pour devenir introuvable.<br/>";
                        }
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens5_science",
            description: (perso: Perso): string => {
                let texte:string = "Les cours scientifiques des skavens sont étonament poussés. Ils se focalisent plus sur l'expérimentation que sur le théorique.<br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 0});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Votre intelligence impressionne vos professeurs.<br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens6_foret",
            description: (perso: Perso): string => {
                let texte:string = "Survivre dans la nature est signe de forte volonté et de débrouillardise pour les celtes, ainsi qu'un lien à conserver avec les anciens dieux. "
                    + "De rudes randonnées et nuits à la belle étoile sont donc au programme de leur lycée et vous n'y échapperez pas.<br/> ";
                const resTestSur:ResultatTest = testComp(perso, {comp: TypeCompetence.survie, bonusMalus: 0});
                texte += resTestSur.resume;
                if (resTestSur.reussi) {
                    texte += "Vous semblez être naturellement chez vous en pleine forêt, même dans la nuit la plus noire, à la grande surprise de vos professeurs. <br/>";
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
        {
            id: "evts_lycee_skavens7_poesie",
            description: (perso: Perso): string => {
                let texte:string = "Votre professeur de diction tente de vous inculquer les bases du discours et de la poésie.<br/> ";
                const resTest:ResultatTest = testComp(perso, {comp: TypeCompetence.discours, bonusMalus: -10});
                texte += resTest.resume;
                if (resTest.reussi) {
                    texte += "Vous avez un talent de poète inné qui impressionne fortement votre professeur. <br/>";
                    texte += ajouterMaitrise(perso, Maitrise.poesie);
                    // se fait connaître dans le coin
                    texte += majReputationDansQuartier(perso, Quartier.catacombes_de_paris, 1);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.coterieActuelle === Coterie.skavens,
        },
    ],
    probaParDefaut: 40, // >>> à la moyenne car localisés à un quartier et une phase
};