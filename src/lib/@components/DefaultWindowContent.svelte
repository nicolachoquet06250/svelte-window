<div>
    <h2>Annexes</h2>

    <div>
        <ul>
            {#each Object.keys(links) as linkLabel}
                {@const link = links[linkLabel]}

                <li>
                    <a href={link.url} target="_blank" rel="noreferrer">
                        {#if link.icon}
                            <i class={link.icon} />
                        {:else if link.image}
                            <img src={link.image} alt="logo svelte" />
                        {/if}
                        {linkLabel}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<script lang='ts'>
    import SvelteLogo from '../../assets/svelte.svg';

    const links = {
        'GitHub': {
            url: 'https://github.com/nicolachoquet06250/svelte-window',
            icon: 'fa-brands fa-github'
        },
        'SvelteUse': {
            url: 'https://svelte-use.vercel.app/shared/tryOnMount/',
            image: SvelteLogo
        }
    };
</script>

<style scoped>
    div {
        padding-left: 5px;
        padding-right: 5px
    }
    img {
        width: 15px;
    }
    
    a {
        color: black;
    }
</style>