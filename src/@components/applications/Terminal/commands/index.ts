import hello, { match as matchHello } from './hello';
import clear, { match as matchClear } from './clear';
import commandNotFound from './commandNotFound';

const commands = (map => {
    map.set(matchHello, hello);
    map.set(matchClear, clear);

    return map;
})(new Map<CommandMatcher, Command>());

export default (
    command: CommandStore, 
    escapedCommand: EscapedCommandStore,
    commandHistory: ArrayStore<string>, 
    result: ArrayStore<string>, 
    resultHistory: MatrixStore<string>, 
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
