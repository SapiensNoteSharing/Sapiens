<script>
    import { Table } from '@bizmate-oss/sveltekit-components'
    import Modal from '$lib/components/Modal.svelte';
    import { goto } from '$app/navigation';
    export let data;

    let courses = data.courses || [];

    let deleteModal;
    let current = {}
    let cols = [
        {
            id: 'university.name',
            label: 'Università',
            format: val => val || '-',
            searchable: true,
        },
        {
            id: 'code',
            label: 'Codice corso',
            format: val => val || "-",
        },    
        {
            id: 'name',
            label: 'Nome corso',
            format: val => val || '-',
            searchable: true,
        },
        {
            id: 'degree.name',
            label: 'Nome facoltà',
            format: val => val || '-',
            searchable: true,
        },   
        {
            id: 'degree.type',
            label: 'Tipo facoltà',
            format: val => val || '-',
            searchable: true,
        },              
        { 
            id: 'cfu',
            label: 'CFU',
            format: val => val || 0,
            searchable: 'number'
        },
        {
            id: 'professors',
            label: 'Docente/i',
            format: val => val.join(', '),
            searchable: 'enum'
        },
        {
            id: 'year',
            label: 'Anno',
            format: val => val || '-',
            searchable: 'enum'
        },
        {
            id: 'semester',
            label: 'Semestre',
            format: val => val || '-',
            searchable: 'enum'
        },
        {
            id: 'tags',
            label: 'tags',
            format: val => val || '-'
        },
        // {
        //     id: 'description',
        //     label: 'descrizione corso',
        //     format: val => val || 'Lorem ipsum dolor sit amet. Est tempora perferendis eos quia rerum a rerum laborum eum atque eligendi ut laboriosam optio 33 fugiat quae. At nihil nostrum et Quis magnam ab aliquam temporibus est ipsa reiciendis sed facilis odit aut mollitia consequatur. Aut consectetur veritatis ea adipisci ratione et iste quaerat. Ut beatae obcaecati est harum unde et galisum similique ut officia architecto sed nesciunt delectus.'
        // },
        {
            id: 'chapters',
            label: '# capitoli',
            format: val => val?.length || 0
        },
        {
            id: 'reviews',
            label: '# recensioni',
            format: val => val.length || 0,
            searchable: 'number'
        },
        {
            id: 'extra_content',
            label: 'Contenuti extra',
            format: val => val ? true : false
        },
        {
            id: 'updatedAt',
            label: 'Ultima modifica',
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
            if (res) {
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
    
<Modal title="Delete Course" yes="Delete" no="Cancel" bind:this={deleteModal} let:args>
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