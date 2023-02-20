{#each resizers as resizer}
    <Resizer side={resizer}
             on:clicked 
             on:unclicked
             on:resize />
{/each}

<script lang='ts'>
    import Resizer from "./WindowResizer.svelte";
    import type { AvailableSide } from "./WindowResizer.svelte";

    export let resizers: AvailableSide[] = [];
</script>