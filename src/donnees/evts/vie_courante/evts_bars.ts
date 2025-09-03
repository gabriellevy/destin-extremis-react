import {GroupeEvts} from "../../../types/Evt";
import {Perso} from "../../../types/perso/Perso";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {ajouterViceVal, getValeurVertu, getValeurVice, Vertus, Vices} from "../../../types/ViceVertu";

export const evts_bars: GroupeEvts = {
    evts: [
        {
            id: "evts_bars1",
            description: (perso: Perso): Promise<string> => {
                let soireeFinie: boolean = false;
                let texte:string = "Vous allez boire un verre avec des amis. <br/>";
                // gloutonnerie
                if (getValeurVice(perso, Vices.gourmand) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += "Vous forcez un peu sur la boisson et y prenez goût. "
                        texte += ajouterViceVal(perso, Vices.gourmand, 1);
                    }
                }
                if (getValeurVice(perso, Vices.luxurieux) >= 1) {
                    if (Math.random() >= 0.5) {
                        texte += "Vous repérez une jolie femme tout à fait à votre goût. ";
                    }
                    const resTestCharme:ResultatTest = testComp(perso, {comp: TypeCompetence.charme, bonusMalus: -20});
                    texte += resTestCharme.resume;
                    if (resTestCharme.reussi) {
                        texte += "C'est réciproque, elle est vite sous votre charme et vous passez la nuit ensemble. <br/>";
                        soireeFinie = true;
                        // TODO : crac crac, petites amies, enceintes etc...
                    } else {
                        texte += "Mais ce n'est pas du tout réciproque. <br/>";
                    }
                }
                // bagarre
                if (!soireeFinie && getValeurVice(perso, Vices.colerique) >= 1 && Math.random() >= 0.9) {
                    texte += "Vous vous sentez d'humeur massacrante et cherchez la bagarre avec tous les types qui vous regardent de travers. "
                    const resTestBagarre:ResultatTest = testComp(perso, {comp: TypeCompetence.bagarre, bonusMalus: 0});
                    texte += resTestBagarre.resume;
                    // TODO : déterminer un perso au hasard ?
                    if (resTestBagarre.reussi) {
                        texte += "Vous finissez par vous battre avec un grand type aussi saoul que vous et le mettez au sol sous la rigolade de l'assistance. "
                            + "Vous vous sentez défoulé et passez ensuite une soirée plus calme. <br/>"
                        // TODO : si critique, arrêté par police ?
                    } else {
                        texte += "Finalement un type vous prend au mot et vous sonne d'un coup de bouteille. Vous passez le reste de a soirée à moitié assommé. <br/>";
                        if (resTestBagarre.critical) {
                            // TODO : blessure ?
                        }
                    }
                    soireeFinie = true;
                }
                return new Promise((resolve) => {
                    resolve(texte);
                });
            },
            conditions: (perso: Perso): boolean => getValeurVertu(perso, Vertus.sobre) <= 0 && perso.age >= 18,
        },
    ],
    probaParDefaut: 10,
};