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

    const professors = ['Ottaviani', 'Stoppato']
    
        async function save(){
            if(current.name){
                await fetch(`/admin/api/courses/${params.course}/${params.dir}/files/${params.file}`, {
                    method: current?._id ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(current)
                });
                goto(`/admin/courses/${params.course}/${params.dir}`)
            }
        }
    
    async function cancel(){
        goto(`/admin/courses/${params.course}/${params.dir}`)
    }
    
    async function reRender(ev){
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

<div class="d-flex align-items-center mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={cancel} style="cursor: pointer"><i class="bi bi-chevron-left"></i>Back</span>
    <h1 class="mx-auto mb-0">{current?._id ? 'Edit' : 'Create New'} File</h1>
</div>

<div class="row">
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input class="form-control" placeholder="File Name" bind:value={current.name}>
        </div>
    </div>
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Last Updated</label>
            <input class="form-control" placeholder="Network Name" value={new Date(current.updatedAt).toLocaleDateString()} disabled>
        </div>
    </div>
</div>

<div class="row">
    <div class="col">
        <div bind:this={input} class="textarea" bind:innerText={fileData} contenteditable="true" spellcheck="false"></div>
    </div>
    <div class="col">
        <div class="border rounded h-100">{@html renderedData}</div>
    </div>
</div>

<div class="d-flex justify-content-end">
    <button class="btn btn-secondary me-2 border-dark" on:click={cancel} data-sveltekit-preload-data="hover">Cancel</button>
    <button class="btn btn-primary me-1 border-dark" on:click={save} data-sveltekit-preload-data="hover">Save</button>
</div>

<style>
    :global(.null) {
        text-decoration: none;
        color: inherit;
        margin: 0 .5rem
    }

    .textarea {
        width: 100%;
        height: auto;
        min-height: 800px;
        margin-bottom: 1rem;
        border: 1px solid lightgray;
        border-radius: 5px;
    }
</style>