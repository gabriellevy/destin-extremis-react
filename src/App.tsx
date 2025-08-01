import './App.css'
import Main from "./Pages/Main";
import PersoContexteProvider from "./contexte/PersoContexte";
import {CssBaseline} from "@mui/material";
import { Mistral } from '@mistralai/mistralai';
import {Perso} from "./types/perso/Perso";
import {ChatCompletionResponse} from "@mistralai/mistralai/models/components";
import {descriptionQuartier} from "./donnees/geographie/quartiers";
import {getCarriereActive} from "./types/metiers/metiersUtils";

export const apiKey: string = "CJfRR1Dc8PSxmeF5oDtYt9iVDfrBlJrk";

export const client = new Mistral({apiKey: apiKey});

export enum NiveauInfosPerso {
    rien,
    prenom,
    patronyme,
    plus_quartier_de_vie,
    plus_metier,
}

export async function appelLeChat(perso: Perso,
                                  prompt: string,
                                  niveauInfosPerso: NiveauInfosPerso
): Promise<string> {
    let finalPrompt = prompt;
    if (niveauInfosPerso >= NiveauInfosPerso.patronyme) {
        finalPrompt += " Le personnage principal est " + perso.prenom + " " + perso.nom + ". ";
    }
    finalPrompt += " Écrivez à la deuxième personne du pluriel comme si vous vous adressiez au personnage principal en le vouvoyant. ";
    if (niveauInfosPerso >= NiveauInfosPerso.plus_quartier_de_vie && perso.lieu.quartier != null) {
        finalPrompt += "La scène se passe dans le quartier de " + perso.lieu.quartier + " décrit ainsi : " + descriptionQuartier(perso.lieu.quartier) + ".";
    }
    if (niveauInfosPerso >= NiveauInfosPerso.plus_metier && getCarriereActive(perso)) {
        finalPrompt += "La scène concerne le métier du personnage principal qui est " + getCarriereActive(perso) + ".";
    }
    finalPrompt += " Écrivez cela en 100 mots maximum."
    const chatResponse:ChatCompletionResponse = await client.chat.complete({
        model: "codestral-2405",
        temperature: 0.6,// 0 à 0.7 (+=+random)
        messages: [{role: 'user', content:finalPrompt }]
    });

    return chatResponse.choices?.[0]?.message?.content?.toString() ?? "pas de réponse";
}

function App() {

    return (
        <PersoContexteProvider>
            <CssBaseline />
            <Main />
        </PersoContexteProvider>
    )
}

export default App
