{#each Object.entries($list) as [tidyWindowId, { component }]}
  <svelte:component 
        this={component} 
        id={tidyWindowId} 
        on:upset={handleUpset(tidyWindowId)} />
{/each}

<!-- 
  @TODO Régler le bug qui fait que quand on range les 2 fenetres et qu'on re agrandi la premiere, 
  la case reste avec le meme logo et le meme titre 
-->

<script lang="ts">
    import { useTidyWindows } from "../@composables";

    const { list, upset } = useTidyWindows();

    const handleUpset = (id: string) => () => upset(id);
</script>