<main>
  <Window 
    --border-color='black'

    --header-bg-color='lightgray'
    --header-border-color='black'
    --header-border-size='1px'

    --title-color='black'

    title='Mon application fixed'
    
    width={600} height={600}
    
    positionX={100} positionY={200}
    
    Header={MainHeader}>
    <div style:padding-left="5px"
          style:padding-right="5px">
      <h2>Coucou</h2>
    </div>
  </Window>
  
  <Resizable>
    <Movable>
      <Window 
        --border-color='black'

        --header-bg-color='lightgray'
        --header-border-color='black'
        --header-border-size='1px'

        --title-color='black'

        title='Mon application rounded'
        
        width={600} height={600}
        
        positionX={300} positionY={400}
        
        rounded={true}
    
        Header={MainHeader}>
        <div style:padding-left="5px"
              style:padding-right="5px">
          <h2>Coucou</h2>
        </div>
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
      
      positionX={50}
    
      Header={MainHeader}>
      <div style:padding-left="5px"
            style:padding-right="5px">
        <h2>Coucou</h2>
      </div>
    </Window>
  </Movable>

  <Resizable>
    <Movable>
      <Window 
        --border-color='black'

        --header-bg-color='lightgray'
        --header-border-color='black'
        --header-border-size='1px'

        --title-color='black'

        title='Mon application movable & resizable'

        width={600}
        height={600}

        Header={MainHeader}>
        <div style:padding-left="5px"
             style:padding-right="5px">
          <h2>Coucou</h2>
        </div>
      </Window>
    </Movable>
  </Resizable>
</main>

<script lang="ts">
    import Movable from "./lib/@components/window/Movable.svelte";
    import Resizable from "./lib/@components/window/Resizable.svelte";
    import Window from "./lib/@components/window/Window.svelte";
    import MainHeader from "./lib/@components/window/headers/WindowMainHeader.svelte";
</script>

<style>
  
</style>