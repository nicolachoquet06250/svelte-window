import { get } from "svelte/store";
import { createCommand, createCommandMatcher } from "../createCommand";

export const match = createCommandMatcher(command => get<string>(command).startsWith('hello '));

export default createCommand((command, result, resultHistory) => {
    result.set([
        `Salut ${get<string>(command).replace('hello ', '')} !`
    ]);
    
    resultHistory.update((v: string[]) => [
        ...v, 
        get(result)
    ]);

    return true;
})