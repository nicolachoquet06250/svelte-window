<WindowWrapper 
    {resizable} {movable}
    style={_style} {data}
    {id} bind:focused
>
    <div bind:this={el}>
        <h1>Application 1</h1>

        <p>
            Voici un test d'application customisée
        </p>
    </div>

    <ContextMenu 
        x={$contextMenuPositionX}
        y={$contextMenuPositionY}
        opened={$opened}
        items={contextMenuItems}
        {focused}

        on:close={handleClose}
    />
</WindowWrapper>

<svelte:options accessors />

<script lang="ts">
    import { DefaultTidyWindow, WindowWrapper } from "../../../lib/@components";
    import { useContextMenu, useWindowProps, useWindowStyle } from "../../../lib/@composables";
    import { MacOsHeader } from "../../headers";
    import ContextMenu from "./ContextMenu.svelte";

    const resizable = true;
    const movable = true;

    const { 
        opened, contextMenuItems,
        x: contextMenuPositionX, 
        y: contextMenuPositionY, 
        close
    } = useContextMenu([
        {
            label: 'Toggle Blanc/Rouge',
            shortcut: {
                metaKey: true,
                key: 't'
            },
            action(_, { component }) {
                component.style = component.style.bg_color === 'red' ? {
                    ..._style,
                    bg_color: 'white'
                } : {
                    ..._style,
                    bg_color: 'red'
                };

                console.log('premier menu contextuel');

                // console.log(component);
            }
        }
    ]);

    let focused: boolean;

    export let el: HTMLElement;
    export let id: number = 0;
    export let positionX = 200;
    export let positionY = 200;

    export let style: WindowCss = {};
    $: _style = useWindowStyle({
        border_color: 'black',
        header_bg_color: 'lightgray',
        header_border_color: 'black',
        header_border_size: '1px',
        title_color: 'black',
        ...style
    });

    const data = useWindowProps({
        title: 'Application 1',
        header: MacOsHeader,
        rounded: true,
        tidy: DefaultTidyWindow,
        positionX, positionY
    });

    $readonly: el;

    const handleClose = () => {
        close();
    };
</script>

<style scoped>
    div {
        padding: 10px;
        height: calc(100% - 20px);
    }
</style>