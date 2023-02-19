import { writable } from "svelte/store";

export const windowList = writable<string[]>([]);
export const focusedWindow = writable<string>();

windowList.subscribe(v => {
    console.log(v);
})