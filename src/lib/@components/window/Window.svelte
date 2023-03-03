{#if $resizableContext || !closing}
    <section 
        bind:this={$target}

        class:window={true}
        class:rounded
        class:tidy={isTidy}

        {style}

        style:--window-position={windowPositionCss}
        style:--z-index={$windowList.indexOf(id)}
            
        style:left={windowPosition.x + 'px'}
        style:top={windowPosition.y + 'px'}
        style:width={_width} 
        style:height={_height}

        data-id={id}

        bind:offsetWidth={windowWidth}
        bind:offsetHeight={windowHeight}

        data-resizable={$resizableContext}>
        {#if header}
            <svelte:component 
                this={header}
                {headerHeight}
                {maxified} {title}
                {rounded} {stowable}
                resizable={$resizableContext} 
                {logo} {id}
                on:tidy={handleTidy}
                on:close={handleClose}
            />
        {/if}

        <main>
            <slot />
        </main>
    </section>
{:else}
    <div class:closing-container={closing}
         style:width={`${windowWidth}px`} 
         style:height={`${windowHeight}px`}
         style:left={windowPosition.x + 'px'}
         style:top={windowPosition.y + 'px'}
         out:scale>
        <section 
            bind:this={$target}

            class:window={true}
            class:rounded
            class:tidy={isTidy}

            {style}

            style:--window-position={windowPositionCss}
            style:--z-index={$windowList.indexOf(id)}
                
            style:left={windowPosition.x + 'px'}
            style:top={windowPosition.y + 'px'}
            style:width={_width} 
            style:height={_height}

            data-id={id}

            bind:offsetWidth={windowWidth}
            bind:offsetHeight={windowHeight}

            data-resizable={$resizableContext}>
            {#if header}
                <svelte:component 
                    this={header}
                    {headerHeight}
                    {maxified} {title}
                    {rounded} {stowable}
                    resizable={$resizableContext} 
                    {logo} {id}
                    on:tidy={handleTidy}
                    on:close={handleClose}
                />
            {/if}
            
            <main>
                <slot />
            </main>
        </section>
    </div>
{/if}

<script lang='ts'>
    import { onMount } from "svelte";
    import defaultLogo from '../../../assets/svelte.svg';
    import { useEventListener, writable } from "@svelte-use/core";
    import { useFocus, useTidyWindows, useContext } from "../../@composables";
    import WindowMainHeader from "./WindowMainHeader.svelte";
    import { useOpenedWindows } from "../../../@composables";
    import { scale } from "svelte/transition";

    const movableContext = useContext<boolean>('movable', false);
    const movableZoneElementContext = 
        useContext<MovableZoneElement>(
            'movable-zone-element',
            { component: null, element: null }
        );
    const windowPositionContext = useContext<Point>('window-position', { x: 0, y: 0 });
    const resizableContext = useContext<boolean>('resizable', false);
    const windowSizeContext = useContext<BoxSize>('window-size', { width: 0, height: 0 });
    const minSizeContext = useContext<BoxSize>('min-size', { width: 0, height: 0 });
    const titleContext = useContext<string>('title', '');

    const { list: tidyWindowList, tidy: tidyWindow } = useTidyWindows();
    const { 
        focus, prepareWindow, 
        unprepareWindow, list: windowList
    } = useFocus();
    const { remove } = useOpenedWindows();
    
    const target = writable<HTMLElement>();
    useEventListener(target, 'click', () => focus(id));

    onMount(() => {
        $minSizeContext && ($minSizeContext = {
            width: 500,
            height: 500
        });
        $titleContext = title;
        
        prepareWindow(id);

        return () => {
            unprepareWindow(id);
        }
    });

    export let rounded = false;
    export let id: number = 0;

    export let title: string = '';

    export let width: number = null;
    export let height: number = null;

    export let positionX: number = null;
    export let positionY: number = null;

    export let windowWidth: number = 0;
    export let windowHeight: number = 0;

    export let header: ConstructorOfATypedSvelteComponent = WindowMainHeader;
    export let tidy: ConstructorOfATypedSvelteComponent = null;

    export let logo: string | ConstructorOfATypedSvelteComponent = defaultLogo;

    export let focused: boolean = false;

    export let style: string = '';
    
    let maxified = false;
    let headerHeight: number;
    let windowPosition: Point = { x: 0, y: 0 };

    let closing: boolean = false;

    $: stowable = tidy !== null;

    $: _width = $resizableContext ? '100%' : (width ?? 0) + 'px';
    $: _height = $resizableContext ? '100%' : (height ?? 0) + 'px';

    $: windowPosition.x = $movableContext ? 0 : positionX;
    $: windowPosition.y = $movableContext ? 0 : positionY;

    $: windowPositionCss = $resizableContext ? 'relative' : 'absolute';

    $: focused = $windowList.indexOf(id) === $windowList.length - 1;

    windowPositionContext?.subscribe((v: Point) => {
        !$resizableContext && (windowPosition.x = v.x);
        !$resizableContext && (windowPosition.y = v.y);
    });

    $: $resizableContext && windowSizeContext.update(v => ({...v, width: windowWidth}));
    $: $resizableContext && windowSizeContext.update(v => ({...v, height: windowHeight}));

    $: positionX && $movableContext && windowPositionContext.update(v => ({ ...v, x: positionX }));
    $: positionY && $movableContext && windowPositionContext.update(v => ({ ...v, y: positionY }));

    $: $movableZoneElementContext.element && ($movableZoneElementContext = {
        ...$movableZoneElementContext,
        element: $movableZoneElementContext.element
    });

    $: isTidy = Object.keys($tidyWindowList).map(id => parseInt(id)).includes(id);

    const handleTidy = () => tidyWindow(id, tidy, { title, logo });
    const handleClose = () => {
        closing = true;
        setTimeout(() => {
            remove(id);
        }, 0);
    }

    $readonly: windowWidth;
    $readonly: windowHeight;
    $readonly: focused;
</script>

<style scoped>
    :root {
        --bg-color: white;
        --border-color: white;
        --border-size: 1px;

        --title-color: black;

        --window-position: absolute;
    }

    .closing-container {
        position: absolute;
        z-index: 9999;
    }

    .closing-container > section.window {
        position: absolute;
        top: 0!important;
        left: 0!important;
    }

    section.window {
        min-width: 500px;
        min-height: 500px;
        height: 100%;
        border-style: solid;
        box-sizing: border-box;
        position: var(--window-position);
        z-index: 0;
        z-index: var(--z-index);

        border-color: var(--border-color);
        border-width: var(--border-size);

        -webkit-box-shadow: 3px 2px 12px 1px rgba(0,0,0,0.87); 
        box-shadow: 3px 2px 12px 1px rgba(0,0,0,0.87);
    }

    section.window.tidy {
        display: none;
    }

    section.window.rounded {
        border-radius: 5px;
    }

    section.window > main {
        height: calc(100% - 40px);
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 40px;
        background-color: var(--bg-color);
    }
</style>