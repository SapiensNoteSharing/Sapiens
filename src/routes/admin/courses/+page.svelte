<script>
    import Course from '$lib/components/Course.svelte'
    import { Table } from '@bizmate-oss/sveltekit-components'
    import Modal from '$lib/components/Modal.svelte';
    import { goto } from '$app/navigation';
    export let data;

    let courses = data.courses || [];

    let deleteModal;
    let current = {}
    let cols = [
        {
            id: 'name',
            label: 'Name',
            searchable: true,
        },
        {
            id: 'professors',
            label: 'Professors',
            format: val => val.join(', '),
            searchable: 'enum'
        },
        {
            id: 'content',
            label: '# of directories',
            format: val => val?.length || 0
        },
        {
            id: 'reviews',
            label: '# of Reviews',
            format: val => val.length || 0,
            searchable: 'number'
        },
        {
            id: 'extra_content',
            label: 'Extra Content',
            format: val => val ? true : false
        },
        {
            id: 'updatedAt',
            label: 'Last Modified',
            format: val => new Date(val).toLocaleDateString()
        },
        {
            id: '_id',
            label: '',
            sortable: false,
            icon: true,
            format: val => '<i class="bi bi-trash"></i>',
            click: (val, row) => del(row)
        }
    ]

    async function reload() {
        const resp = await fetch('/admin/api/courses')
        courses = (resp.ok && await resp.json()) || []
    }
    
    async function edit(row) {
        goto(`/admin/courses/${row._id}`)
    }
    
    function del(row) {
        current = {
            name: row.name,
            _id: row._id,
            appliance: row.appliance?._id
        }

        deleteModal.show(current).then(async res => {
            if(res){
                const resp = await fetch('/admin/api/courses', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(current)
                })
                reload()
            }
        })
    }
</script>
    
<Modal title="Delete Camera" yes="Delete" no="Cancel" bind:this={deleteModal} let:args>
    Are you sure you want to delete {args?.name}?<br>This action cannot be undone
</Modal>
        
<div class="d-flex mb-2 justify-content-between align-items-center">
    <h2 class="mb-0">Courses</h2>
    <button class="ms-auto me-3 btn btn-primary btn-sm border-dark" on:click={() => goto('/admin/courses/new')} data-sveltekit-preload-data="hover">New</button>
</div>

<div class="table_container">
    <Table rows={courses} {cols} border on:click={(ev) => edit(ev.detail)} alternateRows isExportable pageRows={20}/>
</div>

<style lang="scss">
    .table_container {
        :global(.table-responsive-md > table.table > tbodt > tr > td) {
            background-color: red !important;
        }
    }
</style>