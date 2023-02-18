<div class:resizable={true}
     class:fullscreen

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
    import { getContext, hasContext, onMount, setContext } from "svelte";
    import { get, writable } from "svelte/store";
    import type { Writable } from "svelte/store";
    import type { ClickedEvent, ResizeEvent } from "./WindowResizer.svelte";
    import type { AvailableSide } from "./WindowResizer.svelte";
    import ResizerGroup from "./WindowResizerGroup.svelte";
    import type { MovableZoneElement, MovableZoneElementContext, Point, PositionContext } from "./Movable.svelte";

    let minWidth: number;
    let minHeight: number;
    let resizeTo: AvailableSide = null;
    let size = { width: 0, height: 0 };
    let tmpSize = { width: 0, height: 0 };
    let windowPosition: Point = { x: 0, y: 0 };
    let clickPosition: Point = { x: 0, y: 0 };
    let clickedSize: Partial<BoxSize> = {};

    let zoneElement: MovableZoneElement = {
        component: null,
        element: null
    };
    let fullscreen: boolean = false;

    // set des contextes
    setContext('resizable', writable(true));
    const fullscreenContext = setContext('fullscreen', writable(false));
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
    const movableZoneElementContext = hasContext('movable-zone-element') ? 
        getContext<MovableZoneElementContext>('movable-zone-element') : 
            setContext<MovableZoneElementContext>(
                'movable-zone-element', 
                writable({ component: null, element: null })
            );

    let savedSize = {
        width: 0,
        height: 0
    };
    // computed & subscribes
    $: width = (() => {
        if (fullscreen) {
            savedSize = { ...savedSize, width: size.width };
            return 'auto';
        }
        const r = (resizeTo !== null ? tmpSize.width : savedSize.width) + 'px';
        savedSize = { width: 0, height: 0 };
        return r;
    })();
    $: height = (() => {
        if (fullscreen) {
            savedSize = { ...savedSize, height: size.height }
            return 'auto';
        }
        const r = (resizeTo !== null ? tmpSize.height : savedSize.height) + 'px';
        savedSize = { ...savedSize, height: 0 };
        return r;
    })();

    $: unsubscribe = windowSizeContext?.subscribe(v => {
        v.width && v.height && (() => {
            const newSize: Partial<BoxSize> = {};
            v.width !== 0 && 
                (newSize.width = v.width);
            v.height !== 0 && 
                (newSize.height = v.height);

            v.width !== 0 && 
                tmpSize.width === 0 && 
                    (tmpSize.width = v.width);
            v.height !== 0 && 
                tmpSize.height === 0 && 
                    (tmpSize.height = v.height);

            size = { ...size, ...newSize };
            
            try {
                unsubscribe();
            } catch (e) {}
        })();
    });

    minSizeContext?.subscribe(v => {
        minWidth = v.width;
        minHeight = v.height;
    });

    windowPositionContext?.subscribe(v => (windowPosition = v));

    movableZoneElementContext.subscribe(v => {
        v?.component && (zoneElement.component = v.component);
        v?.element && (zoneElement.element = v.element);
    });

    $: handleClicked = (e: ClickedEvent) => {
        resizeTo = e.detail.side;
        clickPosition = {
            x: e.detail.e.pageX,
            y: e.detail.e.pageY
        };
        clickedSize = {...size};
    };

    $: handleUnclicked = () => {
        resizeTo = null;
        clickPosition = { x: 0, y: 0 };
        clickedSize = {};
    };

    $: handleResize = (e: ResizeEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (fullscreen) return;

        e.detail.side === 'bottom' && (() => {
            const height = e.detail.size.height - windowPosition.y < minHeight ? 
                tmpSize.height : e.detail.size.height - windowPosition.y;

            tmpSize = {...tmpSize, height};
        })();
        e.detail.side === 'right' && (() => {
            const width = e.detail.size.width - windowPosition.x < minWidth ?
                tmpSize.width : e.detail.size.width - windowPosition.x;
            
            tmpSize = {...tmpSize, width};
        })();

        e.detail.side === 'top' && (() => {
            const topDiff = (clickPosition.y - e.detail.e.pageY);

            const height = clickedSize.height + topDiff < minHeight ? 
                minHeight : clickedSize.height + topDiff;
            
            if (height > minHeight) {
                windowPositionContext.set({
                    ...windowPosition,
                    y: windowPosition.y + (e.detail.size.height - windowPosition.y)
                });
            }
            
            tmpSize = {...tmpSize, height};
        })();

        e.detail.side === 'left' && (() => {
            const topDiff = (clickPosition.x - e.detail.e.pageX);

            const width = clickedSize.width + topDiff < minWidth ? 
                minWidth : clickedSize.width + topDiff;
            
            if (width > minWidth) {
                windowPositionContext.set({
                    ...windowPosition,
                    x: windowPosition.x + (e.detail.size.width - windowPosition.x)
                });
            }
            
            tmpSize = {...tmpSize, width};
        })();
    };

    $: handleDblClick = () => {
        fullscreenContext.set(!get(fullscreenContext));
    };
    
    fullscreenContext.subscribe(v => (fullscreen = v))

    $: zoneElement.element && (() => {
        zoneElement.element.addEventListener('dblclick', handleDblClick);
    })();

    onMount(() => {
        return () => {
            document.body.style.cursor = 'default';
            zoneElement.element?.removeEventListener('dblclick', handleDblClick);
        }
    });
</script>

<script lang='ts' context='module'>
    export type ResizableContext = Writable<boolean> | undefined;
    export type BoxSize = { width: number, height: number };
    export type WindowSizeContext = Writable<BoxSize>;
    export type FullscreenContext = Writable<boolean>;
</script>

<style scoped>
    :root {
        --position-x: 0px;
        --position-y: 0px;
    }

    .resizable {
        position: absolute;
        top: var(--position-y);
        left: var(--position-x);
        transition: top .2s linear, bottom .2s linear, left .2s linear, right .2s linear;
    }

    .resizable.fullscreen {
        --position-x: 0px!important;
        --position-y: 0px!important;
        right: 0;
        bottom: 0;
    }
</style>