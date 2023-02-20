import { getContext as getContextOriginal, hasContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export const useContext = <T>(key: string, defaultValue: T = null) => hasContext(key) ? 
    getContextOriginal<Writable<T>>(key) : 
        setContext<Writable<T>>(key, writable(defaultValue));

export const getContext = <T>(key: string): Writable<T> => getContextOriginal(key);
