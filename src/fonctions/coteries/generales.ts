import {PersoCommon} from "../../types/perso/Perso";
import {TypeCompetence} from "../../types/perso/comps/Comps";
import {getEffetsDeCoterieSurCompetences} from "../../donnees/coteries/EffetsDesCoteriesSurPerso";
import {rejoindreOrks} from "../../donnees/coteries/orks/donnees_orks";
import {Coterie, EffectDeCoterieSurPerso} from "../../types/Coterie";
import {augmenterCompetence} from "../perso/competences";

export function effetDeBaseEnRejoignantUneCoterie(effet: EffectDeCoterieSurPerso, perso: PersoCommon): string {
    let texte: string = "";
    effet.plus10Values.forEach((typeComp: TypeCompetence) =>
        texte += augmenterCompetence(perso, typeComp, 10)
    );
    effet.plus5Values.forEach((typeComp: TypeCompetence) =>
        texte += augmenterCompetence(perso, typeComp, 5)
    );
    effet.minus10Values.forEach((typeComp: TypeCompetence) =>
        texte += augmenterCompetence(perso, typeComp, -10)
    );
    effet.minus5Values.forEach((typeComp: TypeCompetence) =>
        texte += augmenterCompetence(perso, typeComp, -5)
    );
    return texte;
}

export function rejointCoterie( perso: PersoCommon, coterie: Coterie|undefined): string {
    const ancienneCoterie = perso.coterie;
    let texte: string = "";
    if (ancienneCoterie !== undefined) {
        // inverser effet de la coterie précédente (pour la quitter)
        const effetDepart: EffectDeCoterieSurPerso = getEffetsDeCoterieSurCompetences(ancienneCoterie);
        effetDepart.plus10Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, -10)
        );
        effetDepart.plus5Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, -5)
        );
        effetDepart.minus10Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, 10)
        );
        effetDepart.minus5Values.forEach((typeComp: TypeCompetence) =>
            texte += augmenterCompetence(perso, typeComp, 5)
        );

    }

    perso.coterie = coterie;
    if (coterie) {
        switch (coterie) {
            case Coterie.orks: {
                rejoindreOrks(perso);
            } break;
            default: {
                // effet standard : mieux vaut si possible faire des textes et effets plus spécifiques par coterie
                const effet: EffectDeCoterieSurPerso = getEffetsDeCoterieSurCompetences(coterie);
                texte = effetDeBaseEnRejoignantUneCoterie(effet, perso);
            }
        }
    }
    return texte;
}