<div style:--color={color} class:focused />

<script lang="ts">
    export let color = 'white';
    export let focused: boolean;
</script>

<style scoped>
    div {
        height: 20px;
        width: 5px;
        background-color: var(--color);
        opacity: 1;
        cursor: text;
        display: inline-block;
        margin-bottom: -5px;
    }

    div.focused {
        animation: blink 1s ease-in infinite;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>