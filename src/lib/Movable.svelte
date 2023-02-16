<slot />

<svelte:body 
    on:mouseup={handleMouseUp} 
    on:mousemove={handleMouseMove}
/>

<script lang='ts'>
    import { setContext, SvelteComponent, onMount, hasContext, getContext } from "svelte";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import type { CSSCursor } from "./helpers/cursors";

    let zoneElement: MovableZoneElement = null;

    let cursor: CSSCursor = 'default';
    let inMove = false;
    let windowPosition: Point = { x: 0, y: 0 };
    let oldMousePosition: Point = { x: 0, y: 0 };

    setContext('movable', writable(true));
    const movableZoneElement = setContext<MovableZoneElementContext>(
        'movable-zone-element', 
        writable({
            component: null,
            element: null
        })
    );
    const windowPositionContext = hasContext('window-position') ? 
        getContext<PositionContext>('window-position') : 
            setContext<PositionContext>('window-position', writable({ x: 0, y: 0 }));
    
    windowPositionContext.subscribe(v => {
        if (v.y >= 0) {
            windowPosition = v;
        }
    });

    onMount(() => {
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

        return () => {
            zoneElement.element?.removeEventListener('mousedown', handleMouseDown);

            document.body.style.cursor = 'default';
        }
    });

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        cursor = 'move';
        inMove = true;
        oldMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
        zoneElement.component?.$$set({
            ...zoneElement.component.$$prop_def,
            cursor: 'move' as CSSCursor
        });
    };

    const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        cursor = 'default';
        inMove = false;
        oldMousePosition = { x: 0, y: 0 };
        zoneElement.component?.$$set({
            ...zoneElement.component.$$prop_def,
            cursor: 'default' as CSSCursor
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        inMove && (() => {
            if (windowPosition.x + (e.clientX - oldMousePosition.x) >= 0) {
                windowPosition.x += e.clientX - oldMousePosition.x;
            }
            if (windowPosition.y + (e.clientY - oldMousePosition.y) >= 0) {
                windowPosition.y += e.clientY - oldMousePosition.y;
            }

            oldMousePosition = {
                x: e.clientX,
                y: e.clientY
            };

            windowPositionContext.set({ ...windowPosition });
        })()
    };

    $: zoneElement && (() => {
        zoneElement.element?.addEventListener('mousedown', handleMouseDown);
    })();
    $: document.body.style.cursor = cursor;

    movableZoneElement.subscribe(v => (zoneElement = v));
</script>

<script lang='ts' context='module'>
    export type MovableContext = Writable<boolean> | undefined;
    export type MovableZoneElement = {
        component: SvelteComponent,
        element: HTMLElement
    };
    export type MovableZoneElementContext = Writable<MovableZoneElement>;
    export type Point = { x: number, y: number };
    export type PositionContext = Writable<Point>;
</script>

<style scoped>
</style>