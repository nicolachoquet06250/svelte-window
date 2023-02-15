<header bind:offsetHeight={headerHeight}
        bind:this={ref}
        style:cursor
        class:rounded>
    <img src={logo} alt='logo' />

    <span>{title}</span>

    <div class:actions>
        <button class:tidy> - </button>
        {#if maxified}
            <button class:minify>
                <i class="fa-solid fa-window-restore"></i>
            </button>
        {:else}
            <button class:maxify disabled={!resizable}> □ </button>
        {/if}
        <button class:close> x </button>
    </div>
</header>

<script lang='ts'>
    import type { CSSCursor } from "./helpers/cursors";

    export let headerHeight: number;
    export let ref: HTMLElement = null;
    export let logo: string;
    export let title: string;
    export let maxified: boolean;
    export let rounded = false;

    export let resizable = true;
    export let cursor: CSSCursor = 'default';

    $readonly: headerHeight;
    $readonly: ref;

    const actions = true, 
          tidy = true, 
          minify = true, 
          maxify = true, 
          close = true;
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
    }

    header > img {
        margin-right: 5px;
        margin-left: 5px;
    }

    header > span {
        color: var(--title-color);
        display: inline-block;
        flex: 1;
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
        border-color: white;
    }

    header.rounded {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>