import './App.css'
import Main from "./Pages/Main";
import PersoContexteProvider from "./contexte/PersoContexte";
import {CssBaseline} from "@mui/material";
import { Mistral } from '@mistralai/mistralai';

export const apiKey: string = "CJfRR1Dc8PSxmeF5oDtYt9iVDfrBlJrk";

export const client = new Mistral({apiKey: apiKey});

export async function appelLeChat(prompt: string): Promise<string> {
    const chatResponse = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [{role: 'user', content: prompt + " Écris cela en 70 mots maximum."}]
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
