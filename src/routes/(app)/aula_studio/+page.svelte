<script>
    import { viewing } from '$lib/stores';
    import 'highlight.js/styles/github.css';
    import ActiveButton from '$lib/components/ActiveButton.svelte'
    export let data;
    const fetch = data.fetch;

    let renderedFile = '';

    $: $viewing && render();

    async function render() {
        renderedFile = ''
        if ($viewing?._id) {
            const resp = await fetch(`/api/file/${$viewing._id}/content`);
            if (resp.ok) 
                renderedFile = await resp.text()
        }
    }

    let focus_mode = false
</script>

<div class="focus-mode-btn">
    <ActiveButton active={focus_mode == true ? 'active' : 'not-active'}>
        <div slot="name" class="navbar-item rounded-3">
            <a class="d-block px-3 py-2 text-decoration-none" on:click={() => focus_mode = !focus_mode}><i class="display-3 bi bi-crosshair{focus_mode == true ? '2' : ''}"></i></a>
        </div>
    </ActiveButton>
</div>

<div class="content">
    <div class="file">
        {#if $viewing?._id}
            <h1>{$viewing.name || ''}</h1>
        {/if}
        {@html renderedFile}
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .content {
        min-height: 50vh;
        width: auto;
        font-size: 1.25rem;
        line-height: 2.25rem;
        color: $dark;
        transition: all 1s;
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
    .focus-mode-btn {
        cursor: pointer;
        position: absolute;
        z-index: 2;
        top: .25rem;
        left: .25rem;
        transition: .35s;
        &:hover {
            color: $secondary;
            transition: .35s;
        }
    }
</style>
