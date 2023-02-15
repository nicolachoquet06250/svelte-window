<div class:resizable={true}
     style:min-width={minWidth + 'px'}
     style:min-height={minHeight + 'px'}
     style:width style:height
     style:--position-x={windowPosition.x + 'px'}
     style:--position-y={windowPosition.y + 'px'}>
    <slot />

    <ResizerGroup 
        resizers={['left', 'right', 'top', 'bottom']}
        on:clicked={handleClicked}
        on:resize={handleResize} />
</div>

<svelte:body on:mousedown={handleUnclicked} />

<script lang='ts'>
    import { getContext, hasContext, setContext } from "svelte";
    import { writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import type { ClickedEvent, ResizeEvent } from "./WindowResizer.svelte";
    import type { AvailableSide } from "./WindowResizer.svelte";
    import ResizerGroup from "./WindowResizerGroup.svelte";
    import type { Point, PositionContext } from "./Movable.svelte";

    let minWidth: number;
    let minHeight: number;
    let resizeTo: AvailableSide = null;
    let size = { width: 0, height: 0 };
    let tmpSize = { width: 0, height: 0 };
    let windowPosition: Point = { x: 0, y: 0 };

    setContext('resizable', writable(true));
    const minSizeContext = setContext('min-size', writable({
        width: 0,
        height: 0
    }));
    const windowSizeContext = setContext('window-size', writable({
        width: 0,
        height: 0
    }));
    const windowPositionContext = hasContext('window-position') ? 
        getContext<PositionContext>('window-position') : 
            setContext<PositionContext>('window-position', writable({ x: 0, y: 0 }));

    $: width = (resizeTo !== null ? tmpSize.width : size.width) + 'px';
    $: height = (resizeTo !== null ? tmpSize.height : size.height) + 'px';

    $: unsubscribe = windowSizeContext.subscribe(v => {
        v.width && v.height && (() => {
            size = {...size, width: v.width, height: v.height};
            
            try {
                unsubscribe();
            } catch (e) {}
        })();
    });

    minSizeContext.subscribe(v => {
        minWidth = v.width;
        minHeight = v.height;
    });

    windowPositionContext.subscribe(v => (windowPosition = v));

    $: handleClicked = (e: ClickedEvent) => (resizeTo = e.detail);

    $: handleUnclicked = () => (resizeTo = null);

    $: handleResize = (e: ResizeEvent) => {
        e.preventDefault();
        e.stopPropagation();

        e.detail.side === 'bottom' && (tmpSize = {
            ...tmpSize, 
            height: e.detail.height - windowPosition.y
        });
        e.detail.side === 'right' && (tmpSize = {
            ...tmpSize, 
            width: e.detail.width - windowPosition.x
        });
        
        e.detail.side === 'top' && (() => {
            windowPositionContext.set({
                ...windowPosition,
                y: windowPosition.y + (e.detail.height - windowPosition.y)
            });
            tmpSize = {
                ...tmpSize,
                height: e.detail.height - windowPosition.y
            };
            console.log(tmpSize, windowPosition)
        })();
        e.detail.side === 'left' && (() => {
            tmpSize = {
                ...tmpSize, 
                width: (e.detail.width - windowPosition.x)
            };
        })();
    };
</script>

<script lang='ts' context='module'>
    export type ResizableContext = Writable<boolean> | undefined;
    export type BoxSize = { width: number, height: number };
    export type WindowSizeContext = Writable<BoxSize>;
</script>

<style scoped>
    :root {
        --position-x: 0;
        --position-y: 0;
    }

    .resizable {
        position: absolute;
        top: var(--position-y);
        left: var(--position-x);
    }
</style>