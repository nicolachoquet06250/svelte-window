<div class:wrapped style:--color={color}>
    <b>nchoquet@norsys $~ </b>
</div>

<script lang="ts">
    export let color = 'white';
    export let wrapped = false;
</script>

<style scoped>
    div {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        color: var(--color);
    }

    .wrapped, .wrapped * {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>