import { get, writable } from "svelte/store";

const tidyWindowList = writable<
    Record<number, {
        component: ConstructorOfATypedSvelteComponent,
        data: Partial<{
            title: string,
            logo: string | ConstructorOfATypedSvelteComponent
        }>
    }>
>({});

const tidy = (
    id: number,
    tidyWindow: ConstructorOfATypedSvelteComponent, 
    data: Record<string, any>
) => {
    tidyWindowList.update(v => ({
        ...v, 
        [id]: {
            component: tidyWindow,
            data
        }
    }));
};

const upset = (id: number) => {
    tidyWindowList.update(v => {
        const keys = Object.keys(v).map(_v => parseInt(_v));
        return keys.filter(_v => _v !== id).reduce((r, c) => ({
            ...r,
            [c]: v[c]
        }), {})
    });
};

export const useTidyWindows = (id?: number) => ({
    tidy, upset,
    list: tidyWindowList,
    current: (id ? get(tidyWindowList)[id] : undefined)
});