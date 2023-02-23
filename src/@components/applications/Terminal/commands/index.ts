import hello, { match as matchHello } from './hello';
import clear, { match as matchClear } from './clear';
import commandNotFound from './commandNotFound';
import type { Command, CommandMatcher, ResetFunc } from '../composables';
import type { Readable, Writable } from 'svelte/store';

const commands = (map => {
    map.set(matchHello, hello);
    map.set(matchClear, clear);

    return map;
})(new Map<CommandMatcher, Command>());

export default (
    command: Writable<string>, 
    escapedCommand: Readable<string>,
    commandHistory: Writable<string[]>, 
    result: Writable<string[]>, 
    resultHistory: Writable<string[][]>, 
    reset: ResetFunc
) => {
    const commandsEntries = commands.entries();
    let matched = false;
    for (const [match, commandFn] of commandsEntries) {
        if (match(command, escapedCommand)) {
            commandFn(
                command, commandHistory, 
                result, resultHistory, 
                reset
            );
            matched = true;
            break;
        }
    }

    !matched && commandNotFound(
        command, 
        commandHistory, 
        result, 
        resultHistory, 
        reset
    );
}
