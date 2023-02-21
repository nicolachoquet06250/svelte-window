<WindowWrapper {resizable} {movable} {style} {data} bind:focused>
    <div>
        <svelte:component 
            this={DefaultPrompt}
            color='black' />
            <span>{@html command} </span>
            <Cursor color='black' {focused} />
    </div>
</WindowWrapper>

<script lang="ts">
    import { DefaultTidyWindow, WindowWrapper } from "../../../lib/@components";
    import type { WindowProps } from "../../../lib/@components";
    import logo from "./Logo.svelte";
    import Cursor from "./Cursor.svelte";
    import DefaultPrompt from "./DefaultPrompt.svelte";
    import { useEventListener } from "@svelte-use/core";

    const resizable = true;
    const movable = true;

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

    let command = '';
    let focused: boolean;

    useEventListener('keypress', e => {
        command += e.key === ' ' ? '&nbsp;' : e.key;
    })

    useEventListener('keydown', e => {
        if (e.key === 'Backspace') {
            command = command.substring(command.length - '&nbsp;'.length) === '&nbsp;' ? 
                command.substring(0, command.length - '&nbsp;'.length) : 
                    command.substring(0, command.length - 1);
        }
        console.log(e);
    })
</script>

<style scoped>
    div {
        padding: 10px;
        height: calc(100% - 20px);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        overflow: auto;
        cursor: text;
        overflow-wrap: break-word;
        hyphens: auto;
    }
</style>