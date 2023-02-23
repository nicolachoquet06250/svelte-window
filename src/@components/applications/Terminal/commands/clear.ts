import { get } from "svelte/store";
import type { Command, CommandMatcher } from "../composables";

export const match: CommandMatcher = command => get(command).trim() === 'clear'

export default ((
    command, commandHistory, 
    result, resultHistory,
    reset = () => {}
) => {
    commandHistory.update(v => [
        ...v, 
        get(command)
    ]);
    resultHistory.set([]);
    result.set([]);
    reset();
}) as Command