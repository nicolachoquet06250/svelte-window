<section class:window={true}
         class:rounded
         style:--header-width={`${(windowWidth ?? 500)}px`}
         bind:offsetWidth={windowWidth}
         bind:offsetHeight={windowHeight}>
    <MainHeader logo={SvelteLogo} 
                bind:this={header.component}
                bind:ref={header.element}
                bind:headerHeight
                bind:maxified
                bind:title
                bind:rounded
                resizable={true} />

    <main>
        <slot />
    </main>
</section>

<script lang='ts'>
    import { getContext } from "svelte";
    import type { MovableZoneElementContext, MovableContext, MovableZoneElement, PositionContext } from "./Movable.svelte";
    import type { ResizableContext, WindowSizeContext } from "./Resizable.svelte";
    import SvelteLogo from '../assets/svelte.svg';
    import MainHeader from "./WindowMainHeader.svelte";

    const movableContext = getContext<MovableContext>('movable');
    const movableZoneElementContext = getContext<MovableZoneElementContext>('movable-zone-element');
    const windowPosition = getContext<PositionContext>('window-position');

    const resizableContext = getContext<ResizableContext>('resizable');
    const windowSizeContext = getContext<WindowSizeContext>('window-size');
    getContext<WindowSizeContext>('min-size')?.set({ width: 500, height: 500 });

    export let rounded = false;
    export let title = '';
    
    let maxified = false;
    let headerHeight: number;
    let isResizable: boolean = false;
    let isMovable: boolean = false;
    let header: MovableZoneElement = {
        component: null,
        element: null
    };

    $: header.component && movableZoneElementContext.set(header);
    $: header.element && movableZoneElementContext.set(header);

    export let windowWidth: number;
    export let windowHeight: number;

    resizableContext?.subscribe(v => (isResizable = v));
    movableContext?.subscribe(v => (isMovable = v));

    $: isResizable && windowSizeContext.update(v => ({...v, width: windowWidth}));
    $: isResizable && windowSizeContext.update(v => ({...v, height: windowHeight}));

    $readonly: windowWidth;
    $readonly: windowHeight;
</script>

<style scoped>
    :root {
        --bg-color: white;
        --border-color: white;
        --border-size: 1px;

        --title-color: black;
    }

    section.window {
        min-width: 500px;
        min-height: 500px;
        height: 100%;
        border-style: solid;
        box-sizing: border-box;
        position: relative;

        border-color: var(--border-color);
        border-width: var(--border-size);
        background-color: var(--bg-color);
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
    }
</style>