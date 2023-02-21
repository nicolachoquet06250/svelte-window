{#if resizable && movable}
    <Movable>
        <Resizable>
            <Window 
                --border-color={style["--border-color"]}
                --header-bg-color={style["--header-bg-color"]}
                --header-border-color={style["--header-border-color"]}
                --header-border-size={style["--header-border-size"]}
                --title-color={style["--title-color"]}
                bind:focused
                {...data}>
                <slot />
            </Window>
        </Resizable>
    </Movable>
{:else if resizable}
    <Resizable>
        <Window 
            --border-color={style["--border-color"]}
            --header-bg-color={style["--header-bg-color"]}
            --header-border-color={style["--header-border-color"]}
            --header-border-size={style["--header-border-size"]}
            --title-color={style["--title-color"]}
            bind:focused
            {...data}>
            <slot />
        </Window>
    </Resizable>
{:else if movable}
    <Movable>
        <Window 
            --border-color={style["--border-color"]}
            --header-bg-color={style["--header-bg-color"]}
            --header-border-color={style["--header-border-color"]}
            --header-border-size={style["--header-border-size"]}
            --title-color={style["--title-color"]}
            bind:focused
            {...data}>
            <slot />
        </Window>
    </Movable>
{:else}
    <Window 
        --border-color={style["--border-color"]}
        --header-bg-color={style["--header-bg-color"]}
        --header-border-color={style["--header-border-color"]}
        --header-border-size={style["--header-border-size"]}
        --title-color={style["--title-color"]}
        bind:focused
        {...data}>
        <slot />
    </Window>
{/if}

<script lang="ts">
    import Movable from "./Movable.svelte";
    import Resizable from "./resizer/Resizable.svelte";
    import Window, { type WindowCssVars, type WindowProps } from "./Window.svelte";

    export let movable = false;
    export let resizable = true;
    export let data: WindowProps = {};
    export let style: WindowCssVars = {};

    export let focused: boolean = false;

    $readonly: focused;
</script>