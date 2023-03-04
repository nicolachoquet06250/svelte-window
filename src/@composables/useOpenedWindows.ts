import type { WindowItem, Windows } from "@svelte/window";
import { writable } from "svelte/store";

const windows = writable<Windows>([]);

export const useOpenedWindows = () => {
    return {
        windows,
        init(_windows: Windows) {
            windows.set(_windows.map((w, i) => ({
                ...w,
                id: w.id ?? Date.now() + i
            })));
        },
        add(window: WindowItem) {
            windows.update(v => [...v, {
                ...window,
                id: window.id ?? Date.now()
            }]);
        },
        remove(id: number) {
            windows.update(v => v.filter(_v => _v.id !== id));
        }
    };
};