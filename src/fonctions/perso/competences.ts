import {Perso, PersoCommon} from "../../types/perso/Perso";
import {Competence, ModificateurCompetence, seuils, TypeCompetence} from "../../types/perso/comps/Comps";
import {Drogue} from "../../types/sante/Drogue";
import {droguesEnum, droguesObjs} from "../../donnees/sante/drogues";

export function getValeurCompetence(perso: PersoCommon, typeComp: TypeCompetence): number {
    let valeurDeBase:number = perso.comps.find((comp: Competence) => comp.typeComp === typeComp)?.val || -1;
    perso.drogues.forEach((drogueEnum: droguesEnum) => {
        const drogue: Drogue = droguesObjs[drogueEnum];
        valeurDeBase += drogue.modifsCompetences.find((modifComp: ModificateurCompetence) => modifComp.typeComp === typeComp)?.val || 0;
    });
    return valeurDeBase;
}

export function getCompNbDeTestsFaits(perso: Perso, typeComp: TypeCompetence): number {
    return perso.comps.find((comp: Competence) => comp.typeComp === typeComp)?.nbDeTestsFaits || 0;
}

export function augmenterCompetence(perso: PersoCommon,typeComp: TypeCompetence, val: number): string {
    const comp: Competence | undefined = perso.comps.find((comp:Competence) => comp.typeComp === typeComp);
    if (comp !== undefined) {
        comp.val += val;
        return "<b>" + (val> 0 ? "+" : "") + val + " " + typeComp.toString() + "</b><br/>";
    } else {
        console.warn("Impossible de modifier la valeur de la compétence : " + typeComp + " de " + val);
    }
    return "Impossible de modifier la valeur de la compétence : " + typeComp + " de " + val;
}

export function augmenterNbDeTestsFaitsComp(perso: Perso, typeComp: TypeCompetence): string {
    const comp: Competence | undefined = perso.comps.find((comp:Competence) => comp.typeComp === typeComp);
    let texte: string = "";
    if (comp !== undefined) {
        const nbTests: number = comp.nbDeTestsFaits + 1;
        comp.nbDeTestsFaits = nbTests;
        if (seuils.includes(nbTests)) {
            // gain d'un point de compétence :
            if (comp) {
                comp.val += 1;
                texte = "<b>+1 en " + comp.typeComp.toString() + ". </b> ";
            }
        }
    }
    return texte;
}
