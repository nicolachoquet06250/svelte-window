import { useEventListener } from "@svelte-use/core";
import { derived, get, writable } from "svelte/store";

/* Définition de l'enum */

export enum WRITE_MODE {
    KEYBOARD = 1,
    PROGRAMATIC = 2
};

/* Définition des fonctions */

const reset = (command: CommandStore): ResetFunc => 
    () => command.set('');
const set = (command: CommandStore): SetFunc => 
    (s: string) => command.set(s);

export const useWrite = <
    T extends WRITE_MODE,
    C extends string
>(
    mode: T, key: C, 
    focused: FocusedStore,
    onValidated: ManualMiddleware<void> = () => {},
    onLetter: Middleware<any> = () => {}
): Return<T, C> => {
    const escapedKey = `escaped${key.substring(0, 1)
        .toUpperCase()}${key.substring(1, key.length)
            .toLowerCase()}` as `escaped${UCFirst<C>}`;

    const command = writable('');
    const escapedCommand = derived(
        command, 
        $c => $c.replaceAll(/ /g, '&nbsp;')
    );

    (mode === WRITE_MODE.KEYBOARD) && (() => {
        useEventListener('keypress', e => {
            get(focused) && (() => {
                if (e.key === 'Enter') {
                    onValidated(command, escapedCommand);
                    return;
                }
                const r = onLetter(command, escapedCommand, e);
                if (r) return r;
                command.update(c => c + e.key)
            })()
        });

        useEventListener('keydown', e => {
            if (get(focused) && e.key === 'Backspace') {
                onLetter(command, escapedCommand, e)
                command.update(c => c.substring(0, c.length - 1));
            }
        });
    })();

    let r = {
        [key]: command,
        [escapedKey]: escapedCommand,
        reset: reset(command),
        init: set(command)
    } as Return<T, C>;

    (mode === WRITE_MODE.PROGRAMATIC) && (r = { ...r, set: set(command) });

    return r;
};