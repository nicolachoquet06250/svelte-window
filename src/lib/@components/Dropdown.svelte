<div class="select-wrapper" 
    class:rounded 
    on:mousedown={handleToggleDropDown} 
    bind:this={$select}>
    <div class:select={true} class:open={toogleOpen}>
        <div class="select__trigger">
            <span>
                <slot name="selected" selected={selected}>
                    {selected.substring(0, 1).toUpperCase()}{selected.substring(1)}
                </slot>
            </span>

            <div class="arrow"/>
        </div>

        <div class="custom-options">
            {#if Array.isArray(options)}
                {#each options as key}
                    <span 
                        class="custom-option" 
                        class:selected={selected === key}
                        data-value="toto"
                        on:mousedown={() => selected = key}>
                        <slot name="option" 
                            value={key}
                            content={options[key]}
                            selected={selected === key}></slot>
                    </span>
                {/each}
            {:else}
                {#each Object.keys(options) as key}
                    <span 
                        class="custom-option" 
                        class:selected={selected === key}
                        data-value="toto"
                        on:mousedown={() => selected = key}>
                        <slot name="option" 
                            value={key}
                            content={options[key]}
                            selected={selected === key}>
                            {options[key]}
                        </slot>
                    </span>
                {/each}
            {/if}
        </div>
    </div>
</div>

<script lang='ts'>
    import { onClickOutside, writable } from "@svelte-use/core";

    const select = writable<HTMLElement>();

    export let selected: string = '';
    export let rounded: boolean = false;
    export let options: Record<string, string>|string[] = [];

    let toogleOpen = false;

    onClickOutside(select, () => (toogleOpen = false));

    const handleToggleDropDown = () => (toogleOpen = !toogleOpen);
</script>

<style scoped>
    /* http://meyerweb.com/eric/tools/css/reset/ v2.0 | 20110126 License: none (public domain) */
    /* HTML5 display-role reset for older browsers */
    .arrow {
        position: relative;
        height: 15px;
        width: 15px;
        margin-right: 5px;
    }
    .arrow::before, .arrow::after {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 0.15rem;
        height: 100%;
        transition: all 0.5s;
    }
    .arrow::before {
        left: -5px;
        transform: rotate(45deg);
        background-color: #394a6d;
    }
    .arrow::after {
        left: 5px;
        transform: rotate(-45deg);
        background-color: #394a6d;
    }
    .open .arrow::before {
        left: -5px;
        transform: rotate(-45deg);
    }
    .open .arrow::after {
        left: 5px;
        transform: rotate(45deg);
    }
    .rounded.select-wrapper,
    .rounded .select,
    .rounded .select__trigger {
        border-radius: 5px;
    }
    .select-wrapper {
        position: relative;
        user-select: none;
        width: 100%;
    }
    .select {
        position: relative;
        display: flex;
        flex-direction: column;
        border-width: 0 2px 0 2px;
        border-style: solid;
        border-color: #394a6d;
        width: 100%;
    }
    .select__trigger {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: max-content;
        font-size: 20px;
        font-weight: 300;
        padding-left: 22px;
        color: #3b3b3b;
        background: #ffffff;
        cursor: pointer;
        border-width: 2px 0 2px 0;
        border-style: solid;
        border-color: #394a6d;
        width: 100%;
    }
    .custom-options {
        position: absolute;
        display: block;
        top: 100%;
        left: 0;
        right: 0;
        border: 2px solid #394a6d;
        border-top: 0;
        background: #fff;
        transition: all 0.5s;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        z-index: 2;
    }
    .select.open .custom-options {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        /* A améliorer */
        width: calc(100% + 14px);
    }
    .custom-option {
        position: relative;
        /* display: block; */
        display: inline-block;
        /* padding: 0 22px 0 22px; */
        font-size: 22px;
        font-weight: 300;
        color: #3b3b3b;
        cursor: pointer;
        transition: all 0.5s;
    }
    .custom-option:hover {
        cursor: pointer;
        background-color: #b2b2b2;
    }
    .custom-option.selected {
        color: #ffffff;
        background-color: #305c91;
    }
</style>