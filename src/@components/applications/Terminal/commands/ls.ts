import { get } from "svelte/store";
import { createCommand, createCommandMatcher } from "../createCommand";

export const match = createCommandMatcher((command) => get<string>(command).startsWith('ls'));

export default createCommand(() => {
    console.log('ls');
});