import './App.css'
import Main from "./Pages/Main";
import PersoContexteProvider from "./contexte/PersoContexte";
import {CssBaseline} from "@mui/material";
import { Mistral } from '@mistralai/mistralai';
import {Perso} from "./types/perso/Perso";

export const apiKey: string = "CJfRR1Dc8PSxmeF5oDtYt9iVDfrBlJrk";

export const client = new Mistral({apiKey: apiKey});

export async function appelLeChat(perso: Perso, prompt: string): Promise<string> {
    let finalPrompt = prompt;
    finalPrompt += " Le personnage principal est " + perso.prenom + " " + perso.nom + ". ";
    finalPrompt += " Écrivez à la dexième personne du pluriel comme si vous vous adressiez à lui en le vouvoyant. ";
    finalPrompt += " Écris cela en 100 mots maximum."
    const chatResponse = await client.chat.complete({
        model: "codestral-2405",
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
