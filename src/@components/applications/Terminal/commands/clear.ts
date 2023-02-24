import { get } from "svelte/store";
import { createCommand, createCommandMatcher } from "../createCommand";

export const match = createCommandMatcher(command => get<string>(command).trim() === 'clear')

export default createCommand((command, result, resultHistory) => {
    resultHistory.set([]);
    result.set([]);

    return true;
})