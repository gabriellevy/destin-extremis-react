import {GroupeEvts} from "../../types/Evt";

export const evts_tout: GroupeEvts = {
    evts: [
        {
            id: "evts_tout1",
            description: (): string => "Marienburg semble être l'endroit idéal pour les négociants en ce moment. "
            +"Les affaires sont en plein essort et devraient encore aller croissantes dans les mois à venir. "
            +"Le port fonctionne presque à pleine capacité et les commandes de céréales de Bordeleaux atteignent un niveau record. ",
            conditions: (): boolean => true,
        },
        ],
    probaParDefaut: 1,
}