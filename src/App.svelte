<main>
  <Resizable>
    <Movable>
      <Window --border-color='black'
              --header-bg-color='lightgray'
              --header-border-color='black'
              --header-border-size='1px'
              --title-color='black'
              bind:windowWidth={windowWidth}
              bind:windowHeight={windowHeight}
              title='Mon application'>
        <div style:padding-left="5px"
             style:padding-right="5px">
          <h2>Coucou</h2>
        </div>
      </Window>
    </Movable>
  </Resizable>
</main>

<script lang="ts">
  import Movable from "./lib/Movable.svelte";
  import Resizable from "./lib/Resizable.svelte";
  import Window from "./lib/Window.svelte";

  let windowWidth: number;
  let windowHeight: number;
</script>

<style>
  
</style>