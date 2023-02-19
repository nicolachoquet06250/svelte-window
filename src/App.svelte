<main>
  <!-- <Window 
    --border-color='black'
    --header-bg-color='lightgray'
    --header-border-color='black'
    --header-border-size='1px'
    --title-color='black'

    title='Mon application fixed'
    width={600} height={600}
    positionX={100} positionY={200}
    Header={MainHeader}>
    <DefaultWindowContent />
  </Window> -->
  
  <Movable>
    <Resizable>
        <Window 
          --border-color='black'
          --header-bg-color='lightgray'
          --header-border-color='black'
          --header-border-size='1px'
          --title-color='black'

          title='Mon application rounded & movable & resizable'
          width={600} height={600}
          positionX={0} positionY={0}
          rounded={true} Header={MainHeader}>
          <DefaultWindowContent />
        </Window>
    </Resizable>
  </Movable>
  
  <Resizable>
    <Movable>
      <Window 
        --border-color='black'
        --header-bg-color='lightgray'
        --header-border-color='black'
        --header-border-size='1px'
        --title-color='black'

        title='Mon application rounded & movable & resizable reversed'
        width={600} height={600}
        positionX={0} positionY={500}
        rounded={true} Header={MainHeader}>
        <DefaultWindowContent />
      </Window>
    </Movable>
  </Resizable>

  <Movable>
    <Window 
      --border-color='black'
      --header-bg-color='lightgray'
      --header-border-color='black'
      --header-border-size='1px'
      --title-color='black'

      title='Mon application movable'
      width={600} height={600}
      positionX={200} positionY={200}
      Header={MainHeader}>
      <DefaultWindowContent />
    </Window>
  </Movable>
</main>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<script lang="ts">
    import Movable from "./lib/@components/window/Movable.svelte";
    import Resizable from "./lib/@components/window/resizer/Resizable.svelte";
    import Window from "./lib/@components/window/Window.svelte";
    import MainHeader from "./lib/@components/window/headers/WindowMainHeader.svelte";
    import DefaultWindowContent from "./lib/@components/DefaultWindowContent.svelte";
</script>
