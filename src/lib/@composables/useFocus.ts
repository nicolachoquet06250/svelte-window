import { get, writable } from "svelte/store";

export const windowList = writable<number[]>([]);

const focus = (id: number) => {
    const oldWindowList = [ ...get(windowList) ];
    const newWindowList = [];

    const currentIndex = get(windowList).indexOf(id);
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
    newWindowList.push(id);

    windowList.set(newWindowList);
};

const prepareWindow = (id: number) => {
    windowList.update(v => [...v, id])
};

const unprepareWindow = (id: number) => {
    windowList.update(v => v.filter(_v => _v !== id));
};

export const useFocus = () => ({
    focus, 
    prepareWindow, 
    unprepareWindow,
    list: windowList
});