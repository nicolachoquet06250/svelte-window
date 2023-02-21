<WindowWrapper {resizable} {movable} {style} {data}>
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
    import type { WindowProps } from "../../../lib/@components";

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