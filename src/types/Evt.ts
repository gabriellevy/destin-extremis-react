import {EvtNonRexecutableTemporairement, Perso, PersoHisto} from "./perso/Perso";

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
    // l'image affichée dépend éventuellement du perso
    // dans la pratique, comme l'image est déterminée après l'exécution de la description, cela signifie que le perso a déjà été modifié par la description
    image?: (perso: PersoHisto) => string;
    // nombe de jours qui doivent s'écouler pour que cet événement se joue une nouvelle fois
    // 0 (ou <0) signifie que l'evt peut ne peut jamais se répéter. undefined est équivalent à 0
    // pour un événement qui peut se répéter sans limitation, mettre cette valeur à 1
    nbJoursEntreOccurences?: number;
};

// ce qui est affiché après que l'événement ait été exécuté
export type EvtExecute = {
    id: string;
    joursDepuisDernierEvt: number,
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
        .filter((evt:Evt) => !perso.evtsNonRexecutablesTemporairement.find((evtNonReexecutable:EvtNonRexecutableTemporairement) =>
            evtNonReexecutable.id === evt.id))
        .map(evt => {
            if (!evt.proba) {
                evt.proba = probaParDefaut;
            }
            return evt;
        })
}