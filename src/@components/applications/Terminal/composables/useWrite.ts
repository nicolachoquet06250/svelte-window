import { useEventListener } from "@svelte-use/core";
import { derived, get, writable, type Readable, type Writable } from "svelte/store";

export enum WRITE_MODE {
    KEYBOARD = 1,
    PROGRAMATIC = 2
};

type FirstLetterOf<
    S extends string
> = S extends `${infer FL}${string}` ? FL : S;
type UCFirst<
    S extends string
> = S extends `${FirstLetterOf<S>}${infer Rest}` 
    ? `${Uppercase<FirstLetterOf<S>>}${Lowercase<Rest>}` : S;

type Store<S extends string> = 
    { [key in S]: Writable<string> } & 
    { [key in `escaped${`${UCFirst<S>}`}`]: Readable<string> } & 
    { reset: ResetFunc }

type ResetFunc = () => void;
type SetFunc = (s: string) => void;

type ReturnTypes<S extends string> = {
    [WRITE_MODE.KEYBOARD]: Store<S>,
    [WRITE_MODE.PROGRAMATIC]: Store<S> & { set: SetFunc }
};

type ReturnType<
    T extends WRITE_MODE,
    S extends string
> = ReturnTypes<S>[T];

type Return<T, S extends string> = 
    T extends WRITE_MODE.KEYBOARD ? 
        ReturnType<WRITE_MODE.KEYBOARD, S> : 
            ReturnType<WRITE_MODE.PROGRAMATIC, S>

const reset = (command: Writable<string>): ResetFunc => 
    () => command.set('');
const set = (command: Writable<string>): SetFunc => 
    (s: string) => command.set(s);

export const useWrite = <
    T extends WRITE_MODE,
    C extends string
>(
    mode: T, 
    key: C, 
    focused: Writable<boolean>
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
            get(focused) && command.update(c => c + e.key)
        });

        useEventListener('keydown', e => {
            get(focused) && e.key === 'Backspace' 
                && command.update(c => c.substring(0, c.length - 1));
        });
    })();

    let r = {
        [key]: command,
        [escapedKey]: escapedCommand,
        reset: reset(command)
    } as Return<T, C>;

    (mode === WRITE_MODE.PROGRAMATIC) && (r = { ...r, set: set(command) });

    return r;
};