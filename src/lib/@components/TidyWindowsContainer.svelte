{#each Object.entries($list) as [tidyWindowId, { component }] (tidyWindowId)}
  <svelte:component 
        this={component} 
        id={tidyWindowId} 
        on:upset={handleUpset(tidyWindowId)} />
{/each}

<script lang="ts">
    import { useTidyWindows } from "../@composables";

    const { list, upset } = useTidyWindows();

    list.subscribe(v => console.log(v));

    const handleUpset = (id: string) => () => upset(id);
</script>