import {Quartier} from "../../donnees/geographie/quartiers";
import {PersoCommon} from "../../types/perso/Perso";
import {ResultatTest} from "../../types/LancerDe";
import {testVice} from "../des";
import {Vice} from "../../types/ViceVertu";
import {Possession} from "../../donnees/possessions/Possession";

export function changerQuartier(perso: PersoCommon, quartier: Quartier, desactiverEvtsSecondaires: boolean): string {
    let texte: string = "Vous emménagez dans le quartier " + quartier + ".";
    perso.lieu.quartier = quartier;

    if (!desactiverEvtsSecondaires) {
        const resTestColere:ResultatTest = testVice(perso, Vice.colerique, -30);
        if (resTestColere.reussi) {
            texte += resTestColere.resume;
            if (perso.possessions.includes(Possession.armes_lourdes)) {
                texte += "Avant de partir vous vous dites que c'est l'occasion ou jamais de faire comprendre au bar d'à côté à quel point vous le haissez de tout votre coeur. "
                + "Très tôt le matin vous passez devant et le faites sauter au lance-roquette. ";
                perso.bonheur += 0.1;
            } else {
                texte += "Avant de partir vous hurlez à tous vos voisins à quel point vous les avez toujours détestés."
            }
        }
    }

    return texte;
}