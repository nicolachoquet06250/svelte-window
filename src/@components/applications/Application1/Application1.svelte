<WindowWrapper {resizable} {movable} {style} {data} {id}>
    <div>
        <h1>Application 1</h1>

        <p>
            Voici un test d'application customisée
        </p>
    </div>
</WindowWrapper>

<script lang="ts">
    import { DefaultTidyWindow, WindowWrapper } from "../../../lib/@components";
    import { MacOsHeader } from "../../headers";

    const resizable = true;
    const movable = true;

    export let id: number = 0;

    export let positionX = 200;
    export let positionY = 200;

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
        positionX, positionY
    };
</script>

<style scoped>
    div {
        padding: 10px;
    }
</style>