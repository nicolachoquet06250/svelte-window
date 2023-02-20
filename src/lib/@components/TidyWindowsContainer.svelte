{#each Object.entries($list) as [tidyWindowId, { component }]}
  <svelte:component 
        this={component} 
        id={tidyWindowId} 
        on:upset={handleUpset(tidyWindowId)} />
{/each}

<script lang="ts">
    import { useTidyWindows } from "../@composables";

    const { list, upset } = useTidyWindows();

    const handleUpset = (id: string) => () => {
        console.log('upset', $list[id].data.title);
        upset(id);
    };
</script>