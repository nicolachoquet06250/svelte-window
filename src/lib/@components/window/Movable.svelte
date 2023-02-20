<slot />

<svelte:body 
    on:mouseup={handleMouseUp} 
    on:mousemove={handleMouseMove}
/>

<script lang='ts'>
    import { setContext, onMount, hasContext, getContext } from "svelte";
    import { get, writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import type { CSSCursor } from "../../@tools/cursors";
    import type { FullscreenContext } from "./resizer/Resizable.svelte";
    import { useFocus } from "../../@composables";

    let zoneElement: MovableZoneElement = {
        component: null,
        element: null
    };

    let cursor: CSSCursor = 'default';
    let inMove = false;
    let windowPosition: Point = { x: 0, y: 0 };
    let oldMousePosition: Point = { x: 0, y: 0 };
    let fullscreen: boolean = false;

    setContext('movable', writable(true));
    const windowPositionContext = hasContext('window-position') ? 
        getContext<PositionContext>('window-position') : 
            setContext<PositionContext>('window-position', writable({ x: 0, y: 0 }));
    const movableZoneElementContext = hasContext('movable-zone-element') ? 
        getContext<MovableZoneElementContext>('movable-zone-element') : 
            setContext<MovableZoneElementContext>(
                'movable-zone-element', 
                writable({ component: null, element: null })
            );
    const fullscreenContext = hasContext('fullscreen') ? 
        getContext<FullscreenContext>('fullscreen') : 
            setContext('fullscreen', writable(false));
    const inMoveContext = hasContext('in-move') ? 
        getContext<Writable<boolean>>('in-move') : 
            setContext<Writable<boolean>>('in-move', writable(false));
    const titleContext = hasContext('title') ? 
        getContext<Writable<string>>('title') : 
            setContext<Writable<string>>('title', writable(''));
    
    windowPositionContext.subscribe(v => {
        if (v.y >= 0) {
            windowPosition = v;
        }
    });
    fullscreenContext?.subscribe(v => (fullscreen = v));

    movableZoneElementContext.subscribe(v => {
        v?.component && (zoneElement.component = v.component);
        v?.element && (zoneElement.element = v.element);
    });

    onMount(() => {
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

        return () => {
            zoneElement.element?.removeEventListener('mousedown', handleMouseDown);

            document.body.style.cursor = 'default';
        }
    });

    const { focus } = useFocus();

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!fullscreen) {
            cursor = 'move';
            inMove = true;
            oldMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
            zoneElement?.component?.$$set({
                ...(zoneElement?.component.$$prop_def ?? {}),
                cursor: 'move' as CSSCursor
            });
            $inMoveContext = true;

            focus($titleContext);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        cursor = 'default';
        inMove = false;
        oldMousePosition = { x: 0, y: 0 };
        zoneElement?.component?.$$set({
            ...(zoneElement?.component.$$prop_def ?? {}),
            cursor: 'default' as CSSCursor
        });
        $inMoveContext = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (inMove && !fullscreen) {
            e.preventDefault();
            e.stopPropagation();

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
        }
    };

    $: zoneElement && !fullscreen && 
        zoneElement.element?.addEventListener('mousedown', handleMouseDown);
    $: fullscreen && (document.body.style.cursor = cursor);
</script>

<script lang='ts' context='module'>
    export type MovableContext = Writable<boolean>;
    export type MovableZoneElement = {
        component: (ATypedSvelteComponent & Partial<{ 
            $$set: (v: Record<string, any>) => void,
            $$prop_def: Record<string, any>
        }>) | null,
        element: HTMLElement
    };
    export type MovableZoneElementContext = Writable<MovableZoneElement>;
    export type Point = { x: number, y: number };
    export type PositionContext = Writable<Point>;
</script>
