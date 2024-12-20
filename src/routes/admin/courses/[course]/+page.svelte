<script>
    import Svelecte from "svelecte";
    import { goto } from '$app/navigation'
    import { Table } from '@bizmate-oss/sveltekit-components'
    import { years, semesters } from '$lib/utils'
    import { error, success } from '$lib/toast'
    export let data;
    const fetch = data.fetch;
    
    let current = data.course || {}

    const professors = [
        'Giorgio Ottaviani', 
        'Caterina Stoppato',
        'Marco Bertini'
    ]

    async function save() {
        if (current.name) {
            await fetch(`/admin/api/courses`, {
                method: current?._id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(current)
            });
            success('Updated Course')
        }
    }

    async function cancel() {
        goto(`/admin/courses`)
    }

    let contentCols = [
        {
            id: 'name',
            label: 'Name',
            searchable: true
        },
        {
            id: 'directories',
            label: '# of subdirectories',
            format: (val, row) => `<span class="me-2">${val?.length}</span>` + val.map(el => `<a class="null" href="./${current._id}/${row._id}/${el._id}">${el.name}</a>`).join(' ')
        },
        {
            id: 'files',
            label: 'Files',
            format: (val, row) => `<span class="me-5">${val?.length}</span>` + val.map(el => `<a class="null" href="./${current._id}/${row._id}/files/${el._id}">${el.name}</a>`).join(' ')
            
        },
        {
            id: 'updatedAt',
            label: 'Last Modified',
            format: val => new Date(val).toLocaleDateString()
        },
    ]

    function edit(row) {
        goto(`/admin/courses/${current._id}/${row._id}`)
    }

    async function reload() {
        const resp = await fetch(`/admin/api/courses/${current._id}`)
        current = (resp.ok && await resp.json()) || {}
    }

</script>

<div class="d-flex position-relative align-items-center mb-2">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span class="back" on:click={cancel} style="cursor: pointer"><i class="bi bi-chevron-left"></i>Indietro</span>
    <h1 class="mx-auto mb-0">{current?._id ? 'Modifica' : 'Crea nuovo'} Corso</h1>
</div>

<div class="row">
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Nome del corso</label>
            <input class="form-control" bind:value={current.name} placeholder="Nome del corso">
        </div>
    </div>
    <div class="col">
        <div class="mb-3">
            <label for="professors" class="form-label">Docente/i</label>
            <Svelecte 
            options={current.professors.map(p => ({label: p}))} 
            multiple 
            creatable
            creatablePrefix=''
            labelField="label"
            valueField="label"
            bind:value={current.professors} 
            placeholder="Seleziona docenti"/>
        </div>
    </div>
    <div class="col">
        <div class="mb-3">
            <label for="professors" class="form-label">Tags</label>
            <Svelecte 
            options={data.tags.map(tag => ({label: tag}))} 
            multiple 
            labelField="label"
            valueField="label"
            creatable
            creatablePrefix=''
            bind:value={current.tags} 
            placeholder="Seleziona tags"/>
        </div>
    </div>
</div>

<div class="row">
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Codice Corso di Laurea</label>
            <input class="form-control" bind:value={current.code} placeholder="Codice Corso di Laurea">
        </div>
    </div>
    
    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Anno di insegnamento</label>
            <Svelecte 
            options={years}
            bind:value={current.year} 
            placeholder="Seleziona anno di insegnamento"/>
        </div>
    </div>

    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">Semestre</label>
            <Svelecte 
            options={semesters} 
            bind:value={current.semester} 
            placeholder="Seleziona semestre di insegnamento"/>
        </div>
    </div>

    <div class="col">
        <div class="mb-3">
            <label for="name" class="form-label">CFU</label>
            <input class="form-control" bind:value={current.cfu} placeholder="CFU">
        </div>
    </div>
</div>

<div class="row">
    <div class="col">
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <label for="content" class="form-label">Chapters</label>
                {#if current?._id}
                    <button class="btn btn-primary" on:click={() => goto(`/admin/courses/${current._id}/new`)}>New</button>
                {/if}
            </div>
            <Table rows={current.chapters} cols={contentCols} border alternateRows on:click={(ev) => edit(ev.detail)}/>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-secondary me-2" on:click={cancel} data-sveltekit-preload-data="hover">Cancella</button>
            <button class="btn btn-primary me-1" on:click={save} data-sveltekit-preload-data="hover">Salva</button>
        </div>
    </div>  
</div>

<style>
    :global(.null) {
        text-decoration: none;
        color: inherit;
        margin: 0.5rem
    }
    .back {
        position: absolute;
        left: 0;
        top: 0.8rem
    }
</style>