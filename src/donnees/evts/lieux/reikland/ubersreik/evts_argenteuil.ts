import {GroupeEvts} from "../../../../../types/Evt";
import {Perso} from "../../../../../types/Perso";
import {ResidenceDeVoyage} from "../../../../../types/lieux/ResidenceDeVoyage";
import {compareStatut, MetalStatut} from "../../../../../types/statut_social/Statut";
import {metiersEnum} from "../../../../../types/metiers/metiers";
import {aUneCarriere, commencerCarriere} from "../../../../../types/metiers/metiersUtils";
import {Quartier} from "../../../../geographie/quartiers";

export const evts_argenteuil: GroupeEvts = {
    evts: [

        {
            id: "evts_ubersreik_nains_1",
            description: (perso: Perso): string => {
                perso.lieu.residenceVoyage = ResidenceDeVoyage.hache_et_le_marteau;
                return "De passage à ubersreik et sans logement vous décidez de vous installer à 'La hache et le marteau'. " +
                    "Elle est située en plein Dawihafen, la quartier nain. ";
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.argenteuil
                && compareStatut(perso.statut, {metalStatut: MetalStatut.argent, rang: 1})
                && perso.lieu.enVoyage
                && perso.lieu.residenceVoyage === null,
            proba: 100,
        },
        {
            id: "evts_ubersreik_nains_2",
            description: (): string => "Aujourd'hui vous vous offrez un petit plaisir: vous allez diner et boire un bon coup à 'La hache et le marteau'. " +
                    "La cuisine y est bonne, les portions généreuses, et surtout la bière y est aux standards nains. "
            ,
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.argenteuil
                && compareStatut(perso.statut, {metalStatut: MetalStatut.argent, rang: 1}),
        },
        {
            id: "evts_ubersreik_nains_3",
            description: (perso: Perso): string => {
                commencerCarriere(perso, metiersEnum.serveur, "La hache et le marteau");
                perso.lieu.residenceVoyage = null;
                perso.lieu.maison = ResidenceDeVoyage.auberge_de_la_maison_du_pont;
                return "Vous avez réussi à vous trouver un travail de serveur à 'La hache et le marteau'. " +
                    "C'est une auberge de qualité dans laquelle vous devriez être assez payé pour subvenir à vos besoins. " +
                    "Vous avez surtout la chance de pouvoir loger dans une chambre de l'auberge pour les domestiques. "
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.argenteuil
                && !aUneCarriere(perso),
        },
    ],
    probaParDefaut: 5, // ^plus que le standard à cause de la condition plus spécifique nain (et les nains préfèrent les evts nains)
};
