import { useEventListener } from "@svelte-use/core";
import { derived, get, writable, type Readable, type Writable } from "svelte/store";
import { useWrite, WRITE_MODE } from "./useWrite";

const hello = (
    command: Writable<string>,
    commandHistory: Writable<string[]>, 
    result: Writable<string[]>, 
    resultHistory: Writable<string[][]>,
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
}

const clear = (
    command: Writable<string>,
    commandHistory: Writable<string[]>, 
    result: Writable<string[]>, 
    resultHistory: Writable<string[][]>,
    reset = () => {}
) => {
    commandHistory.update(v => [
        ...v, 
        get(command)
    ]);
    resultHistory.set([]);
    result.set([]);
    reset();
}

export const useCommands = (
    focused: Writable<boolean>, 
    onEnterMiddleware: (w?: Writable<string>, r?: Readable<string>) => void = () => {}
) => {
    const { 
        command,
        escapedCommand, 
        reset, 
        init
    } = useWrite(
        WRITE_MODE.KEYBOARD, 
        'command', 
        focused,
        (command, escapedCommand) => {
            onEnterMiddleware(command, escapedCommand);

            if (get(command).startsWith('hello ')) {
                hello(
                    command, 
                    commandHistory, 
                    result, 
                    resultHistory, 
                    reset
                );
            }
            if (get(command).trim() === 'clear') {
                clear(
                    command, 
                    commandHistory, 
                    result, 
                    resultHistory, 
                    reset
                );
            }
        },
        () => {
            if (get(i) > -1) {
                init(get(_command));
                i.set(-1);
            }
        }
    );
    const result = writable([]);
    const resultHistory = writable<string[][]>([]);

    const commandHistory = writable([]);
    const escapedCommandHistory = derived(
        commandHistory, 
        commandHistory => commandHistory
            .map($c => $c.replaceAll(/ /g, '&nbsp;'))
    );

    const i = writable(-1);

    const _command = derived(
        [i, commandHistory, command], 
        ([i, commandHistory, command]) => 
            i === -1 ? command : commandHistory.reverse()[i]);
    const _escapedCommand = derived(
        [i, escapedCommandHistory, escapedCommand], 
        ([i, escapedCommandHistory, escapedCommand]) => 
            i === -1 ? (escapedCommand ?? '') : escapedCommandHistory.reverse()[i]);

    useEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                get(i) < get(commandHistory).length - 1 && 
                    i.update(i => ++i);
                break;
            case 'ArrowDown':
                get(i) > -1 && 
                    i.update(i => --i);
                break;
            default:
                break;
        }
    });

    return {
        current: _command,
        currentEscaped: _escapedCommand,
        command: escapedCommand,
        resultHistory,
        commandHistory,
        init
    }
};