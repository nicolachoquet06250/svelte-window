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
    import { useWindowProps, useWindowStyle } from "../../../lib/@composables";
    import { MacOsHeader } from "../../headers";

    const resizable = true;
    const movable = true;

    export let id: number = 0;

    export let positionX = 200;
    export let positionY = 200;

    const style = useWindowStyle({
        border_color: 'black',
        header_bg_color: 'lightgray',
        header_border_color: 'black',
        header_border_size: '1px',
        title_color: 'black',
    });

    const data = useWindowProps({
        title: 'Application 1',
        header: MacOsHeader,
        rounded: true,
        tidy: DefaultTidyWindow,
        positionX, positionY
    });
</script>

<style scoped>
    div {
        padding: 10px;
    }
</style>