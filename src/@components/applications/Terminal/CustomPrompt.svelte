<div class:wrapped style:--color={color}>
    <section class:username={true}> nchoquet </section>
    <section class:separator={true}> @ </section>
    <section class:computer={true}> norsys </section>
    <b> ~ </b>
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
        width: max-content;
    }

    div > *:not(b) {
        margin-left: 2px;
        margin-right: 2px;
        padding: 2px;
        border-radius: 5px;
        border: 1px solid black;
    }

    div > .username {
        background-color: skyblue;
    }

    div > .separator {
        background-color: blueviolet;
        color: white;
    }

    div > .computer {
        background-color: peru;
    }

    div > section {
        width: max-content;
    }

    div > b {
        width: 20px;
    }

    .wrapped, .wrapped * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>