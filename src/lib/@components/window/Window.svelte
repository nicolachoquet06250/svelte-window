<section 
    bind:this={$target}

    class:window={true}
    class:rounded
    class:tidy={Object.values($tidyWindowList).map(v => v.data.title).includes(title)}
       
    style:--header-width={`${(windowWidth ?? 500)}px`}
    style:--window-position={windowPositionCss}
    style:--z-index={$windowList.indexOf(title)}
         
    style:left={windowPosition.x + 'px'}
    style:top={windowPosition.y + 'px'}
    style:width={_width} 
    style:height={_height}
    style:min-width={_minWidth} 
    style:min-height={_minHeight}

    bind:offsetWidth={windowWidth}
    bind:offsetHeight={windowHeight}>
    {#if header}
        <svelte:component 
            this={header}
            {headerHeight}
            {maxified} {title}
            {rounded} {stowable}
            resizable={$resizableContext} {logo}
            on:tidy={handleTidy} />
    {/if}
    
    <main>
        <slot />
    </main>
</section>

<script lang='ts'>
    import { onMount, SvelteComponentTyped } from "svelte";
    import defaultLogo from '../../../assets/svelte.svg';
    import { useEventListener, writable } from "@svelte-use/core";
    import { useFocus, useTidyWindows, getContext, useContext } from "../../@composables";
    import WindowMainHeader from "./headers/WindowMainHeader.svelte";
    import type { MovableZoneElement, Point } from "./Movable.svelte";
    import type { BoxSize } from "./resizer/Resizable.svelte";

    const movableContext = useContext<boolean>('movable', false);
    const movableZoneElementContext = 
        getContext<MovableZoneElement>(
            'movable-zone-element'
        );
    const windowPositionContext = getContext<Point>('window-position');
    const resizableContext = useContext<boolean>('resizable', false);
    const windowSizeContext = getContext<BoxSize>('window-size');
    const minSizeContext = getContext<BoxSize>('min-size');
    const titleContext = getContext<string>('title');

    const { list: tidyWindowList, tidy: tidyWindow } = useTidyWindows();
    const { 
        focus, prepareWindow, 
        unprepareWindow, list: windowList
    } = useFocus();
    
    const target = writable<HTMLElement>();
    useEventListener(target, 'click', () => focus(title));

    onMount(() => {
        $minSizeContext && ($minSizeContext = {
            width: 500,
            height: 500
        });
        $titleContext = title;
        
        prepareWindow(title);

        return () => {
            unprepareWindow(title);
        }
    });

    export let rounded = false;

    export let title = '';

    export let width: number = null;
    export let height: number = null;

    export let positionX: number = null;
    export let positionY: number = null;

    export let minWidth: number = null;
    export let minHeight: number = null;

    export let windowWidth: number = 0;
    export let windowHeight: number = 0;

    export let header: ConstructorOfATypedSvelteComponent = WindowMainHeader;
    export let tidy: ConstructorOfATypedSvelteComponent = null;

    export let logo = defaultLogo;
    
    let maxified = false;
    let headerHeight: number;
    let windowPosition: Point = { x: 0, y: 0 };

    $: stowable = tidy !== null;

    $: _width = $resizableContext ? '100%' : (width ?? 0) + 'px';
    $: _height = $resizableContext ? '100%' : (height ?? 0) + 'px';

    $: _minWidth = $resizableContext ? null : (minWidth ?? 0) + 'px';
    $: _minHeight = $resizableContext ?  null : (minHeight ?? 0) + 'px';

    $: windowPosition.x = $movableContext ? 0 : positionX;
    $: windowPosition.y = $movableContext ? 0 : positionY;

    $: windowPositionCss = $resizableContext ? 'relative' : 'absolute';

    windowPositionContext?.subscribe(v => {
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

    const handleTidy = () => tidyWindow(tidy, { title, logo });

    $readonly: windowWidth;
    $readonly: windowHeight;
</script>

<script lang='ts' context='module'>
    type HeaderProps = {
        headerHeight: number,
        maxified: boolean,
        resizable: boolean,
        stowable: boolean,
        title: string,
        logo: string,
    };
    type HeaderEvents = {};

    export type HeaderComponent = SvelteComponentTyped<HeaderProps, HeaderEvents, {}>;

    export type WindowProps = Partial<{
        rounded: boolean,
        title: string,
        width: number,
        height: number,
        positionX: number,
        positionY: number,
        minWidth: number,
        minHeight: number,
        windowWidth: number,
        windowHeight: number,
        logo: string,
        header: ConstructorOfATypedSvelteComponent,
        tidy: ConstructorOfATypedSvelteComponent
    }>;

    export type WindowCssVars = Partial<
        Record<
            '--bg-color' | 
            '--border-color' | 
            '--border-size' | 
            '--title-color' | 
            '--window-position', 
            string
        >
    >;
</script>

<style scoped>
    :root {
        --bg-color: white;
        --border-color: white;
        --border-size: 1px;

        --title-color: black;

        --window-position: absolute;
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
        background-color: var(--bg-color);
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
    }
</style>