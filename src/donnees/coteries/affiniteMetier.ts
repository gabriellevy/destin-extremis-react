import {Coterie} from "../../types/Coterie";
import {metiersEnum} from "../metiers";

/**
 * plus grande proba d'avoir ces métier si le perso est de cette coterie
 */
export const metierFavorisesParCoterie: Record<Coterie, metiersEnum[]> = {
    [Coterie.chaos]: [],
    [Coterie.acheron]: [],
    [Coterie.bastets]: [metiersEnum.non_travailleur],
    [Coterie.cathares]: [metiersEnum.novice_pretre, metiersEnum.pretre, metiersEnum.moine],
    [Coterie.carthaginois]: [],
    [Coterie.conquistador]: [],
    [Coterie.culte_du_plaisir]:  [],
    [Coterie.esprit_de_la_nature]: [],
    [Coterie.celtes]: [],
    [Coterie.demokratos]: [],
    [Coterie.elfes]: [],
    [Coterie.esthetes]:  [],
    [Coterie.jacobins]: [],
    [Coterie.libertins]: [],
    [Coterie.lumieres]: [metiersEnum.journaliste, metiersEnum.ecrivain],
    [Coterie.ogres]: [],
    [Coterie.orks]: [
        metiersEnum.marchand_de_champignon, metiersEnum.mecanicien, metiersEnum.pamphletaire
    ],
    [Coterie.performeurs]: [],
    [Coterie.romains]: [],
    [Coterie.saabi]: [],
    [Coterie.schweizer]: [],
    [Coterie.skavens]: [],
    [Coterie.templiers]: [],
    [Coterie.transhumanistes]: [metiersEnum.cyberneticien],
    [Coterie.tyranides]:  [],
    [Coterie.zaporogues]: []
}

/**
 * Ces métiers ne peuvent pas être pris par un perso de la coterie correspondante
 */
export const metierDetestesParCoterie: Record<Coterie, metiersEnum[]> = {
    [Coterie.chaos]: [],
    [Coterie.acheron]: [],
    [Coterie.bastets]: [],
    [Coterie.cathares]: [
        metiersEnum.pilleur_de_ruche, metiersEnum.ranconneur, metiersEnum.gladiateur,
        metiersEnum.brasseur, metiersEnum.apprenti_brasseur,
        metiersEnum.boucher, metiersEnum.apprenti_boucher,
    ],
    [Coterie.carthaginois]: [],
    [Coterie.conquistador]: [],
    [Coterie.culte_du_plaisir]:  [],
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
    [Coterie.performeurs]: [metiersEnum.non_travailleur],
    [Coterie.romains]: [],
    [Coterie.saabi]: [],
    [Coterie.schweizer]: [],
    [Coterie.skavens]: [],
    [Coterie.templiers]: [metiersEnum.ranconneur],
    [Coterie.transhumanistes]: [],
    [Coterie.tyranides]:  [],
    [Coterie.zaporogues]: []
}