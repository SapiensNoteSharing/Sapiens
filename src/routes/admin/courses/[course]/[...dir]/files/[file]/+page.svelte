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
            <input class="form-control" placeholder="Last Updated" value={(new Date(current.updatedAt || new Date().getTime()).toLocaleDateString())} disabled>
        </div>
    </div>
    <div class="col">
        <div class="mb-3">
            <label for="gitUrl" class="form-label">Git Url (from Università)</label>
            <input class="form-control" placeholder="Git Url" bind:value={current.path}>
        </div>
    </div>
</div>

<div class="row">
    <div class="col">
        <span class="text">Unformatted text</span>
        <div bind:this={input} class="textarea p-2" bind:innerText={fileData} contenteditable="true" spellcheck="false"></div>
    </div>
    <div class="col">
        <span class="text">Formatted text</span>
        <div class="border rounded mb-2 p-2">{@html renderedData}</div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-secondary me-2" on:click={cancel}>Cancel</button>
            <button class="btn btn-primary me-1" on:click={save}>Save</button>
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

    .textarea {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: 800px;
        margin-bottom: 1rem;
        border: 1px solid lightgray;
        border-radius: 5px;
    }
</style>