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
            {resizable} {logo}
            on:tidy={handleTidy} />
    {/if}
    
    <main>
        <slot />
    </main>
</section>

<script lang='ts'>
    import { getContext, onMount, SvelteComponentTyped } from "svelte";
    import type { 
        MovableZoneElementContext, 
        MovableContext, 
        MovableZoneElement, 
        PositionContext, 
        Point 
    } from "./Movable.svelte";
    import type { ResizableContext, WindowSizeContext } from "./resizer/Resizable.svelte";
    import logo from '../../../assets/svelte.svg';
    import { get, type Writable } from "svelte/store";
    import { windowList } from "../../@tools/window-list";
    import { useEventListener, writable } from "@svelte-use/core";
    import { useTidyWindows } from "../../@composables";

    const movableContext = getContext<MovableContext>('movable');
    const movableZoneElementContext = getContext<MovableZoneElementContext>('movable-zone-element');
    const windowPositionContext = getContext<PositionContext>('window-position');

    const resizableContext = getContext<ResizableContext>('resizable');
    const windowSizeContext = getContext<WindowSizeContext>('window-size');
    const minSizeContext = getContext<WindowSizeContext>('min-size');

    const titleContext = getContext<Writable<string>>('title');
    
    const target = writable<HTMLElement>();
    useEventListener(target, 'click', () => {
        const oldWindowList = [ ...$windowList ];
        const newWindowList = [];

        const currentIndex = $windowList.indexOf(title);
        const nextCurrentIndex = Array.from(
            oldWindowList.keys()
        ).reduce((r, c) => c > r ? c : r, 0);

        // avant l'index à bouger
        for (let i = 0; i <= currentIndex - 1; i++) {
            newWindowList.push(oldWindowList[i]);
        }

        // apres l'index à bouger
        for (let i = currentIndex + 1; i <= nextCurrentIndex; i++) {
            newWindowList.push(oldWindowList[i]);
        }

        // l'index à bouger
        newWindowList.push(title);

        $windowList = newWindowList;
    });

    onMount(() => {
        minSizeContext?.set({
            width: 500,
            height: 500
        });
        titleContext?.set(title);
        
        setTimeout(() => {
            $windowList = [...$windowList, title];
        }, 0);

        return () => {
            $windowList = $windowList
                .filter(v => v !== title);
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

    export let header: ConstructorOfATypedSvelteComponent = null;
    export let tidy: ConstructorOfATypedSvelteComponent = null;
    
    let maxified = false;
    let headerHeight: number;
    let resizable: boolean = false;
    let isMovable: boolean = false;
    let headerElement: MovableZoneElement = {
        component: null,
        element: null
    };
    let windowPosition: Point = { x: 0, y: 0 };

    $: stowable = tidy !== null;

    $: _width = resizable ? '100%' : (width ?? 0) + 'px';
    $: _height = resizable ? '100%' : (height ?? 0) + 'px';

    $: _minWidth = resizable ? null : (minWidth ?? 0) + 'px';
    $: _minHeight = resizable ?  null : (minHeight ?? 0) + 'px';

    $: windowPosition.x = isMovable ? 0 : positionX;
    $: windowPosition.y = isMovable ? 0 : positionY;

    $: windowPositionCss = resizable ? 'relative' : 'absolute';

    resizableContext?.subscribe(v => (resizable = v));
    movableContext?.subscribe(v => (isMovable = v));
    windowPositionContext?.subscribe(v => {
        !resizable && (windowPosition.x = v.x);
        !resizable && (windowPosition.y = v.y);
    });
    movableZoneElementContext?.subscribe(v => {
        v.component && v.element && (() => {
            headerElement.component = v.component;
            headerElement.element = v.element;
        })();
    });
    windowList.subscribe(v => v.indexOf(title))

    $: resizable && windowSizeContext.update(v => ({...v, width: windowWidth}));
    $: resizable && windowSizeContext.update(v => ({...v, height: windowHeight}));

    $: positionX && isMovable && windowPositionContext.update(v => ({ ...v, x: positionX }));
    $: positionY && isMovable && windowPositionContext.update(v => ({ ...v, y: positionY }));

    $: headerElement.element && movableZoneElementContext?.set({...get(movableZoneElementContext), element: headerElement.element});

    $readonly: windowWidth;
    $readonly: windowHeight;

    const { list: tidyWindowList, tidy: tidyWindow } = useTidyWindows();

    const handleTidy = () => {
        console.log('tidy', title);
        tidyWindow(tidy, {
            title,
            logo
        });
    };
</script>

<script lang='ts' context='module'>
    type HeaderProps = {
        headerHeight: number,
        maxified: boolean,
        title: string,
        logo: string,
        resizable: boolean,
        stowable: boolean
    };
    type HeaderEvents = {};

    export type HeaderComponent = SvelteComponentTyped<HeaderProps, HeaderEvents, {}>;
</script>

<style scoped>
    :root {
        --bg-color: white;
        --border-color: white;
        --border-size: 1px;

        --title-color: black;

        --window-position: absolute;
        --z-index: 0;
    }

    section.window {
        min-width: 500px;
        min-height: 500px;
        height: 100%;
        border-style: solid;
        box-sizing: border-box;
        position: var(--window-position);
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