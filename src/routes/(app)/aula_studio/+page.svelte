<script>
    import { viewing } from '$lib/stores';
    import { onMount } from 'svelte';

    export let data;
    const fetch = data.fetch;

    let renderedFile = '';

    $: $viewing?._id && render();

    async function render(){
        const resp = await fetch(`/api/file/${$viewing._id}/content`);
        renderedFile = ''
        if(resp.ok) renderedFile = await resp.text()
    }
</script>

<div class="cont">
    {@html renderedFile}
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .cont {
        min-height: 50vh;
        padding: 2rem 2rem;
        width: 90%;

        :global(p) {
            font-size: 1rem;
        }

        :global(h2) {
            font-size: 1.5rem;
            background: $primary;
            padding: 5px 10px 2px 10px;
            border: 1px solid $dark;
            border-radius: .4rem;
            box-shadow: .0rem .4rem rgba($dark, 0.5); 
            transition: .1s;
            margin-bottom: 1rem;
        }

        :global(h2:hover) {
            box-shadow: .0rem .2rem rgba($dark, 0.5);
            transform: translate(0rem, .2rem);
        }
        
        :global(h3) {
            font-size: 1.25rem;
            text-decoration: $secondary underline;
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
</style>
