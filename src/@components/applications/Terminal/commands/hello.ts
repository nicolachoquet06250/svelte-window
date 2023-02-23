import { get } from "svelte/store";
import type { Command, CommandMatcher } from "../composables";

export const match: CommandMatcher = command => get(command).startsWith('hello ');

export default ((
    command, commandHistory, 
    result, resultHistory,
    reset = () => {}
) => {
    commandHistory.update(v => [
        ...v, 
        get(command)
    ]);
    
    result.set([
        `Salut ${get(command).replace('hello ', '')} !`
    ]);
    
    resultHistory.update(v => [
        ...v, 
        get(result)
    ]);
    
    reset();
}) as Command