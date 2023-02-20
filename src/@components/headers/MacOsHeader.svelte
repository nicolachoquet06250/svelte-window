<header bind:offsetHeight={headerHeight}
        bind:this={element}
        style:cursor class:rounded>
    <div class:actions>
        <button class:close />

        {#if maxified}
            <button class:minify />
        {:else}
            <button class:maxify 
                    disabled={!resizable} 
                    on:click={handleMaxify} />
        {/if}

        <button class:tidy
                disabled={!stowable}
                on:click={handleTidy} />
    </div>

    <span class:long={title.length >= 30}>
        {title}
    </span>
</header>

<script lang='ts'>
    import { createEventDispatcher } from "svelte";
    import { get_current_component, onMount } from "svelte/internal";
    import { get } from "svelte/store";
    import { getContext } from "../../lib/@composables";
    import type { CSSCursor } from "../../lib/@tools/cursors";
    import type { MovableZoneElement } from "../../lib/@components/window/Movable.svelte";

    const actions = true, 
          tidy = true, 
          minify = true, 
          maxify = true, 
          close = true;

    const dispatch = createEventDispatcher();
    const component = get_current_component();

    export let headerHeight: number;
    export let title: string;
    export let maxified: boolean;
    export let rounded = false;

    export let stowable = true;
    export let resizable = true;
    export let cursor: CSSCursor = 'default';

    let element: HTMLElement = null;
    
    const movableZoneElementContext = getContext<MovableZoneElement>(
        'movable-zone-element'
    );
    const fullscreenContext = getContext<boolean>('fullscreen');

    const handleMaxify = () => 
        fullscreenContext.set(!get(fullscreenContext));

    const handleTidy = () => dispatch('tidy');

    $readonly: headerHeight;

    onMount(() => {
        $movableZoneElementContext = { element, component };
    });
</script>

<style scoped>
    :root {
        --header-bg-color: white;
        --header-border-color: white;
        --header-border-size: 1px;
        --header-height: 40px;
        --header-width: 0px;
    }

    header {
        height: var(--header-height);
        position: absolute;
        top: 0;
        width: calc(var(--header-width) - 2px);
        box-sizing: border-box;

        display: flex;
        justify-content: space-around;
        align-items: center;
        
        background-color: var(--header-bg-color);
        border-bottom-style: solid;
        border-bottom-width: var(--header-border-size);
        border-bottom-color: var(--header-border-color);
        user-select: none;
    }

    header.rounded {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    header > span {
        color: var(--title-color);
        display: inline-block;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }

    header > span:not(.long) {
        margin-left: -65px;
    }

    header > .actions {
        align-self: flex-start;
        height: var(--header-height);
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    header > .actions > button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        flex: 1;
        margin: 5px;
        padding: 0;
        margin-top: calc(5px - var(--header-border-size));
        cursor: pointer;
        background-color: white;
        border-width: 2px;
        border-style: solid;
        border-color: black;
        transition: 
            color .2s ease-out,
            background-color .2s ease-out,
            border-color .2s ease-out;
    }

    header > .actions > button:hover {
        border-color: rgba(255, 255, 255, .5)!important;
    }

    header > .actions > button:disabled {
        background-color: rgba(255, 255, 255, .5)!important;
        border-color: rgba(255, 255, 255, .5)!important;
        cursor: default;
    }

    header > .actions > button:first-of-type {
        margin-right: 0;
    }

    header > .actions > button:last-of-type {
        margin-left: 0;
    }

    header > .actions > button.close {
        background-color: #F25056;
        border-color: #F25056;
    }

    header > .actions > button.minify,
    header > .actions > button.maxify {
        background-color: #FAC536;
        border-color: #FAC536;
    }

    header > .actions > button.tidy {
        background-color: #39EA49;
        border-color: #39EA49;
    }
</style>