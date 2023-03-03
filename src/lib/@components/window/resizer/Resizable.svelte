<div class:resizable={true}
     class:fullscreen={$fullscreenContext}
     class:tidy={isTidy}

     style:--z-index={$windowList.indexOf(id)}

     style:min-width={$minSizeContext.width + 'px'}
     style:min-height={$minSizeContext.height + 'px'}

     style:width style:height

     style:--position-x={$windowPositionContext.x + 'px'}
     style:--position-y={$windowPositionContext.y + 'px'}

     out:scale>
    <slot />

    <ResizerGroup 
        {resizers}
        on:clicked={handleClicked}
        on:resize={handleResize} />
</div>

<svelte:body on:mousedown={handleUnclicked} />

<script lang='ts'>
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
    import ResizerGroup from "./WindowResizerGroup.svelte";
    import { useFocus, useTidyWindows, useContext } from "../../../@composables";

    const { list: tidyWindowList } = useTidyWindows();
    const { list: windowList } = useFocus();

    const resizers: AvailableSide[] = [
        'left', 
        'right', 
        'top', 
        'bottom'
    ];

    let resizeTo: AvailableSide = null;
    let size: BoxSize = { width: 0, height: 0 };
    let tmpSize: BoxSize = { width: 0, height: 0 };
    let clickPosition: Point = { x: 0, y: 0 };
    let clickedSize: Partial<BoxSize> = {};

    export let id: number = 0;

    // set des contextes
    useContext('resizable', true);
    const titleContext = useContext('title', '');
    const fullscreenContext = useContext('fullscreen', false);
    const inMoveContext = useContext('in-move', false);
    const minSizeContext = useContext('min-size', {
        width: 0,
        height: 0
    });
    const windowSizeContext = useContext('window-size', {
        width: 0,
        height: 0
    });
    const windowPositionContext = useContext('window-position', { 
        x: 0, 
        y: 0 
    });
    const movableZoneElementContext = useContext('movable-zone-element', { 
        component: null,
        element: null
    });

    let savedSize = { width: 0, height: 0 };

    $: saveSize = (sizeSide: 'width' | 'height') => {
        if ($fullscreenContext) {
            savedSize = { ...savedSize, [sizeSide]: size[sizeSide] };
            return 'auto';
        }
        const r = (resizeTo !== null ? tmpSize[sizeSide] : savedSize[sizeSide]) + 'px';
        savedSize = { ...savedSize, [sizeSide]: size[sizeSide] };
        return r;
    }

    // computed & subscribes
    $: width = saveSize('width');
    $: height = saveSize('height');

    $: isTidy = Object.keys($tidyWindowList).map(id => parseInt(id)).includes(id);

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

    $: handleClicked = (e: ClickedEvent) => {
        if (!$inMoveContext) {
            resizeTo = e.detail.side;
            clickPosition = {
                x: e.detail.e.pageX,
                y: e.detail.e.pageY
            };
            clickedSize = {...size};
        }
    };

    $: handleUnclicked = () => {
        resizeTo = null;
        clickPosition = { x: 0, y: 0 };
        clickedSize = {};
    };

    $: handleResize = (e: ResizeEvent) => {
        if (!$inMoveContext) {
            e.preventDefault();
            e.stopPropagation();

            if ($fullscreenContext) return;

            e.detail.side === 'bottom' && (() => {
                const height = e.detail.size.height - $windowPositionContext.y < $minSizeContext.height ? 
                    tmpSize.height : e.detail.size.height - $windowPositionContext.y;

                tmpSize = {...tmpSize, height};
            })();
            e.detail.side === 'right' && (() => {
                const width = e.detail.size.width - $windowPositionContext.x < $minSizeContext.width ?
                    tmpSize.width : e.detail.size.width - $windowPositionContext.x;
                
                tmpSize = {...tmpSize, width};
            })();

            e.detail.side === 'top' && (() => {
                const topDiff = (clickPosition.y - e.detail.e.pageY);

                const height = clickedSize.height + topDiff < $minSizeContext.height ? 
                $minSizeContext.height : clickedSize.height + topDiff;
                
                if (height > $minSizeContext.height) {
                    $windowPositionContext = {
                        ...$windowPositionContext,
                        y: $windowPositionContext.y + (e.detail.size.height - $windowPositionContext.y)
                    }
                }
                
                tmpSize = {...tmpSize, height};
            })();

            e.detail.side === 'left' && (() => {
                const topDiff = (clickPosition.x - e.detail.e.pageX);

                const width = clickedSize.width + topDiff < $minSizeContext.width ? 
                $minSizeContext.width : clickedSize.width + topDiff;
                
                if (width > $minSizeContext.width) {
                    $windowPositionContext = {
                        ...$windowPositionContext,
                        x: $windowPositionContext.x + (e.detail.size.width - $windowPositionContext.x)
                    }
                }
                
                tmpSize = {...tmpSize, width};
            })();
        }
    };

    $: handleDblClick = () => {
        $fullscreenContext = !$fullscreenContext;
    };

    onMount(() => {
        $movableZoneElementContext.element?.addEventListener('dblclick', handleDblClick);

        return () => {
            document.body.style.cursor = 'default';
            $movableZoneElementContext.element?.removeEventListener('dblclick', handleDblClick);
        }
    });
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
    }

    .resizable.tidy {
        display: none;
    }

    .resizable.fullscreen {
        --position-x: 0px!important;
        --position-y: 0px!important;
        right: 0;
        bottom: 0;
        transition: 
            top .2s linear, 
            bottom .2s linear, 
            left .2s linear, 
            right .2s linear;
    }

    .resizable.fullscreen > :global(section.window) {
        width: 100%;
    }
</style>