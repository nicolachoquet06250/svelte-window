{#each Object.entries(groupedList) as [title, group] (title)}
  <div class:same-title-container={true}>
    {#each group as details (details.id)}
      <svelte:component 
        this={details.component} 
        id={details.id} 
        on:upset={handleUpset(`${details.id}`)} />
    {/each}
  </div>
  
{/each}

<script lang="ts">
    import { useTidyWindows } from "../@composables";

    const { list, upset } = useTidyWindows();
    let groupedList: {
      [title: string]: {
        component: ConstructorOfATypedSvelteComponent,
        data: Record<string, any>,
        id: number
      }[]
    }

    $: groupedList = Object.entries($list).reduce((r, [id, detail]) => {
      return {
        ...r,
        [detail.data.title]: [
          ...(r[detail.data.title] ?? []),
          {
            ...detail,
            id
          }
        ]
      };
    }, {});

    $: console.log(groupedList);

    const handleUpset = (id: string) => () => upset(parseInt(id));
</script>

<style scoped>
  .same-title-container {
    position: relative;
    height: 100%;
    width: 220px;
  }
  :global(.same-title-container > div:first-of-type) {
    left: 20px;
    position: absolute;
    -webkit-box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66); 
    box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66);
  }
  :global(.same-title-container > div:first-of-type:last-of-type) {
    left: 0;
    position: absolute;
    -webkit-box-shadow: none; 
    box-shadow: none;
  }
  :global(.same-title-container > div:nth-of-type(2):not(:last-of-type)) {
    position: absolute;
    left: 10px;
    -webkit-box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66); 
    box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66);
  }
  :global(.same-title-container > div:nth-of-type(2):last-of-type) {
    position: absolute;
    left: 0;
    -webkit-box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66); 
    box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66);
  }
  :global(.same-title-container > div) {
    position: absolute;
    left: 0;
    -webkit-box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66); 
    box-shadow: 7px 2px 8px -1px rgba(0,0,0,0.66);
  }
</style>