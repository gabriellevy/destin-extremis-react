import './App.css'
import Main from "./Pages/Main";
import PersoContexteProvider from "./contexte/PersoContexte";
import {CssBaseline} from "@mui/material";
import { Mistral } from '@mistralai/mistralai';
import {Perso} from "./types/perso/Perso";
import {ChatCompletionResponse} from "@mistralai/mistralai/models/components";

export const apiKey: string = "CJfRR1Dc8PSxmeF5oDtYt9iVDfrBlJrk";

export const client = new Mistral({apiKey: apiKey});

export async function appelLeChat(perso: Perso, prompt: string): Promise<string> {
    let finalPrompt = prompt;
    finalPrompt += " Le personnage principal est " + perso.prenom + " " + perso.nom + ". ";
    finalPrompt += " Écrivez à la deuxième personne du pluriel comme si vous vous adressiez à lui en le vouvoyant. ";
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
