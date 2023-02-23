import { getContext as getContextOriginal, hasContext, setContext } from "svelte";
import { writable } from "svelte/store";

export const useContext = <T>(key: string, defaultValue: T = null) => hasContext(key) ? 
    getContextOriginal<WWritable<T>>(key) : 
        setContext<WWritable<T>>(key, writable(defaultValue));

export const getContext = <T>(key: string): WWritable<T> => getContextOriginal(key);
