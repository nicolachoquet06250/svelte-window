<div style:--z-index={[...$list.keys()].length}>
    <TidyWindowsContainer />
</div>

<script lang="ts">
    import TidyWindowsContainer from '../lib/@components/TidyWindowsContainer.svelte';
    import { useFocus } from '../lib/@composables';

    const { list } = useFocus();
</script>

<style scoped>
    :root {
        --z-index: 1;
    }

    div {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        border-top: 1px solid black;
        background-color: white;
        z-index: var(--z-index);
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>