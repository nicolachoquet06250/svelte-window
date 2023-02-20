<slot />

<svelte:body 
    on:mouseup={handleMouseUp} 
    on:mousemove={handleMouseMove}
/>

<script lang='ts'>
    import { onMount } from "svelte";
    import { useFocus, useContext } from "../../@composables";
    import type { CSSCursor } from "../../@tools/cursors";

    const { focus } = useFocus();

    let cursor: CSSCursor = 'default';
    let inMove: boolean = false;
    let windowPosition: Point = { x: 0, y: 0 };
    let oldMousePosition: Point = { x: 0, y: 0 };

    useContext('movable', true);
    const inMoveContext = useContext('in-move', false);
    const titleContext = useContext('title', '');
    const fullscreenContext = useContext('fullscreen', false);
    const windowPositionContext = useContext<Point>(
        'window-position', 
        { x: 0, y: 0 }
    );
    const movableZoneContext = useContext<MovableZoneElement>(
        'movable-zone-element', 
        { component: null, element: null }
    );
    
    windowPositionContext.subscribe(v => {
        if (v.y >= 0) {
            windowPosition = v;
        }
    });

    onMount(() => {
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

        return () => {
            $movableZoneContext.element?.removeEventListener('mousedown', handleMouseDown);

            document.body.style.cursor = 'default';
        }
    });

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!$fullscreenContext) {
            cursor = 'move';
            inMove = true;
            oldMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
            $movableZoneContext?.component?.$$set({
                ...($movableZoneContext?.component.$$prop_def ?? {}),
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
        $movableZoneContext?.component?.$$set({
            ...($movableZoneContext?.component.$$prop_def ?? {}),
            cursor: 'default' as CSSCursor
        });
        $inMoveContext = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (inMove && !$fullscreenContext) {
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

            $windowPositionContext = { ...windowPosition };
        }
    };

    $: $movableZoneContext && !$fullscreenContext && 
        $movableZoneContext.element?.addEventListener('mousedown', handleMouseDown);
    $: $fullscreenContext && (document.body.style.cursor = cursor);
</script>

<script lang='ts' context='module'>
    export type MovableZoneElement = {
        component: (ATypedSvelteComponent & Partial<{ 
            $$set: (v: Record<string, any>) => void,
            $$prop_def: Record<string, any>
        }>) | null,
        element: HTMLElement
    };
    export type Point = { x: number, y: number };
</script>
