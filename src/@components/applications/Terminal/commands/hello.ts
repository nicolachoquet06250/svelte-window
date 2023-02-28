import { get } from "svelte/store";
import { createCommand, createCommandMatcher } from "../createCommand";

export const match = createCommandMatcher(({ command }) => get<string>(command).startsWith('hello '));

export default createCommand(({ command, result }) => {
    result.set([`Salut ${get<string>(command).replace('hello ', '')} !`]);

    return true;
})