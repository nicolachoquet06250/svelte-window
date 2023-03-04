{#each $windows as window (window.id)}
    {@const {
        id = 0, 
        specificWindow = null, 
        style = {}, 
        data = {}
    } = window}

    {#if specificWindow}
        <svelte:component 
            this={specificWindow} {id} 
            {...data} {style}
        />
    {/if}
{/each}

<script lang="ts">
    import { useOpenedWindows } from "../../@composables";

    const { windows } = useOpenedWindows();
</script> 