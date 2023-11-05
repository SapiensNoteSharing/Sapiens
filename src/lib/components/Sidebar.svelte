<script>
    import Accordion from '$lib/components/Accordion.svelte';
    import AccordionItem from "$lib/components/AccordionItem.svelte";
    import Searchbar from '$lib/components/Searchbar.svelte';
    import { view, value, filter_tags, viewing } from '$lib/stores';
    import { page } from '$app/stores';
    import Navigation from './Navigation.svelte';
    import Item from './Item.svelte'
    import { goto } from '$app/navigation'

    export let courses;
    
    let faculties = [
        "Ingegneria informatica",
        "Ingegneria meccanica",
        "Ingegneria gestionale",
        "Ingegneria biomedica",
        "Ingegneria elettronica",
        "Chimica e tecnologie farmaceutiche",
        "Giurrisprudenza",
        "Psicologia",
        "Scienze sociali",
        "Scienze della comunicazione",
        "Scienze della formazione primaria",
        "Filosofia",
        "Architettura",
        "Medicina",
        "Scienze farmaceutiche",
    ]

    let degree_types = ['Triennale', 'Magistrale', 'A Ciclo Unico']
    //tags andranno presi dal database ( va fatto il crud )
    let tags = [
        {
            name: "Best Seller",
            color: "secondary",
            selected: false
        },
        {
            name: "New!",
            color: "primary",
            selected: false
        }
    ]

    let filters = {
        faculty: [],
        degree_type: [],
        tags: [],
        reviews: []
    }

    function toggleFilter(key, val) {
        if(filters[key].includes(val)) {
            filters[key] = filters[key].filter(i => i != val);
        } else {
            filters[key] = [...filters[key], val]
        }
    }
</script>

