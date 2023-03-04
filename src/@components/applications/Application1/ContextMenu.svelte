{#if opened}
    <div 
        bind:this={el}
        in:fade out:fade

        class:context-menu={true} 
        style:--position-x={`${x}px`}
        style:--position-y={`${y}px`}
    >
        {#each items as item}
            <button on:click={handleItemClick(item.action)}>
                <span>
                    {item.label}
                </span>
                
                {#if item.shortcut}
                    <span>
                        {#if item.shortcut.ctrlKey}
                            Ctrl + 
                            {#if item.shortcut.shiftKey}
                                Maj +
                            {:else if item.shortcut.altKey}
                                Alt +
                            {/if}
                        {:else if item.shortcut.metaKey}
                            Win +
                        {/if}
                        {item.shortcut.key}
                    </span>
                {/if}
            </button>
        {/each}
    </div>
{/if}

<svelte:window on:keypress={handleKeypress} />

<script lang="ts">
    import type { ContextMenuAction, ContextMenuItems } from "svelte-window";
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    let el: HTMLElement;

    export let x: number = 0;
    export let y: number = 0;
    export let opened: boolean = false;
    export let items: ContextMenuItems = [];
    export let focused: boolean = false;

    const dispatch = createEventDispatcher();

    const handleItemClick = (action: ContextMenuAction) => (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        action({});

        dispatch('close');
    };

    const handleKeypress = (e: KeyboardEvent) => {
        if (focused) {
            for (const item of items) {
                const {
                    altKey = false,
                    metaKey = false,
                    ctrlKey = false,
                    shiftKey = false,
                    key = null
                } = (item.shortcut ?? {});

                const keyMatch = key === e.key
                const ctrlMatch = ctrlKey && e.ctrlKey
                const altMatch = altKey && e.altKey
                const shiftMatch = shiftKey && e.shiftKey
                const metaMatch = metaKey && e.metaKey

                if (
                    (keyMatch && ctrlMatch) || 
                    (keyMatch && ctrlMatch && altMatch) || 
                    (keyMatch && ctrlMatch && shiftMatch) || 
                    (keyMatch && metaMatch)
                ) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    item.action();
                }
            }
        }
    };
</script>

<style scoped>
    div {
        position: absolute;
        left: var(--position-x);
        top: var(--position-y);

        min-width: 300px;
        min-height: 20px;
        padding: 0;
    }

    div > button {
        width: 100%;
        min-height: 20px;
        font-size: 18px;
        margin: 0;
        border: 1px solid black;
        background-color: white;
        color: black;
        cursor: pointer;
        transition: 
            background-color .4s ease-in-out, 
            color .4s ease-in-out;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    div > button > span:first-of-type {
        text-transform: capitalize;
    }

    div > button > span {
        text-align: left;
        display: inline-block;
    }

    div > button:hover {
        background-color: royalblue;
        color: white;
    }
</style>