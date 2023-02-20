import { get, writable } from "svelte/store";
import {v4 as uuidv4} from 'uuid';

const tidyWindowList = writable<
    Record<string, {
        component: ConstructorOfATypedSvelteComponent,
        data: Partial<{
            title: string,
            logo: string
        }>
    }>
>({});

const tidy = (tidyWindow: ConstructorOfATypedSvelteComponent, data: Record<string, any>) => {
    const id = uuidv4();
    tidyWindowList.update(v => ({
        ...v, 
        [id]: {
            component: tidyWindow,
            data
        }
    }));
    return id;
};
const upset = (id: string) => {
    tidyWindowList.update(v => Object.keys(v).filter(_v => _v !== id).reduce((r, c) => ({
        ...r,
        [c]: v[c]
    }), {}));
};

export const useTidyWindows = (id?: string) => ({
    tidy,
    upset,
    list: tidyWindowList,
    current: (id ? get(tidyWindowList)[id] : undefined)
});