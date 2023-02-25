import { useEventListener } from "@svelte-use/core";
import { derived, get, writable } from "svelte/store";
import { useWrite, WRITE_MODE } from "./useWrite";
import commandMatcher from "../commands";

export const useCommands = (
    focused: FocusedStore, 
    onEnterMiddleware: (w?: CommandStore, r?: EscapedCommandStore) => void = () => {}
) => {
    const onValidated: Middleware<void> = (command, escapedCommand) => {
        onEnterMiddleware(command, escapedCommand);

        if (get(i) > -1) {
            command.set(get(_command))
        }

        commandMatcher(
            command, 
            escapedCommand, 
            commandHistory, 
            result, 
            resultHistory, 
            reset
        );
        
        i.set(-1);
    };

    const onLetter: Middleware<void> = (_, __, e: KeyboardEvent) => {
        if ([...'abcdefghijklmnopqrstuvwxyz '.split(''), 'Backspace'].includes(e.key)) {
            if (get(i) > -1) {
                init(get(_command));
                i.set(-1);
            }
        }
    };

    const { 
        command, escapedCommand, 
        reset, init
    } = useWrite(
        WRITE_MODE.KEYBOARD, 
        'command', focused,
        onValidated, onLetter
    );

    const i = writable(-1);

    const result = writable([]);
    const resultHistory = writable<string[][]>([]);

    const commandHistory = writable([]);
    const escapedCommandHistory = derived(
        commandHistory, 
        $ch => $ch.map($c => $c.replaceAll(/ /g, '&nbsp;'))
    );

    const reversedCommandHistory = derived(
        commandHistory, 
        $ch => [...$ch].reverse()
    );
    const reversedEscapedCommandHistory = derived(
        escapedCommandHistory, 
        $ech => [...$ech].reverse()
    );

    const _command = derived(
        [i, reversedCommandHistory, command], 
        ([i, reversedCommandHistory, command]) => 
            i === -1 ? command : reversedCommandHistory[i]);
    const _escapedCommand = derived(
        [i, reversedEscapedCommandHistory, escapedCommand], 
        ([i, reversedEscapedCommandHistory, escapedCommand]) => 
            i === -1 ? (escapedCommand ?? '') : reversedEscapedCommandHistory[i]);

    useEventListener('keydown', e => {
        (keyDownActions => e.key in keyDownActions && keyDownActions[e.key]())({
            ArrowUp: () => get(i) < get(commandHistory).length - 1 && 
                i.update(i => ++i),
            ArrowDown: () => get(i) > -1 && i.update(i => --i)
        });
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