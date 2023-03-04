import type { CommandStore, GetFlag, SetFlagCb } from "svelte-window";
import { get, writable } from "svelte/store";

const matchRegex = (str: string, regex: RegExp): string[][] => {
    let m: RegExpExecArray;

    const arr = [];
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        const sarr = [];
        m.forEach((match) => {
            sarr.push(match);
        });
        arr.push(sarr);
    }

    return arr;
};

const getFlag: GetFlag = command => {
    const commandMatch = matchRegex(
        get(command), 
        /ls ([\-a-zA-Z= ]+)/gm
    )[0];

    commandMatch?.shift();
    
    return matchRegex(
        commandMatch?.[0] ?? '', 
        /((-|--)([a-zA-Z=]+))/gm
    ).map(v => v[0]).reduce((r, c) => ({ 
        ...r,
        [c.split('=')[0]]: (c.split('=')[1] ?? true)
    }), {});
};

const flags = writable<Record<string, SetFlagCb>>({});

export const setFlag = (flag: string, func: SetFlagCb) => {
    flags.update(v => ({
        ...v, 
        [flag]: func
    }))
};

export const setWithoutFlag = (func: SetFlagCb) => {
    flags.update(v => ({
        ...v,
        not: func
    }))
};

export const executeFlags = (command: CommandStore) => {
    const _flags = getFlag(command);
    const f = get(flags);

    for (const k in get(flags)) {
        if (k !== '') {
            if (`-${k}` in _flags) {
                return f[k](_flags[`-${k}`]);
            }
        }
    }

    return f.not(true);
};