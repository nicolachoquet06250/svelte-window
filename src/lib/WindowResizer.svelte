<button class:resizer={true}
        class:left
        class:right
        class:top
        class:bottom
        class:clicked
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp} />

<svelte:window  on:mouseup={handleMouseUp} 
                on:mousemove={handleMouseMove} />

<script lang='ts'>
    import { createEventDispatcher } from "svelte";
    import type { Point } from "./Movable.svelte";

    export let side: AvailableSide = null;
    export let clicked = false;

    $: left = side === 'left';
    $: right = side === 'right';
    $: top = side === 'top';
    $: bottom = side === 'bottom';

    $readonly: clicked;

    const dispatch = createEventDispatcher();

    let oldMousePosition: Point;

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        oldMousePosition = { x: e.x, y: e.y };

        clicked = true;
        dispatch('clicked', side);
    };

    $: handleMouseMove = (e: MouseEvent) => {
        moveTo !== null && (() => {
            (['top', 'bottom'].includes(side, 0)) && clicked && 
                dispatch('resize', { height: e.y, side });
            (['left', 'right'].includes(side, 0)) && clicked && 
                dispatch('resize', { width: e.x, side });
        })();
    };

    const handleMouseUp = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        side !== null && (() => {
            oldMousePosition = { x: e.x, y: e.y };
        })();
        clicked = false;
        dispatch('unclicked');
    };
</script>

<script lang='ts' context='module'>
    export type AvailableSide = 'left' | 'right' | 'top' | 'bottom';
    export type ClickedEvent = CustomEvent<AvailableSide>;
    export type ResizeEvent = CustomEvent<{ width?: number, height?: number, side: AvailableSide }>;
</script>

<style scoped>
    .resizer {
        /* background-color: black; */
        background-color: transparent;
        position: absolute;
        box-sizing: border-box;
        border: none;
        padding: 0;
        margin: 0;
    }

    .left {
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        cursor: w-resize;
        transform: translateX(-50%);
    }

    .right {
        right: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        cursor: e-resize;
        transform: translateX(50%);
    }

    .left.clicked,
    .right.clicked {
        width: 20px;
    }

    .top {
        left: 0;
        right: 0;
        top: 0;
        height: 5px;
        cursor: n-resize;
        transform: translateY(-50%);
    }

    .bottom {
        left: 0;
        right: 0;
        bottom: 0;
        height: 5px;
        cursor: s-resize;
        transform: translateY(50%);
    }

    .top.clicked,
    .bottom.clicked {
        height: 20px;
    }
</style>