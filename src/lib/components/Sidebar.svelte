<script>
    import Accordion from '$lib/components/Accordion.svelte';
    import AccordionItem from "$lib/components/AccordionItem.svelte";
    import Searchbar from '$lib/components/Searchbar.svelte';
    import { view, value, filter_tags } from '$lib/stores';
    import { page } from '$app/stores';
    import Navigation from './Navigation.svelte';
    import Item from './Item.svelte'
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
    
</script>

<div class="sidebar align-self-stretch px-3 position-relative flex-shrink-0">
    {#if $page.route.id == '/(app)/esplora_corsi'}
    <div class="d-flex align-items-center mt-5 mb-4">
        <h2 class="mx-auto display-6 text-dark">Filtri</h2>
    </div>
    
    <!-- filter according to input -->
    <Searchbar class="align-self-center ms-auto me-auto" bind:value={$value}></Searchbar>
    
    <div class="accordion my-4 mx-3">
        <!-- filter according to degree faculty -->
        <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="faculty_filter">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faculty_collapse" aria-expanded="true" aria-controls="faculty_collapse">
                    Corso di Laurea
                </button>
            </h2>
            <div id="faculty_collapse" class="accordion-collapse collapse show" aria-labelledby="faculty_filter">
                <div class="accordion-body d-flex flex-wrap">
                    {#each faculties as faculty}
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check filter_btn" id="{faculty.replace(" ", "_")}" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="{faculty.replace(" ", "_")}">{faculty}</label><br>
                    </div>
                    {/each}
                </div>
            </div>
        </div>
        
        <!-- filter according to degree type -->
        <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="degree_filter">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#degree_collapse" aria-expanded="true" aria-controls="degree_collapse">
                    Tipo di Laurea
                </button>
            </h2>
            <div id="degree_collapse" class="accordion-collapse collapse show" aria-labelledby="degree_filter">
                <div class="accordion-body d-flex flex-wrap">
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check filter_btn" id="triennale" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="triennale">Triennale</label><br>
                    </div>
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check filter_btn" id="magistrale" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="magistrale">Magistrale</label><br>
                    </div>
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check filter_btn" id="ciclo_unico" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="ciclo_unico">A Ciclo Unico</label><br>
                    </div>
                    <!--  -->
                    <!-- {#if } -->
                </div>
                <hr class="m-0">
                <h2 class="px-4 pt-4">Triennale</h2>
                <div class="accordion-body d-flex flex-wrap">
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check" id="Primo anno primo semestre" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="Primo anno primo semestre">Primo anno - Primo semestre</label><br>
                    </div>
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check" id="Primo anno secondo semestre" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="Primo anno secondo semestre">Primo anno - Secondo semestre</label><br>
                    </div>
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check" id="Secondo anno" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="Secondo anno">Secondo anno</label><br>
                    </div>
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check" id="Terzo anno" autocomplete="off">
                        <label class="btn btn-outline-primary text-dark border-primary" for="Terzo anno">Terzo anno</label><br>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- filter according to tags -->
        <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="tags_filter">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tags_collapse" aria-expanded="true" aria-controls="tags_collapse">
                    Tags
                </button>
            </h2>
            <div id="tags_collapse" class="accordion-collapse collapse show" aria-labelledby="tags_filter">
                <div class="accordion-body d-flex flex-wrap">
                    {#each $filter_tags as tag}
                    <div class="me-2 mb-2">
                        <input type="checkbox" class="btn-check" id="{tag.name}" bind:checked={tag.selected} autocomplete="off">
                        <label class="btn btn-outline-{tag.color} text-dark border-dark" for="{tag.name}">{tag.name}</label><br>
                    </div>
                    {/each}
                </div>
            </div>
        </div>
        
        <!-- filter according to rating -->
        <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="rating_filter">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rating_collapse" aria-expanded="true" aria-controls="rating_collapse">
                    Valutazione
                </button>
            </h2>
            <div id="rating_collapse" class="accordion-collapse collapse show" aria-labelledby="rating_filter">
                <div class="accordion-body d-flex flex-wrap">
                    <!-- Rating filter -->
                </div>
            </div>
        </div>
    </div>
    {:else if $page.route.id == '/(app)/aula_studio'}
    <div class="mt-3">
        <div class="d-flex w-100 justify-content-center">
            <h1>I Tuoi Corsi</h1>
        </div>
        {#each courses as course}
            <Item collapsible obj={course} icon="chevron">
                <div slot="menu">
                    {#each course.content as chapter}
                        <Item collapsible obj={chapter} icon="chevron">
                            <div slot="menu">
                                {#each chapter.files as file}
                                    <Item obj={file} href="."></Item>
                                {/each}
                            </div>
                        </Item>
                    {/each}
                </div>
            </Item>
            <div class="my-1"></div>
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
        width: 25%;
        min-height: 82vh;
        background-color: $primary;
        border-right: 1px solid $dark;
    }
</style>