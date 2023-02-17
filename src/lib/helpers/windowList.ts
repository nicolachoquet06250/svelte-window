import { get, writable } from "svelte/store";

export const windowList = writable<Record<string, number>>({});
export const focusedWindow = writable<string>();

export const addWindow = (index: number, title: string) => {
    windowList.update(v => ({ ...v, [title]: index }));
};

export const removeWindow = (title: string) => {
    windowList.update(v => Object.keys(v)
        .filter(k => k !== title)
        .reduce((r, k) => ({
            ...r,
            [k]: v[k]
        }), {})
    );
};

export const focusWindow = (title: string) => {
    setTimeout(() => {
        let list = {};
        windowList.subscribe(v => (list = v));

        const maxIndex = Object.keys(list)
            .reduce((r, k) => list[k] > r ? list[k] : r, 0);

        windowList.update(v => ({
            ...v,
            [title]: maxIndex
        }));
        windowList.update(v => Object.keys(v)
            .reduce((r, k) => ({
                ...r, 
                [k]: (k === title ? v[k] : (v[k] === 1 ? v[k] : v[k] - 1))
            }), {})
        );
    }, 0);
    
    focusedWindow.set(title);
};

export const defineInitialFocusedWindow = (title: string) => {
    setTimeout(() => {
        let list = {};
        windowList.subscribe(v => (list = v));

        focusedWindow.set(list[title]);
    }, 0);
};

export const getWindowList = () => windowList;

export const getFocusedWindow = () => focusedWindow;