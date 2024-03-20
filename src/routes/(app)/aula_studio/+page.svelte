<script>
    import NormalButton from '$lib/components/NormalButton.svelte'
    import { viewing } from '$lib/stores';
    import 'highlight.js/styles/github.css';
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

<div class="m-auto flex-grow-1" style="max-width: 1000px;">
    <div class="focus-mode-btn">
        <!-- <ActiveButton active={focus_mode == true ? 'active' : 'not-active'}>
            <div slot="name" class="navbar-item rounded-3">
                <a class="d-block px-3 py-2 text-decoration-none position-fixed" on:click={() => focus_mode = !focus_mode}><i class="display-3 bi bi-crosshair{focus_mode == true ? '2' : ''}"></i></a>
            </div>
        </ActiveButton> -->
    </div>
    
    <div class="file-content-container bg-light mb-5 p-5">
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


</style>
