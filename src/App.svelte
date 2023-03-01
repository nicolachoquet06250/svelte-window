<svelte:head>
  <link rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" 
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" 
        crossorigin="anonymous" 
        referrerpolicy="no-referrer" />
  <title> svelte-window : Systeme de fenetrage pour Svelte.js </title>
</svelte:head>

<main>
  {#each $windows as window}
    {@const {id = 0, content, specificWindow = null, ..._window} = window}

    {#if specificWindow}
      <svelte:component this={specificWindow} {id} {...(_window.data ?? {})} />
    {:else}
      <Window {..._window} {id}>
        <svelte:component this={content} />
      </Window>
    {/if}
  {/each}
</main>

<TaskBar />

<script lang="ts">
    import { WindowWrapper as Window } from "./lib/@components";
    import { TaskBar } from "./@components";
    import { Application1, Terminal } from "./@components/applications";
    import { useOpenedWindows } from "./@composables";

    const { init, windows } = useOpenedWindows();

    init([
      {
        specificWindow: Application1,
        data: {
          positionX: 100,
          positionY: 100
        }
      },
      {
        specificWindow: Terminal
      },
      {
        specificWindow: Terminal,
        data: {
          positionX: 150,
          positionY: 150
        }
      },
      {
        specificWindow: Terminal,
        data: {
          positionX: 300,
          positionY: 300
        }
      },
    ]);
</script>
