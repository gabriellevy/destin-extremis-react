import {Perso, PersoCommon, Sexe} from "../../../types/perso/Perso";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testVertu} from "../../../fonctions/des";
import {getNom} from "../../../fonctions/noms";
import {Coterie, EffectDeCoterieSurPerso} from "../../../types/Coterie";
import {actuellementDrogueAQuelqueChose, arreterDrogue} from "../../../fonctions/sante/drogues_fc";
import {getRandomInt} from "../../../fonctions/random";
import {Vertu} from "../../../types/ViceVertu";
import {changerQuartier} from "../../../fonctions/geographie/quartier";
import {getQuartierDeCoterie} from "../Quartiers";
import {getEffetsDeCoterieSurCompetences} from "../EffetsDesCoteriesSurPerso";
import {effetDeBaseEnRejoignantUneCoterie, rejointCoterie} from "../../../fonctions/coteries/generales";
import {calculerAffinite, SEUIL_AFFINITE} from "../../../fonctions/coteries/affinite";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {getPremierAmour, nombreDeRelationsAmoureusesEnCours} from "../../../fonctions/pnjs/amour";
import {PNJ} from "../../../types/perso/PNJ";
import {modifierReputationDansQuartier} from "../../../fonctions/perso/Reputation";

const testDEntreeCathare: (perso: Perso) => Promise<string> = (perso: Perso) => {
    const nomParfait:string = getNom(Coterie.cathares, Sexe.male);
    let texte: string =  "Votre période d'ascèse touche à sa fin. Le parfait " + nomParfait
    + " est chargé d'évaluer si vous êtes maintenant digne de recevoir le consolamentum."
    + "Il semble connaître tous vos faits et gestes, il semble même connaître vos pensées. <br/>";
    let reussi:boolean = true;

    // drogues
    texte += "Vous ne pourrez être cathare que si vous renoncez à vous droguer définitivement. "
    if (actuellementDrogueAQuelqueChose(perso)) {
        for (let i = 0; i < perso.drogues.length; ) {
            const resTestSobre:ResultatTest = testVertu(perso, Vertu.sobre, 0);
            texte += resTestSobre.resume;
            if (resTestSobre.reussi) {
                texte += arreterDrogue(perso, i)
            } else {
                texte += "Malheureusement vous ne parvenez pas à renoncer à " + perso.drogues[i].toString() + ".";
                reussi = false;
                break;
            }
        }
    } else {
        texte += nomParfait + " semble sentir instinctivement que vous êtes purs de toute addiction et le dit bien haut à l'assistance. "
    }
    texte += "<br/>";

    // sexe !
    texte += "Pour devenir cathare vous devez renoncer à toute forme de fornication définitivement. "
    + "À l'extrême rigueur vous y serez autorisé si vous vous mariez religieusement à une cathare, mais tous vos unions précédents sont sans valeur. ";
    while (nombreDeRelationsAmoureusesEnCours(perso) > 0) {
        const amour:PNJ|undefined = getPremierAmour(perso);
        if (!amour) {
            console.error("Pas de PNJ amour à oublier");
        } else {
            const resTestChaste:ResultatTest = testVertu(perso, Vertu.chaste, 0);
            texte += resTestChaste.resume;
            if (resTestChaste.reussi) {
                const indexAmour = perso.pnjs.findIndex((e:PNJ) => e === amour);
                perso.pnjs.splice(indexAmour, 1);
                texte += "Vous parvenez à oublier " + amour.prenom + ".";
            } else {
                texte += "Vous n'arrivez pas à oublier " + amour.prenom + ".";
                reussi = false;
                break;
            }
        }
    }
    texte += "<br/>";

    if (reussi) {
        let nbSucces:number = 0;
        texte += "Vous devez aussi renoncer à consommer de la viande et des produits issus de la reproduction animale. ";
        const resTestSobre:ResultatTest = testVertu(perso, Vertu.sobre, 20);
        texte += resTestSobre.resume;
        if (resTestSobre.reussi) {
            nbSucces += 1;
            texte += "Le parfait est satisfait de votre retenue et de votre volonté. ";
        } else {
            texte += "Vous n'en avez pas été tout à fait capable lors de votre période d'ascèse, vous êtes jugé encore trop faible. ";
        }
        texte += "<br/>";
        texte += nomParfait + " va maintenant vérifier, en regardant droit dans votre âme, que vous avez renoncé à l'orgueil et à la violence. ";


        const resTestHumble:ResultatTest = testVertu(perso, Vertu.humble, 20);
        texte += resTestHumble.resume;
        const resTestPlacide:ResultatTest = testVertu(perso, Vertu.placide, 20);
        texte += resTestPlacide.resume;
        if (resTestHumble.reussi) {
            nbSucces += 1;
        }
        if (resTestPlacide.reussi) {
            nbSucces += 1;
        }
        if (nbSucces === 1) {
            reussi = true;
            texte += "Vous n'êtes pas le plus pur qui soit mais vos efforts sont louables et remarquables et " + nomParfait
            + " vous juge digne de recevoir le consolamentum. ";
        } else if (nbSucces >= 2) {
            texte += "Vous avez été exemplaire. "
            + nomParfait + " vante votre dévotion et s'apprête à vous administrer le consolamentum.";
            texte += modifierReputationDansQuartier(perso, getQuartierDeCoterie(Coterie.cathares), 20, 10);
        }
    }

    if (reussi) {
        texte += "Le Parfait pose la bible, sur votre tête. Des hologrammes de colombes s’échappent du livre, symbolisant l’Esprit-Saint. L’officiant murmure : « Renonce à la chair corrompue, à la machine et au mensonge. » "
        +"Les yeux fermés, vous sentez une puce RFID s’implanter dans votre nuque, scellant votre allégeance à la communauté des Purs.<br/>" +
            "Des chants grégoriens remixés en beats électroniques résonnent. <br/>";
        texte += "Vous êtes maintenant un cathare à part entière. <br/>";
        texte += changerQuartier(perso, getQuartierDeCoterie(Coterie.cathares), false);
    } else {
        // échec. Réessai ??
        const nbJours:number = 10 + getRandomInt(20);
        texte += "Vous avez échoué. " + nomParfait + " ne vous a pas jugé assez pire. "
        + "Vous allez devoir reprendre votre période d'ascèse jusqu'à être digne du catharisme. ";

        const affinite = calculerAffinite(perso, Coterie.cathares);
        const resTestVolonte:ResultatTest = testComp(perso, {comp: TypeCompetence.volonte, bonusMalus: affinite});
        texte += resTestVolonte.resume;

        if (affinite >= SEUIL_AFFINITE && resTestVolonte.reussi) {
            perso.evtsProgrammes.push({
                date: (persoFutur:Perso) => perso.date + nbJours === persoFutur.date,
                evt: {
                    id: "testDEntreeCathare",
                    image: () => "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/coteries/cathares/int%C3%A9rieur%20%C3%A9glise.jpg",
                    description: testDEntreeCathare,
                }
            });
        } else {
            texte += "Mais vous ne supportez plus des tests et ces privations. Vous préférez abandonner. ";
            texte += rejointCoterie(perso, undefined);
        }
    }
    return new Promise((resolve) => resolve(texte))
}

/**
 * techniquement le perso devient immédiatement cathare mais il l'est en fait "à l'essai"
 * Si il échoue aux épreuves il sera viré d'office
 * @param perso
 */
export function rejoindreCathares(perso: PersoCommon): string {
    let texte: string = "";

    const nbJours:number = 15 + getRandomInt(40);
    texte += "Pour devenir cathare vous allez maintenant devoir passer par une longue période de réflexion et d'ascèse de " + nbJours + " jours après laquelle un parfait jugera de si vous êtes digne d'être initié. ";
    const effet: EffectDeCoterieSurPerso = getEffetsDeCoterieSurCompetences(Coterie.cathares);
    texte += effetDeBaseEnRejoignantUneCoterie(effet, perso);
    perso.evtsProgrammes.push({
        date: (persoFutur:Perso) => perso.date + nbJours === persoFutur.date,
        evt: {
            id: "testDEntreeCathare",
            image: () => "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/coteries/cathares/int%C3%A9rieur%20%C3%A9glise.jpg",
            description: testDEntreeCathare,
        }
    });
    return texte;
}
