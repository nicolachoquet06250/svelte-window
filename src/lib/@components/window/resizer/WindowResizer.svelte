<button class:resizer={true}
        class:left class:right
        class:top class:bottom
        class:clicked
        class:fullscreen={$fullScreenContext}
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp} />

<svelte:window  on:mouseup={handleMouseUp} 
                on:mousemove={handleMouseMove} />

<script lang='ts'>
    import type { AvailableSide, Point } from "svelte-window";
    import { createEventDispatcher } from "svelte";
    import { getContext } from "../../../@composables";

    export let side: AvailableSide = null;
    export let clicked = false;

    let oldMousePosition: Point;

    $: left = side === 'left';
    $: right = side === 'right';
    $: top = side === 'top';
    $: bottom = side === 'bottom';

    const dispatch = createEventDispatcher();
    
    const fullScreenContext = getContext<boolean>('fullscreen');

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        oldMousePosition = { x: e.x, y: e.y };

        clicked = true;
        dispatch('clicked', {side, e});
    };

    $: handleMouseMove = (e: MouseEvent) => {
        side !== null && (() => {
            e.preventDefault();
            e.stopPropagation();

            (['top', 'bottom'].includes(side, 0)) && clicked && 
                dispatch('resize', {
                    size: { height: e.y }, 
                    side, e
                });
            (['left', 'right'].includes(side, 0)) && clicked && 
                dispatch('resize', {
                    size: { width: e.x }, 
                    side, e
                });
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

    $readonly: clicked;
</script>

<style scoped>
    .resizer {
        background-color: transparent;
        /* background-color: red; */
        position: absolute;
        box-sizing: border-box;
        border: none;
        padding: 0;
        margin: 0;
        z-index: var(--z-index);
    }

    .resizer.fullscreen {
        cursor: default!important;
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