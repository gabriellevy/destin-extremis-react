import {Coterie} from "../../types/Coterie";
import {MetiersEnum} from "../metiers";

/**
 * plus grande proba d'avoir ces métier si le perso est de cette coterie
 */
export const metierFavorisesParCoterie: Record<Coterie, MetiersEnum[]> = {
    [Coterie.khaos]: [],
    [Coterie.acheron]: [MetiersEnum.informaticien, MetiersEnum.magicien, MetiersEnum.technomancien],
    [Coterie.bastets]: [MetiersEnum.non_travailleur, MetiersEnum.dileur_de_lycee],
    [Coterie.cathares]: [MetiersEnum.novice_pretre, MetiersEnum.pretre, MetiersEnum.moine],
    [Coterie.carthaginois]: [],
    [Coterie.conquistador]: [],
    [Coterie.hedonistes]:  [MetiersEnum.dileur_de_lycee],
    [Coterie.esprit_de_la_nature]: [],
    [Coterie.celtes]: [],
    [Coterie.demokratos]: [MetiersEnum.edile, MetiersEnum.journaliste],
    [Coterie.elfes]: [MetiersEnum.magicien],
    [Coterie.esthetes]:  [],
    [Coterie.jacobins]: [],
    [Coterie.libertins]: [],
    [Coterie.lumieres]: [MetiersEnum.journaliste, MetiersEnum.ecrivain],
    [Coterie.ogres]: [],
    [Coterie.orks]: [
        MetiersEnum.marchand_de_champignon, MetiersEnum.mecanicien, MetiersEnum.pamphletaire, MetiersEnum.brute_de_lycee
    ],
    [Coterie.performeurs]: [],
    [Coterie.romains]: [],
    [Coterie.saabi]: [],
    [Coterie.schweizer]: [],
    [Coterie.skavens]: [],
    [Coterie.templiers]: [],
    [Coterie.transhumanistes]: [MetiersEnum.cyberneticien, MetiersEnum.informaticien],
    [Coterie.tyranides]:  [],
    [Coterie.zaporogues]: []
}

/**
 * Ces métiers ne peuvent pas être pris par un perso de la coterie correspondante
 */
export const metierDetestesParCoterie: Record<Coterie, MetiersEnum[]> = {
    [Coterie.khaos]: [],
    [Coterie.acheron]: [],
    [Coterie.bastets]: [MetiersEnum.technomancien],
    [Coterie.cathares]: [
        MetiersEnum.pilleur_de_ruche, MetiersEnum.ranconneur,
        MetiersEnum.brute_de_lycee, MetiersEnum.gladiateur,
        MetiersEnum.dileur_de_lycee,
        MetiersEnum.brasseur, MetiersEnum.apprenti_brasseur,
        MetiersEnum.boucher, MetiersEnum.apprenti_boucher,
    ],
    [Coterie.carthaginois]: [],
    [Coterie.conquistador]: [],
    [Coterie.hedonistes]:  [],
    [Coterie.esprit_de_la_nature]: [],
    [Coterie.celtes]: [],
    [Coterie.demokratos]: [],
    [Coterie.elfes]: [],
    [Coterie.esthetes]:  [],
    [Coterie.jacobins]: [],
    [Coterie.libertins]: [],
    [Coterie.lumieres]: [],
    [Coterie.ogres]: [],
    [Coterie.orks]: [],
    [Coterie.performeurs]: [MetiersEnum.non_travailleur],
    [Coterie.romains]: [],
    [Coterie.saabi]: [],
    [Coterie.schweizer]: [],
    [Coterie.skavens]: [],
    [Coterie.templiers]: [MetiersEnum.ranconneur],
    [Coterie.transhumanistes]: [],
    [Coterie.tyranides]:  [],
    [Coterie.zaporogues]: []
}