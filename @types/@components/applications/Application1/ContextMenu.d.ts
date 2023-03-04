declare module '@svelte/window' {
    export type ContextMenuActionOptions = Record<string, any>;
    
    export type ContextMenuActionContext = {
        component: SvelteComponentDev, 
        el: HTMLElement, 
        id: number, 
        style: WindowCssVars, 
        props: WindowProps, 
        position: {
            x: number,
            y: number
        }
    };

    export type ContextMenuAction = (options?: ContextMenuActionOptions, context?: ContextMenuActionContext) => void;

    export type KeyboardKey = 
    | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' 
    | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' 
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
    | '.' | '/' | ';' | ',' | '\\';

    export type ContextMenuItem = {
        label: string,
        shortcut?: Partial<{
            altKey: boolean,
            ctrlKey: boolean,
            metaKey: boolean,
            shiftKey: boolean,
            key: KeyboardKey
        }>,
        action: ContextMenuAction
    };

    export type ContextMenuItems = ContextMenuItem[];
}

declare module '@types/svelte-window' {
    export type ContextMenuActionOptions = Record<string, any>;
    
    export type ContextMenuActionContext = {
        component: SvelteComponentDev, 
        el: HTMLElement, 
        id: number, 
        style: WindowCssVars, 
        props: WindowProps, 
        position: {
            x: number,
            y: number
        }
    };

    export type ContextMenuAction = (options?: ContextMenuActionOptions, context?: ContextMenuActionContext) => void;

    export type KeyboardKey = 
    | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' 
    | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' 
    | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
    | '.' | '/' | ';' | ',' | '\\';

    export type ContextMenuItem = {
        label: string,
        shortcut?: Partial<{
            altKey: boolean,
            ctrlKey: boolean,
            metaKey: boolean,
            shiftKey: boolean,
            key: KeyboardKey
        }>,
        action: ContextMenuAction
    };

    export type ContextMenuItems = ContextMenuItem[];
}
