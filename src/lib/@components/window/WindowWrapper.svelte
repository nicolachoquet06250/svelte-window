{#if resizable && movable}
    <Movable {id}>
        <Resizable {id}>
            <Window 
                --border-color={style["--border-color"]}
                --header-bg-color={style["--header-bg-color"]}
                --header-border-color={style["--header-border-color"]}
                --header-border-size={style["--header-border-size"]}
                --title-color={style["--title-color"]}
                bind:focused
                {...data} {id}>
                <slot />
            </Window>
        </Resizable>
    </Movable>
{:else if resizable}
    <Resizable {id}>
        <Window 
            --border-color={style["--border-color"]}
            --header-bg-color={style["--header-bg-color"]}
            --header-border-color={style["--header-border-color"]}
            --header-border-size={style["--header-border-size"]}
            --title-color={style["--title-color"]}
            bind:focused
            {...data} {id}>
            <slot />
        </Window>
    </Resizable>
{:else if movable}
    <Movable {id}>
        <Window 
            --border-color={style["--border-color"]}
            --header-bg-color={style["--header-bg-color"]}
            --header-border-color={style["--header-border-color"]}
            --header-border-size={style["--header-border-size"]}
            --title-color={style["--title-color"]}
            bind:focused
            {...data} {id}>
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

    $readonly: focused;
</script>