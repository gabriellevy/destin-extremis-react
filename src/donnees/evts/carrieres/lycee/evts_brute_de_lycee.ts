import {Perso} from "../../../../types/perso/Perso";
import {GroupeEvts} from "../../../../types/Evt";
import {
    arreterCarriere,
    commencerCarriere,
    compatibiliteCarriere,
    estAuLycee,
    plusUnEnCompetenceMetier,
    suitUneCarriereDe, suitUneCarriereDepuis
} from "../../../../fonctions/metiers/metiersUtils";
import {MetiersEnum, metiersObjs} from "../../../metiers";
import {getAge} from "../../../../types/Date";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {getQuartierDeCoterie} from "../../../coteries/Quartiers";

export const evts_brute_de_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_brute_de_lycee1_vocation",
            description: async (perso: Perso): Promise<string> => {
                let texte = '';
                texte += "Vous décidez de vous en prendre à d'autres jeunes plus faibles pour leur vider les poches. <br/>";
                texte += commencerCarriere(perso, MetiersEnum.brute_de_lycee, '');
                return texte;
            },
            conditions: (perso: Perso): boolean => estAuLycee(perso)
                && !suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.brute_de_lycee]) >= 0
                && getAge(perso) <= 18,
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee2_traintrain",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";
                let modifReputationAmplitude: number = 0;
                let modifReputationQualite: number = 0;

                const resTestI: ResultatTest = testComp(perso, {comp: TypeCompetence.intimidation, bonusMalus: 20});
                texte += resTestI.resume;
                if (resTestI.reussi) {
                    texte += "Votre presence menaçante vous permet rapidement de dominer les petits intellos maigrichons du lycée. <br/>";
                    texte += plusUnEnCompetenceMetier(perso, MetiersEnum.brute_de_lycee);
                    modifReputationAmplitude += 1;
                    modifReputationQualite -= 1;
                } else {
                    texte += "L'intimidation ne suffit pas, un des caves se rebiffe. "
                        + "Il va falloir le corriger publiquement pour que ça se sache dans tout le campus. <br/>";
                    const resTestB: ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 20});
                    texte += resTestB.resume;
                    if (resTestB.reussi) {
                        texte += "Vous lui démontez le portrait jusqu'à ce qu'il tombe à terre en pleurant. Tout le lycée va en entendre parler, c'est parfait. <br/>";
                        modifReputationAmplitude += 3;
                        modifReputationQualite -= 5;
                    } else {
                        texte += "Malheureusement le cave est coriace et résiste bien. "
                            + "Vous finissez par être séparés sans avoir rien obtenu. ";
                        modifReputationAmplitude += 1;
                        modifReputationQualite -= 1;
                    }
                }
                if (perso.bilanLycee.coterieActuelle) {
                    texte += modifierReputationDansQuartier(
                        perso,
                        getQuartierDeCoterie(perso.bilanLycee.coterieActuelle),
                        modifReputationQualite,
                        modifReputationAmplitude);
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDe(perso, MetiersEnum.brute_de_lycee),
            repetable: true,
        },
        {
            id: "evts_brute_de_lycee3_cachette",
            description: async (perso: Perso): Promise<string> => {
                let texte = "";

                const resTestDiscretion: ResultatTest = testComp(perso, {comp: TypeCompetence.discretion, bonusMalus: 20});
                texte += resTestDiscretion.resume;
                if (resTestDiscretion.reussi) {
                    texte += "Vous connaissez le lycée comme votre poche et ne vous faites jamais prendre. ";
                } else {
                    texte += "Vous êtes plusieurs fois dénoncé et punis par les surveillants. "
                    + "Vous finissez par être forcé à être plus prudent et stopper vos persécutions et tabassages (pour l'instant). ";
                    texte += arreterCarriere(perso, MetiersEnum.brute_de_lycee, true);
                }

                return texte + "<br/>";
            },
            conditions: (perso: Perso): boolean => suitUneCarriereDepuis(perso, MetiersEnum.brute_de_lycee, 0.3),
            repetable: true,
        }
    ],
    probaParDefaut: 10,
};
