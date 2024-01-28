<script>
    import Svelecte from "svelecte";
    import { goto } from '$app/navigation'
    import { Table } from '@bizmate-oss/sveltekit-components'
    
    export let data;
    const fetch = data.fetch
    
    $: current = data.directory || {}
    $: params = data.params

    const professors = [
        'Giorgio Ottaviani', 
        'Caterina Stoppato',
        'Marco Bertini'
    ]
    
    async function save() {
        if (current.name) {
            await fetch(`/admin/api/courses/${params.course}/${params.dir}`, {
                method: current?._id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(current)
            });
            const path = params.dir.split('/')
            const parentPath = path.slice(0, path.length-1).join('/')
            goto(`/admin/courses/${params.course}/${parentPath}`)
        }
    }
    
    async function cancel() {
        const path = params.dir.split('/')
        const parentPath = path.slice(0, path.length-1).join('/')
        goto(`/admin/courses/${params.course}/${parentPath}`)
    }
    
    let dirCols = [
        {
            id: 'name',
            label: 'Name',
            searchable: true
        },
        {
            id: 'updatedAt',
            label: 'Last Modified',
            format: val => new Date(val).toLocaleDateString()
        }
    ]
    
    function editDir(row) {
        goto(`/admin/courses/${params.course}/${params.dir}/${row._id}`)
    }

    function editFile(row) {
        goto(`/admin/courses/${params.course}/${params.dir}/files/${row._id}`)
    }
    
    async function reload() {
        const resp = await fetch(`/admin/api/courses/${params.course}/${params.dir}`)
        current = (resp.ok && await resp.json()) || {}
    }
</script>

<div class="d-flex position-relative align-items-center mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="back" on:click={cancel} style="cursor: pointer"><i class="bi bi-chevron-left"></i>Back</span>
    <h1 class="mx-auto mb-0">{current?._id ? 'Edit' : 'Create New'} Directory</h1>
</div>

<div class="row">
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input class="form-control" placeholder="Network Name" bind:value={current.name}>
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
        {#if current.directories?.length}
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <label for="content" class="form-label">Directories</label>
                {#if current?._id}<button class="btn btn-primary" on:click={() => goto(`/admin/courses/${params.course}/${params.dir}/new`)}>New</button>{/if}
            </div>
            <Table rows={current.directories} cols={dirCols} border alternateRows on:click={(ev) => editDir(ev.detail)}/>
        </div>
        {/if}
        {#if current.files?.length}
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <label for="content" class="form-label">Files</label>
                {#if current?._id}<button class="btn btn-primary" on:click={() => goto(`/admin/courses/${params.course}/${params.dir}/files/new`)}>New</button>{/if}
            </div>
            <Table rows={current.files} cols={dirCols} border alternateRows on:click={(ev) => editFile(ev.detail)}/>
        </div>
        {/if}
        <div class="d-flex justify-content-end">
            <button class="btn btn-secondary me-2" on:click={cancel} data-sveltekit-preload-data="hover">Cancel</button>
            <button class="btn btn-primary me-1" on:click={save} data-sveltekit-preload-data="hover">Save</button>
        </div>
    </div>  
</div>

<style>
    :global(.null) {
        text-decoration: none;
        color: inherit;
        margin: 0 .5rem
    }
    .back {
        position: absolute;
        left: 0;
        top: 0.8rem
    }
</style>