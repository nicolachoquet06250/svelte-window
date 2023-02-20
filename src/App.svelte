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
    {@const {content, ..._window} = window}

    <Window {..._window}>
      <svelte:component 
        this={content} />
    </Window>
  {/each}
</main>

<TaskBar />

<script lang="ts">
    import DefaultWindowContent from "./lib/@components/DefaultWindowContent.svelte";
    import DefaultTidyWindow from "./lib/@components/DefaultTidyWindow.svelte";
    import TaskBar from "./@components/TaskBar.svelte";
    import Window from "./lib/@components/window/WindowWrapper.svelte";
    import MacOsHeader from "./@components/headers/MacOsHeader.svelte";

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
      }
    ];
</script>
