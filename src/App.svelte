<svelte:head>
  <link rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" 
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" 
        crossorigin="anonymous" 
        referrerpolicy="no-referrer" />
  <title> svelte-window : Systeme de fenetrage pour Svelte.js </title>
</svelte:head>

<main>
  <WindowPull />
</main>

<TaskBar />

<script lang="ts">
  import { TaskBar } from "./@components";
  import { Application1, Terminal } from "./@components/applications";
  import { useOpenedWindows } from "./@composables";
  import WindowPull from "./lib/@components/WindowPull.svelte";

  const { init } = useOpenedWindows();

  init([
    {
      specificWindow: Application1,
      data: {
        positionX: 100,
        positionY: 101
      }
    },
    {
      specificWindow: Terminal
    },
    {
      specificWindow: Terminal,
      data: {
        positionX: 150,
        positionY: 150,
        resizable: true
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
