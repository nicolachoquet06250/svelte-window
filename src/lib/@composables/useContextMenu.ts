import { get, writable } from "svelte/store";
import { get_current_component, onMount, SvelteComponentDev } from "svelte/internal"
import type { ContextMenuActionOptions, ContextMenuItems, ContextMenuState, WindowCssVars, WindowProps } from "@svelte/window";

export const useContextMenu = (items: ContextMenuItems) => {
    const contextMenuState: ContextMenuState = writable(false);
    const x = writable(0);
    const y = writable(0);

    const open = () => contextMenuState.set(true);
    const close = () => contextMenuState.set(false);
    const toggle = () => contextMenuState.set(!get(contextMenuState));

    let el: HTMLElement;
    let id: number;
    let style: WindowCssVars = {};
    let props: WindowProps = {};
    let positionX: number;
    let positionY: number;

    const handleOpenContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        open();
        x.set(e.offsetX);
        y.set(e.offsetY);
    };
    const handleCloseContextMenu = () => {
        if (get(contextMenuState)) {
            close();
            x.set(0);
            y.set(0);
        }
    };

    const currentComponent: SvelteComponentDev = get_current_component();
    onMount(() => {
        [el, id, style, props, positionX, positionY] = currentComponent.$$.ctx;
        el.addEventListener('contextmenu', handleOpenContextMenu);
        el.addEventListener('click', handleCloseContextMenu);
        
        return () => {
            el.removeEventListener('contextmenu', handleOpenContextMenu);
            el.removeEventListener('click', handleCloseContextMenu);
        }
    });

    return { 
        opened: contextMenuState, 
        contextMenuItems: items.map(i => ({
            ...i,
            action: (options: ContextMenuActionOptions = {}) => 
                i.action(
                    options, 
                    { 
                        component: currentComponent, 
                        el, id, style, props, 
                        position: {
                            x: positionX,
                            y: positionY
                        }
                    }
                )
        })),
        x, y,
        open, close, toggle
    };
};