<WindowWrapper {resizable} {movable} {style} {data}>
    <div>
        <h1>Application 1</h1>

        <p>
            Voici un test d'application customisée
        </p>
    </div>
</WindowWrapper>

<script lang="ts">
    import DefaultTidyWindow from "../../lib/@components/DefaultTidyWindow.svelte";
    import WindowWrapper from "../../lib/@components/window/WindowWrapper.svelte";
    import MacOsHeader from "../headers/MacOsHeader.svelte";
    import type { WindowProps } from "../../lib/@components/window/Window.svelte";

    const resizable = true;
    const movable = true;

    const style = {
        '--border-color': 'black',
        '--header-bg-color': 'lightgray',
        '--header-border-color': 'black',
        '--header-border-size': '1px',
        '--title-color': 'black',
    }

    const data: WindowProps = {
        title: 'Application 1',
        header: MacOsHeader,
        rounded: true,
        tidy: DefaultTidyWindow,
        positionX: 400,
        positionY: 400
    };
</script>

<style scoped>
    div {
        padding: 10px;
    }
</style>