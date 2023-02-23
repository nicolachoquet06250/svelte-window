<WindowWrapper {resizable} {movable} {style} {data} bind:focused>
    <main>
        {#each $resultHistory as item}
            <div>
                {@html item}
            </div>
        {:else}
            <div/>
        {/each}
        <div>
            <svelte:component 
                this={DefaultPrompt}
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

    const wFocused = writable(false);
    const { currentEscaped, resultHistory } = useCommands(wFocused);

    const resizable = true;
    const movable = true;

    let focused: boolean;

    $: $wFocused = focused;

    const style = {
        '--border-color': 'black',
        '--header-bg-color': 'lightgray',
        '--header-border-color': 'black',
        '--header-border-size': '1px',
        '--title-color': 'black',
    };

    const data: WindowProps = {
        title: 'Terminal',
        rounded: true,
        tidy: DefaultTidyWindow,
        positionX: 400,
        positionY: 400,
        logo
    };
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

    main > div {
        height: min-content;
    }
</style>