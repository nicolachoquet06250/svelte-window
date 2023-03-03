{#if resizable && movable}
    <Movable {id}>
        <Resizable {id}>
            <Window 
                style={bindedStyle}
                bind:focused
                {...data} {id}>
                <slot />
            </Window>
        </Resizable>
    </Movable>
{:else if resizable}
    <Resizable {id}>
        <Window 
            style={bindedStyle}
            bind:focused
            {...data} {id}>
            <slot />
        </Window>
    </Resizable>
{:else if movable}
    <Movable {id}>
        <Window 
            style={bindedStyle}
            bind:focused
            {...data} {id}>
            <slot />
        </Window>
    </Movable>
{:else}
    <Window 
        style={bindedStyle}
        bind:focused
        {...data} {id}>
        <slot />
    </Window>
{/if}

<script lang="ts">
    import Movable from "./Movable.svelte";
    import { Resizable } from "./resizer";
    import Window from "./Window.svelte";

    export let movable = false;
    export let resizable = true;
    export let data: WindowProps = {};
    export let style: WindowCssVars = {};

    export let focused: boolean = false;

    export let id: number = 0;

    $: bindedStyle = Object.keys(style).map(k => `${k}: ${style[k]}`).join('; ');

    $readonly: focused;
</script>