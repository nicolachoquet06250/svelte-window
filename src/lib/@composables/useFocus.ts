import { get, writable } from "svelte/store";

export const windowList = writable<string[]>([]);
export const focusedWindow = writable<string>();

const focus = (title: string) => {
    const oldWindowList = [ ...get(windowList) ];
    const newWindowList = [];

    const currentIndex = get(windowList).indexOf(title);
    const nextCurrentIndex = Array.from(
        oldWindowList.keys()
    ).reduce((r, c) => c > r ? c : r, 0);

    // avant l'index à bouger
    for (let i = 0; i <= currentIndex - 1; i++) {
        newWindowList.push(oldWindowList[i]);
    }

    // apres l'index à bouger
    for (let i = currentIndex + 1; i <= nextCurrentIndex; i++) {
        newWindowList.push(oldWindowList[i]);
    }

    // l'index à bouger
    newWindowList.push(title);

    windowList.set(newWindowList);
};

const prepareWindow = (title: string) => {
    windowList.update(v => [...v, title])
};

const unprepareWindow = (title: string) => {
    windowList.update(v => v.filter(_v => _v !== title));
};

export const useFocus = () => ({
    focus, 
    prepareWindow, 
    unprepareWindow,
    list: windowList
});