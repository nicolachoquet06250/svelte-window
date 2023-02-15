{#each resizers as resizer}
    <Resizer side={resizer} 
             on:clicked 
             on:unclicked
             on:resize />
{/each}

<script lang='ts'>
    import type { AvailableSide } from "./WindowResizer.svelte";
    import Resizer from "./WindowResizer.svelte";

    export let resizers: AvailableSide[] = [];
</script>