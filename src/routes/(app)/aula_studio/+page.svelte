<script>
    import { viewing } from '$lib/stores';
    import { onMount } from 'svelte';
    import 'highlight.js/styles/github.css';

    export let data;
    const fetch = data.fetch;

    let renderedFile = '';

    $: $viewing && render();

    async function render(){
        renderedFile = ''
        if($viewing?._id){
            const resp = await fetch(`/api/file/${$viewing._id}/content`);
            if(resp.ok) renderedFile = await resp.text()
        }
    }

</script>

<div class="cont">
    {#if $viewing?._id}<center><h1>{$viewing.name || ''}</h1></center>{/if}
    {@html renderedFile}

    <button type="button" class="focus-btn">
        <img class="focus-img" src="/src/style/focus.png" alt="focus mode">
    </button>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .cont {
        min-height: 50vh;
        padding: 2rem 2rem;
        width: 90%;
        font-size: 1.25rem;
        line-height: 2.25rem;
        color: $dark;

        :global(p) {
        }

        :global(h2) {
            font-size: 1.75rem;
            padding: 1.75rem 0rem .75rem 0rem;
            margin-bottom: 1rem;
        }

        :global(h3) {
            font-size: 1.5rem;
            padding: 1.5rem 0rem .5rem 0rem;
        }

        :global(h2 + h3) {
            padding: 0rem 0rem .5rem 0rem;
        }

        :global(::selection) {
            background: $primary;
        }

    //     // bullet list
    //     :global(ul .list-bullet::after) {
    //         width: 4px;
    //         height: 4px;
    //         border: 1.5px solid $secondary;
    //         background: $secondary;
    //     }

    //    :global(ul ul li::marker::after) {
    //         border: 1px solid $secondary !important;
    //         background: $secondary !important;
    //     }

    //     :global(ul ul ul .list-bullet::after) {
    //         border: 1px solid $secondary;
    //         background: $secondary;
    //     }

    //     :global(ul ul ul ul .list-bullet::after) {
    //         border: 1px solid $secondary;
    //         background: $secondary;
    //     }

    //     :global(ul li::marker) {
    //         color: $dark !important;
    //     }

    //     :global(ul ul li::marker) {
    //         color: $dark !important;
    //         border: 10px !important;
    //     }

    //     /* numbered list */
    //     ol {
    //         padding-left: 20px !important;
    //     }

    //     ol li {
    //         padding-left: 5px;
    //     }

    //     ol li::marker {
    //         color: var(--background-accent) !important;
    //     }
    }   

    .focus-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .4rem;
        margin: 0rem;
        border: 1px solid rgba($dark, 0.1);
        border-radius: 1rem;
    }

    .focus-img {
        width: 2rem;
        height: 2rem;
    }
</style>
