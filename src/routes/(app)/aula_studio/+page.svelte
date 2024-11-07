<script>
    import NormalButton from '$lib/components/NormalButton.svelte'
    import { viewing, user } from '$lib/stores';
    import { beforeNavigate, afterNavigate } from '$app/navigation'
    import 'highlight.js/styles/github.css';
    import { invalidate } from '$app/navigation';
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

    afterNavigate(render)

    beforeNavigate(async () => {
        if ($viewing?._id) {
            const resp = await fetch(`/api/user/${$viewing.course._id}/bookmark`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify($viewing._id)
            })
            if (resp.ok) {
                invalidate('app:user')
            }
        }
    })
    let focus_mode = false
</script>

<div class="m-auto flex-grow-1" style="max-width: 1000px;">
    <div class="focus-mode-btn">
        <!-- <ActiveButton active={focus_mode == true ? 'active' : 'not-active'}>
            <div slot="name" class="navbar-item rounded-3">
                <a class="d-block px-3 py-2 text-decoration-none position-fixed" on:click={() => focus_mode = !focus_mode}><i class="display-3 bi bi-crosshair{focus_mode == true ? '2' : ''}"></i></a>
            </div>
        </ActiveButton> -->
    </div>
    
    <div class="content-container bg-light mb-5 p-5">
        <div class="file">
            <h1 class:mb-0={!$viewing?._id}>{$viewing.name || 'Select a file'}</h1>
            {@html renderedFile}
        </div>
    </div>
    
    <div class="d-flex flex-column align-items-center">
        <h2 class="display-3 mb-4">Continua a studiare</h2>
        <div class="d-flex flex-row justify-content-center">
            <NormalButton class={"text-center p-0 me-3"}>
                <div slot="name">
                    <button type="button" class="btn btn-primary w-100 text-dark fs-2 rounded-3">
                        Vai al paragrafo successivo
                    </button>
                </div>
            </NormalButton>

            <NormalButton class={"text-center p-0 m-0"}>
                <div slot="name">
                    <button type="button" class="btn btn-secondary w-100 text-dark fs-2 rounded-3 m-0">
                        Vai agli esercizi
                    </button>
                </div>
            </NormalButton>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .content-container {
        border: 1px solid rgba($dark, .25);
        border-radius: 1rem;
        font-size: 1.2rem;
        line-height: 2rem;
        letter-spacing: -.2px;
        color: $dark;
        transition: width 1s, height 1s;
        flex-grow: 1;

        :global(h1) {
            font-size: 2.25rem;
            padding: 1.75rem 0rem .75rem 0rem;
            margin-bottom: 1rem;
            padding: 0rem;
            font-weight: 700;
            text-align: center;
        }

        :global(h2) {
            font-size: 1.75rem;
            padding: 1.75rem 0rem .75rem 0rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }

        :global(h3) {
            font-size: 1.5rem;
            padding: 1.5rem 0rem .5rem 0rem;
        }

        :global(h4) {
            font-size: 1.25rem;
            padding: .5rem 0rem .5rem 0rem;
        }

        :global(h2 + h3) {
            padding: 0rem 0rem .5rem 0rem;
        }

        :global(::selection) {
            background: $primary;
        }

        :global(math) {
            font-size: 1.3rem;
            font-family: MJXTEX;
            margin: .5rem 0rem;
        }

        :global(code) {
            font-size: 1.2rem;
            line-height: 2rem;
            letter-spacing: -.2px;
        }

        :global(td) {
            border: 1px solid rgba($dark, .25);
            padding: .5rem;
        }

        :global(th) {
            background: rgba($dark, .1);
            border: 1px solid rgba($dark, .25);
            padding: .5rem;
        }

        :global(table) {
            margin-bottom: 1.25rem;
        }


        // bullet list
        :global(ul .list-bullet::after) {
            width: 4px;
            height: 4px;
            border: 1.5px solid $secondary;
            background: $secondary;
        }

       :global(ul ul li::marker::after) {
            border: 1px solid $secondary !important;
            background: $secondary !important;
        }

        :global(ul ul ul .list-bullet::after) {
            border: 1px solid $secondary;
            background: $secondary;
        }

        :global(ul ul ul ul .list-bullet::after) {
            border: 1px solid $secondary;
            background: $secondary;
        }

        :global(ul li::marker) {
            color: $dark !important;
        }

        :global(ul ul li::marker) {
            color: $dark !important;
            border: 10px !important;
        }

        /* numbered list */
        :global(ol) {
            padding-left: 20px !important;
        }

        :global(ol li) {
            padding-left: 5px;
        }

        :global(ol li::marker) {
            color: $secondary !important;
        }
    }  
</style>
