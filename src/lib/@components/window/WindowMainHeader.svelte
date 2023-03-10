<header bind:offsetHeight={headerHeight}
        bind:this={element}
        style:cursor class:rounded>
    {#if typeof logo === 'string'}
        <img src={logo} alt='logo' />
    {:else}
        <svelte:component this={logo} />
    {/if}

    <span>
        {title}
    </span>

    <div class:actions>
        <button class:tidy 
                class:rounded
                disabled={!stowable}
                on:click={handleTidy}> 
            - 
        </button>

        {#if maxified}
            <button class:minify
                    class:rounded>
                <i class="fa-solid fa-window-restore"/>
            </button>
        {:else}
            <button class:maxify 
                    class:rounded
                    disabled={!resizable} 
                    on:click={handleMaxify}> 
                □ 
            </button>
        {/if}

        <button class:close
                class:rounded
                on:click={handleClose}>
            x
        </button>
    </div>
</header>

<script lang='ts'>
    import type { CSSCursor, MovableZoneElement } from "svelte-window";
    import { useEventListener } from "@svelte-use/core";
    import { createEventDispatcher } from "svelte";
    import { get_current_component, onMount } from "svelte/internal";
    import { useFocus, getContext } from "../../@composables";

    const actions = true, 
          tidy = true, 
          minify = true, 
          maxify = true, 
          close = true;

    const { focus } = useFocus();

    const dispatch = createEventDispatcher();

    const component = get_current_component();

    export let id: number = 0;

    export let headerHeight: number;
    export let logo: string | ConstructorOfATypedSvelteComponent;
    export let title: string;
    export let maxified: boolean;
    export let rounded = false;
    export let stowable = true;
    export let resizable = true;
    export let cursor: CSSCursor = 'default';

    let element: HTMLElement = null;
    
    const movableZoneElementContext = getContext<
        MovableZoneElement
    >('movable-zone-element');
    const fullscreenContext = getContext<boolean>('fullscreen');

    onMount(() => {
        $movableZoneElementContext = { element, component };
    });

    useEventListener(element, 'mousedown', () => focus(id));

    const handleMaxify = () => 
        ($fullscreenContext = !$fullscreenContext);

    const handleTidy = () => dispatch('tidy');
    const handleClose = () => dispatch('close');

    $readonly: headerHeight;
</script>

<style scoped>
    :root {
        --header-bg-color: white;
        --header-border-color: white;
        --header-border-size: 1px;
        --header-height: 40px;
    }

    header {
        height: var(--header-height);
        position: absolute;
        top: 0;
        width: 100%;
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

    header > img {
        margin-right: 5px;
        margin-left: 5px;
    }

    header > span {
        color: var(--title-color);
        display: inline-block;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    header > .actions {
        align-self: flex-start;
        height: var(--header-height);
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    header > .actions > button {
        height: calc(var(--header-height) - (8px + var(--header-border-size)));
        flex: 1;
        width: calc(var(--header-height) - (8px + var(--header-border-size)));
        margin: 5px;
        margin-top: calc(5px - var(--header-border-size));
        color: black;
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: white;
        border-style: solid;
        border-color: black;
        transition: 
            color .2s ease-out,
            background-color .2s ease-out;
    }

    header > .actions > button.rounded {
        border-radius: 5px;
    }

    header > .actions > button:disabled {
        background-color: rgba(255, 255, 255, .5);
    }

    header > .actions > button:disabled:hover {
        background-color: rgba(255, 255, 255, .5);
        border-color: black;
        cursor: initial;
    }

    header > .actions > button:first-of-type {
        margin-right: 0;
    }

    header > .actions > button:last-of-type {
        margin-left: 0;
    }

    header > .actions > button:hover {
        background-color: rgba(255, 255, 255, .5);
        border-color: white;
    }

    header > .actions > button.close:hover {
        color: white;
        background-color: red;
        border-color: red;
    }

    header.rounded {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>