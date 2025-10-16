import {Perso, PersoHisto} from "./perso/Perso";

export type EvtProgramme = {
    evt: Evt,
    // date en nombre de jours depuis (l'an 0 ?)
    // sous forme de fonction car certaines dates dépendent du perso, comme son anniversaire
    date: (perso: Perso) => boolean,
}

export type Evt = {
    id: string;
    description: (perso: PersoHisto) => Promise<string>;  // modifie le perso et retourne la description de l'evt
    proba?: number, // élevé signifie, si les conditions sont remplies, que cet événement a beaucoup de chance de se produire. 1 est standard plutôt courant, donc valeur par défaut
    conditions?: (perso: Perso) => boolean; // est-ce que l'événement peut être appliqué au perso ou pas
    image?: string;
    repetable?: boolean; // true => exécutables plusieurs fois (y compris d'affilée) (undefined means false)
};

// ce qui est affiché après que l'événement ait été exécuté
export type EvtExecute = {
    id: string;
    dateStr: string,
    texteFinal: string,
    image?: string;
}

export type GroupeEvts = {
    evts: Evt[];
    probaParDefaut: number;
}

export function filtrerEtPreparerEvts(groupeEvts:GroupeEvts, perso: Perso):Evt[] {
    const probaParDefaut: number = groupeEvts.probaParDefaut;
    return groupeEvts.evts
        .filter((evt:Evt) => !evt.conditions || evt.conditions(perso))
        .filter((evt:Evt) => !perso.idEvtsNonExecutables.includes(evt.id))
        .map(evt => {
            if (!evt.proba) {
                evt.proba = probaParDefaut;
            }
            return evt;
        })
}