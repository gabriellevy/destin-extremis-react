import {GroupeEvts} from "../../../../types/Evt";
import {NiveauIA, Perso} from "../../../../types/perso/Perso";
import {ajouterVertuVal, getValeurVertu, Vertu} from "../../../../types/ViceVertu";
import {appelLeChatParaphrase} from "../../../../fonctions/le_chat";
import {Coterie} from "../../../../types/Coterie";

export const evts_cathares: GroupeEvts = {
    evts: [
        {
            id: "evts_cathares1 soupe populaire",
            description: async (perso: Perso): Promise<string> => {
                let texte:string = "Hui vous servez la soupe populaire dans un refuge de SDF. ";

                if (Math.random() < 0.4) {
                    texte += "Vos appréciez de plus en plus d'aider les gens dans le besoin. ";
                    texte += ajouterVertuVal(perso, Vertu.altruiste, 1);
                }

                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte;
            },
            repetable: true,
            conditions: (perso: Perso): boolean => perso.coterie === Coterie.cathares && getValeurVertu(perso, Vertu.altruiste) < 3,
        },
    ],
    probaParDefaut: 10, // un peu > à la moyenne car spécifique à une coterie
};