<div class="sidebar px-3 position-relative">
    {#if $page.route.id == '/(app)/esplora_corsi'}
        <div class="d-flex align-items-center mt-5 mb-4">
            <h1 class="mx-auto display-6 text-dark">Filtri</h1>
        </div>
        
        <!-- filter according to input -->
        <Searchbar class="align-self-center"></Searchbar>
        
        <Accordion let:id class="my-3 mx-2">
            <AccordionItem class="border-dark">
                <div slot="name">
                    Corso Di Laurea
                </div>
                <div class="d-flex flex-wrap">
                    {#each faculties as faculty}
                    <div class="me-2 mb-2">
                        <button class="btn filter" class:btn-primary={filters.faculty.includes(faculty)} on:click={() => toggleFilter('faculty', faculty)}>{faculty}</button>
                    </div>
                    {/each}
                </div>
            </AccordionItem>
            <AccordionItem class="border-dark">
                <div slot="name">
                    Tipo di Laurea
                </div>
                {#each degree_types as type}
                <div class="me-2 mb-2">
                    <button class="btn filter" class:btn-primary={filters.degree_type.includes(type)} on:click={() => toggleFilter('degree_type', type)}>{type}</button>
                </div>
                {/each}
                <!--  -->
                <!-- {#if } -->
            </AccordionItem>
            <AccordionItem class="border-dark">
                <div slot="name">
                    Tags
                </div>
                {#each tags as tag}
                <div class="me-2 mb-2">
                    <button class="btn filter {filters.tags.includes(tag.name) ? `btn-${tag.color}` : ''}" on:click={() => toggleFilter('tags', tag.name)}>{tag.name}</button>
                </div>
                {/each}
            </AccordionItem>
            <AccordionItem class="border-dark">
                <div slot="name">
                    Rating
                </div>
            </AccordionItem>
        </Accordion>
    {:else if $page.route.id == '/(app)/aula_studio'}
        <div class="mt-3">
            <div class="d-flex w-100 justify-content-center">
                <button class="display-3 w-100 bg-primary py-2 mb-3 floating">Fisica I</button>
            </div>

            <div class="d-flex flex-column">
                <div class="d-flex flex-row justify-content-between">
                    <button class="display-4 bg-primary py-2 mb-3 me-2 floating"><img class="w-25" src="/src/style/google.png" alt=""></button>
                    <button class="display-4 bg-light py-2 mb-3 mx-1 floating"><img class="w-25" src="/src/style/google.png" alt=""></button>
                    <button class="display-4 bg-success py-2 mb-3 mx-1 floating"><img class="w-25" src="/src/style/google.png" alt=""></button>
                    <button class="display-4 bg-warning py-2 mb-3 ms-1 floating"><img class="w-25" src="/src/style/google.png" alt=""></button>
                </div>
                <div class="d-flex flex-column bg-primary">
                    
                </div>
            </div>

            {#each courses || [] as course}
                <div class="navigation">
                    <Item collapsible obj={course} icon="chevron" class="course">
                        <div slot="menu">
                            {#each course.content || [] as chapter}
                                <Item collapsible obj={chapter} icon="chevron" class="chapter" active={chapter.files.map(file => file._id).includes($viewing._id)}>
                                    <div slot="menu">
                                        {#each chapter.files || [] as file}
                                            <Item obj={file} class="file" on:click={(ev) => $viewing = ev.detail} active={$viewing._id == file._id}></Item>
                                        {/each}
                                    </div>
                                </Item>
                            {/each}
                        </div>
                    </Item>
                    <div class="my-1"></div>
                </div>
            {/each}
        </div>
    {:else if $page.route.id == '/(app)/area_personale'}
        <nav id="personal_area_scrollspy" class="mt-4 h-100 flex-column align-items-stretch pe-4 border-end">
            <nav class="nav nav-pills flex-column">
                <a class="fs-1 nav-link" href="#account">Account</a>
                <nav class="nav nav-pills flex-column">
                    <a class="fs-1 nav-link ms-3 my-1" href="#dati_personali">Dati Personali</a>
                    <a class="fs-1 nav-link ms-3 my-1" href="#dati_accademici-1-2">Dati Accademici</a>
                </nav>
                <a class="fs-1 nav-link" href="#preferenze">Preferenze</a>
            </nav>
        </nav>
    {/if}
</div>

<style lang="scss">
    @import '$css/variables.scss';
    
    .sidebar {
        width: 400px;
        min-height: 82vh;
        flex-shrink: 0;
        background-color: $light;
        border-right: 1px solid $dark;
    }

    .selected-course {
        width: 100%;
    }

    .floating {
        border: 1px solid $dark;
        border-radius: .4rem;
        box-shadow: .0rem .4rem rgba($dark, 0.5); 
        transition: .1s;
    }

    .floating:hover {
        box-shadow: .0rem .2rem rgba($dark, 0.5);
        transform: translate(0rem, .2rem);
    }

    .navigation {
        :global(.course) {
            background-color: $light !important;
            font-size: 1.05rem;
            font-weight: 500;
            border: none;
        }

        :global(.chapter) {
            background-color: $light !important;
            font-size: 1rem;
            font-weight: 400;
            padding-left: .5rem;
        }

        :global(.file) {
            background-color: $light !important;
            font-size: .95rem;
            font-weight: 300;
            padding-left: 1rem;
        }

        :global(.item) {
            padding-top: .2rem;
            padding-bottom: .2rem;
        }

        :global(.submenu) {
            border: none !important;
        }

        :global(.header.open) {
            background-color: $light !important;
        }

        :global(.item.chapter) {
            margin-left: 0.5rem;
            border-left: 1px solid rgba($dark, 0.5);
        }

        :global(.item.file) {
            margin-left: 0.5rem;
            border-left: 1px solid rgba($dark, 0.5);
        }

        :global(.href) {
            padding-left: .5rem;
        }

        :global(.bi-chevron-right.rotate) {
            color: $secondary !important;
        }
    }

    .filter {
        border: 1px solid $dark;
        box-shadow: 0rem .4rem rgba($dark, 0.6);
        margin-bottom: 0.4rem;
        transition: .1s;
    }

    .filter:hover {
        // margin-bottom: 0.2rem;
        // margin-top: 0.2rem;
        box-shadow: 0rem .2rem rgba($dark, 0.6);
        transform: translate(0rem, .2rem);
    }

    .filter.btn-primary, .filter.btn-secondary {
        box-shadow: none;
        transform: translate(0rem, .4rem);
    }
</style>