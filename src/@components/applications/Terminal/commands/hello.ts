import { get } from "svelte/store";

export const match: CommandMatcher = command => get<string>(command).startsWith('hello ');

export default ((
    command, commandHistory, 
    result, resultHistory
) => {
    commandHistory.update((v: string[]) => [
        ...v, 
        get(command)
    ]);
    
    result.set([
        `Salut ${get<string>(command).replace('hello ', '')} !`
    ]);
    
    resultHistory.update((v: string[]) => [
        ...v, 
        get(result)
    ]);
}) as Command