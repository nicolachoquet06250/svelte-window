<WindowWrapper {resizable} {movable} {style} {data} bind:focused>
    <main>
        {#each $resultHistory as item}
            <div class:response-item={true}>
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
    import { useContext } from "../../../lib/@composables";

    const wFocused = writable(false);
    const { currentEscaped, resultHistory } = useCommands(wFocused);

    resultHistory.set([
        [
            `Help =><br/>
&nbsp;&nbsp;• hello &#60;name&#62;<br/>
&nbsp;&nbsp;• ls<br/>
&nbsp;&nbsp;• ls -las<br/>
&nbsp;&nbsp;• clear<br/>
En appuillant une fois sur \'tab\', votre commande se completera automatiquement`
        ]
        // ['help =>'],
        // [' • hello <name>'],
        // [' • ls'],
        // [' • ls -las'],
        // [' • clear'],
        // ['En appuillant une fois sur \'tab\', votre commande se completera automatiquement'],
    ])

    const promptContext = useContext('prompt', DefaultPrompt);

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
        header: TerminalHeader,
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

    .response-item {
        margin-bottom: 10px;
    }
</style>