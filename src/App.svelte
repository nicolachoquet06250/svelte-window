<svelte:head>
  <link rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" 
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" 
        crossorigin="anonymous" 
        referrerpolicy="no-referrer" />
  <title> svelte-window : Systeme de fenetrage pour Svelte.js </title>
</svelte:head>

<main>
  {#each windows as window}
    {@const {content, specificWindow = null, ..._window} = window}

    {#if specificWindow}
      <svelte:component 
        this={specificWindow} />
    {:else}
      <Window {..._window}>
        <svelte:component 
          this={content} />
      </Window>
    {/if}
  {/each}
</main>

<TaskBar />

<script lang="ts">
    import { WindowWrapper as Window, DefaultWindowContent, DefaultTidyWindow } from "./lib/@components";
    import { TaskBar } from "./@components";
    import { MacOsHeader } from "./@components/headers";
    import { Application1, Terminal } from "./@components/applications";

    const logo = '/vite.svg';

    const windows = [
      {
        movable: true,
        resizable: true,
        content: DefaultWindowContent,

        style: {
          '--border-color': 'black',
          '--header-bg-color': 'lightgray',
          '--header-border-color': 'black',
          '--header-border-size': '1px',
          '--title-color': 'black',
        },

        data: {
          title: 'Mon application rounded & movable & resizable',
          width: 600,
          height: 600,
          positionX: 0,
          positionY: 0,
          rounded: false,
          tidy: DefaultTidyWindow
        }
      },
      {
        movable: true,
        resizable: false,
        content: DefaultWindowContent,

        style: {
          '--border-color': 'black',
          '--header-bg-color': 'lightgray',
          '--header-border-color': 'black',
          '--header-border-size': '1px',
          '--title-color': 'black',
        },

        data: {
          title: 'Mon application movable',
          width: 600,
          height: 600,
          positionX: 200,
          positionY: 200,
          rounded: false,
          logo,
          tidy: DefaultTidyWindow
        }
      },
      {
        movable: true,
        resizable: true,
        content: DefaultWindowContent,

        style: {
          '--border-color': 'black',
          '--header-bg-color': 'lightgray',
          '--header-border-color': 'black',
          '--header-border-size': '1px',
          '--title-color': 'black',
        },

        data: {
          title: 'Mon application rounded & movable & resizable reversed',
          width: 600,
          height: 600,
          positionX: 0,
          positionY: 500,
          rounded: true,
          header: MacOsHeader,
          tidy: DefaultTidyWindow
        }
      },
      {
        specificWindow: Application1
      },
      {
        specificWindow: Terminal
      },
    ];
</script>
