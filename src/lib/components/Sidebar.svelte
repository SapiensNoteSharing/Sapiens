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
            color: "success",
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
    <Searchbar class="align-self-center ms-auto me-auto"></Searchbar>
    
    <Accordion let:id class="my-3 mx-2">
        <AccordionItem class="border-dark">
            <div slot="name">
                Corso Di Laurea
            </div>
            <div class="d-flex flex-wrap">
                {#each faculties as faculty}
                <div class="me-2 mb-2">
                    <button class="btn border-1 border-primary filter" class:btn-primary={filters.faculty.includes(faculty)} on:click={() => toggleFilter('faculty', faculty)}>{faculty}</button>
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
                <button class="btn border-1 border-primary filter" class:btn-primary={filters.degree_type.includes(type)} on:click={() => toggleFilter('degree_type', type)}>{type}</button>
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
                <button class="btn text-dark border-1 border-dark filter {filters.tags.includes(tag.name) ? `btn-${tag.color}` : ''}" on:click={() => toggleFilter('tags', tag.name)}>{tag.name}</button>
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
            <h1>I Tuoi Corsi</h1>
        </div>
        {#each courses || [] as course}
        <div class="navigation">
            <Item collapsible obj={course} icon="chevron" class="course">
                <div slot="menu">
                    {#each course.content || [] as chapter}
                        <Item collapsible obj={chapter} icon="chevron" class="chapter">
                            <div slot="menu">
                                {#each chapter.files || [] as file}
                                    <Item obj={file} class="file" on:click={(ev) => $viewing = ev.detail}></Item>
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
        width: 300px;
        min-height: 82vh;
        flex-shrink: 0;
        background-color: $primary;
        border-right: 1px solid $dark;
    }
    .navigation{
        :global(.course){
            font-size: 1rem;
            font-weight: 500;
        }
        :global(.chapter){
            font-size: 1rem;
            font-weight: 400;
        }
        :global(.file){
            font-size: 0.9rem;
            font-weight: 300;
        }
    }
    .filter {
        white-space: initial;
    }
</style>