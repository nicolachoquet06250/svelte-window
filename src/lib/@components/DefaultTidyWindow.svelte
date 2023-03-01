<div bind:this={$target}
     {title}>
    {#if typeof logo === 'string'}
        <img src={logo} alt={title} />
    {:else}
        <svelte:component this={logo} />
    {/if}
    <span>{title}</span>
</div>

<script lang="ts">
    import { useEventListener, writable } from "@svelte-use/core";
    import { createEventDispatcher } from "svelte";
    import { useTidyWindows } from "../@composables";

    const dispatch = createEventDispatcher();

    export let id: number;

    const { current } = useTidyWindows(id); 

    $: title = current.data.title;
    $: logo = current.data.logo;

    const target = writable<HTMLDivElement>();
    useEventListener(target, 'click', () => dispatch('upset'));
</script>

<style scoped>
    div {
        width: 200px;
        height: 50px; 
        border: 1px solid black;
        border-bottom: none;
        border-top: none;
        bottom: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color: white;
    }

    div > img {
        width: 15px;
        height: 15px;
        margin-left: 5px;
        margin-right: 5px;
    }

    div > span {
        display: inline-block;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>