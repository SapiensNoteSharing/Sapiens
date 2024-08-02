<script>
    import Svelecte from "svelecte";
    import { goto } from '$app/navigation'
    import { Table } from '@bizmate-oss/sveltekit-components'
    import { onMount } from "svelte";

    export let data;
    const fetch = data.fetch
    
    let current = data.file || {}, params = data.params
    let fileData = data.fileData || ''
    let renderedData = data.renderedData || '';
    let input;
    async function save() {
        if (current.name) {
            await fetch(`/admin/api/courses/${params.course}/${params.dir}/files`, {
                method: current?._id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...current, content: fileData})
            });
            goto(`/admin/courses/${params.course}/${params.dir}`)
        }
    }
    
    async function cancel() {
        goto(`/admin/courses/${params.course}/${params.dir}`)
    }
    
    async function reRender(ev) {
        const resp = await fetch(`/admin/api/render`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fileData})
        });
        renderedData = (resp.ok && await resp.json()).renderedData || ''
    }

    $: fileData && reRender()
</script>

<div class="d-flex position-relative align-items-center mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="back" on:click={cancel} style="cursor: pointer"><i class="bi bi-chevron-left"></i>Indietro</span>
    <h1 class="mx-auto mb-0">{current?._id ? 'Modifica' : 'Crea nuovo'} File</h1>
</div>

<div class="row">
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input class="form-control" placeholder="File Name" bind:value={current.name}>
        </div>
    </div>
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Ultima modifica</label>
            <input class="form-control" placeholder="Last Updated" value={(new Date(current.updatedAt || new Date().getTime()).toLocaleDateString())} disabled>
        </div>
    </div>
    <div class="col">
        <div class="mb-3">
            <label for="gitUrl" class="form-label">Link Git</label>
            <input class="form-control" placeholder="Git Url" bind:value={current.path} disabled>
        </div>
    </div>
</div>

<div class="row justify-content-between">
    <div class="col">
        <span class="text">Contenuto non formattato</span>
        <div bind:this={input} class="textarea p-4" bind:innerText={fileData} contenteditable="true" spellcheck="false"></div>
    </div>
    <div class="col">
        <span class="text">Contenuto formattato</span>
        <div class="border rounded formatted mb-2 p-4">
            {@html renderedData}
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-secondary me-2" on:click={cancel}>Cancella</button>
            <button class="btn btn-primary me-1" on:click={save}>Salva</button>
        </div>
    </div>
</div>

<style>
    :global(.null) {
        text-decoration: none;
        color: inherit;
        margin: 0 .5rem
    }

    .col{
        max-width: 48%
    }

    .back {
        position: absolute;
        left: 0;
        top: 0.8rem
    }

    .textarea {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: 800px;
        margin-bottom: 1rem;
        border: 1px solid lightgray;
        border-radius: 5px;
        background-color: white;
    }
    .formatted {
        background-color: white;
    }
</style>