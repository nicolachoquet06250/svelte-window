import { get } from "svelte/store";

export const match: CommandMatcher = command => get<string>(command).trim() === 'clear'

export default ((
    command, commandHistory, 
    result, resultHistory
) => {
    commandHistory.update((v: string[]) => [
        ...v, 
        get(command)
    ]);
    resultHistory.set([]);
    result.set([]);
}) as Command