<WindowWrapper {resizable} {movable} style={_style} {data} {id} bind:focused>
    <main>
        {#each $resultHistory as item}
            <div class:response-item={true}>
                {#if item.length > 0}
                    <svelte:component 
                        this={$promptContext}
                        color='black' />
                {/if}
                {#each item as e}
                    <div>
                        {@html e}
                    </div>
                {/each}
            </div>
        {:else}
            <div/>
        {/each}
        <div>
            <svelte:component 
                this={$promptContext}
                color='black' />
                <span>{@html $currentEscaped} </span>
                <Cursor color='black' {focused} />
        </div>
    </main>
</WindowWrapper>

<script lang="ts">
    import { DefaultTidyWindow, WindowWrapper } from "../../../lib/@components";
    import logo from "./Logo.svelte";
    import Cursor from "./Cursor.svelte";
    import DefaultPrompt from "./DefaultPrompt.svelte";
    import { useCommands } from "./composables";
    import { writable } from "svelte/store";
    import TerminalHeader from "./TerminalHeader.svelte";
    import { useContext, useWindowProps, useWindowStyle } from "../../../lib/@composables";
    import { onMount } from "svelte";

    const wFocused = writable(false);
    const { currentEscaped, resultHistory, setCommand, execute } = useCommands(wFocused);

    const promptContext = useContext('prompt', DefaultPrompt);

    const movable = true;
    export let resizable: boolean = false;

    export let id: number = 0;

    export let positionX = 400;
    export let positionY = 400;

    let focused: boolean;

    $: $wFocused = focused;

    export let style: WindowCss = {};

    const _style = useWindowStyle({
        border_color: 'black',
        header_bg_color: 'lightgray',
        header_border_color: 'black',
        header_border_size: '1px',
        title_color: 'black',
        ...style
    });

    const data = useWindowProps({
        title: 'Terminal',
        rounded: true,
        tidy: DefaultTidyWindow,
        header: TerminalHeader,
        positionX, positionY,
        logo
    });

    onMount(() => {
        setCommand('help');
        execute();
    })
</script>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        height: calc(100% - 20px);
        padding: 10px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        overflow: auto;
        cursor: text;
        overflow-wrap: break-word;
        hyphens: auto;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }

    main > div {
        height: min-content;
    }

    .response-item {
        margin-bottom: 10px;
    }
</style>