<script>
    import Accordion from '$lib/components/Accordion.svelte';
    import AccordionItem from "$lib/components/AccordionItem.svelte";
    import FloatingButton from "$lib/components/FloatingButton.svelte";
    import Searchbar from '$lib/components/Searchbar.svelte';
    import { view, value, filter_tags, viewing } from '$lib/stores';
    import { page } from '$app/stores';
    import Navigation from './Navigation.svelte';
    import Item from './Item.svelte'
    import { goto } from '$app/navigation'
    import Svelecte from 'svelecte';


    export let courses;
    let course = courses[0];
    let _course = course;
    let sidebar_page = "chapters";
    
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

    function changeCourse(ev){
        if(ev?.detail?._id){
            course = _course
            $viewing = {}
        }
    }
</script>

<div class="sidebar px-5 position-relative">
    {#if $page.route.id == '/(app)/esplora_corsi'}
        <div class="d-flex align-items-center my-5">
            <h1 class="mb-0 display-3 align-bottom text-dark">Filtri</h1>
        </div>
        
        <!-- filter according to input -->
        <Searchbar class="align-self-center mb-5"></Searchbar>
        
        <Accordion let:id class="mb-5">
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
            <!--
            <div class="d-flex w-100 justify-content-center">
                <select id="course-selection" bind:value={course} class="display-3 text-center w-100 bg-primary py-2 mb-3 floating">
                    {#each courses || [] as course}
                    <option value={course.name}>{course.name}</option>
                    {/each}
                </select>
            </div>
        --> 
            <div class="course-selection">
                <Svelecte
                placeholder="Select Course..."
                options={courses}
                valueAsObject
                valueField="_id"
                labelField="name"
                class="svelecte-control text-center floating mb-3 py-2 display-4"
                style="--sv-border: 0; --sv-active-border: 0;"
                bind:value={_course}
                on:change={(ev) => changeCourse(ev)}
                on:blur={() => _course = course}
                />
            </div>

            
            <div class="d-flex flex-column">
                <div class="d-flex flex-row justify-content-between">
                    <button class="display-4 bg-light py-2 mb-0 me-2 tab" on:click={() => sidebar_page = "chapters"}><img class="w-50" src="/src/style/chapters.png" alt=""></button>
                    <button class="display-4 bg-success py-2 mb-0 mx-1 tab" on:click={() => sidebar_page = "exercises"}><img class="w-50" src="/src/style/exercises.png" alt=""></button>
                    <button class="display-4 bg-primary py-2 mb-0 mx-1 tab" on:click={() => sidebar_page = "questions"}><img class="w-50" src="/src/style/questions.png" alt=""></button>
                    <button class="display-4 bg-info py-2 mb-0 ms-1 tab" on:click={() => sidebar_page = "formulary"}><img class="w-50" src="/src/style/formulary.png" alt=""></button>
                </div>
            </div>
            
            {#if sidebar_page == "chapters"}
                <div class="sidebar-page">
                    <div class="navigation">
                        {#each course.chapters || [] as chapter}
                            <Item collapsible obj={chapter} icon="chevron" class="chapter" active={chapter.files.map(file => file._id).includes($viewing._id)}>
                                <div slot="menu">
                                    {#each chapter.files || [] as file}
                                        <Item obj={file} class="file" on:click={(ev) => $viewing = ev.detail} active={$viewing._id == file._id}></Item>
                                    {/each}
                                </div>
                            </Item>
                        {/each}
                    </div>
                </div>
            {:else if sidebar_page == "exercises"}
                <div class="sidebar-page d-flex flex-column bg-secondary">
                    <FloatingButton classes="bg-light m-3 mb-0">
                        <div slot="name" class="d-flex flex-column justify-content-between m-3">
                            <div class="d-flex flex-row justify-content-between">
                                <p class="display-6 text-dark">Capitolo 1</p>
                                <p class="display-6 text-dark">5/8</p>
                            </div>

                            <div id="progressBar1" class="progress-bar w-100 position-relative">
                                <div class="progress-bar-filler bg-primary"></div>
                            </div>
                            <!-- <img class="target-icon position-relative" src="/src/style/target.png" alt=""> -->
                        </div>
                    </FloatingButton>

                    <FloatingButton classes="bg-light m-3 mb-0">
                        <div slot="name" class="d-flex flex-column justify-content-between m-3">
                            <div class="d-flex flex-row justify-content-between">
                                <p class="display-6 text-dark">Capitolo 2</p>
                                <p class="display-6 text-dark">17/23</p>
                            </div>

                            <div id="progressBar2" class="progress-bar w-100 position-relative">
                                <div class="progress-bar-filler bg-primary"></div>
                            </div>
                            <!-- <img class="target-icon position-relative" src="/src/style/target.png" alt=""> -->
                        </div>
                    </FloatingButton>

                    <FloatingButton classes="bg-light m-3 mb-0">
                        <div slot="name" class="d-flex flex-column justify-content-between m-3 position-relative">
                            <div class="d-flex flex-row justify-content-between">
                                <p class="display-6 text-dark">Capitolo 3</p>
                                <p class="display-6 text-dark">4/21</p>
                            </div>
                    
                            <div id="progressBar3" class="progress-bar w-100">
                                <div class="progress-bar-filler bg-primary"></div>
                            </div>
                            <!-- <img class="target-icon position-relative" src="/src/style/target.png" alt=""> -->
                        </div>
                    </FloatingButton>
                </div>
            {:else if sidebar_page == "exercises"}
                <div class="sidebar-page">
                    
                </div>
            {:else if sidebar_page == "formulary"}
                <div class="sidebar-page">
                    
                </div>
            {/if}
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
        border-right: 1px solid rgba($dark, 0.25);
    }
    
    .selected-course {
        width: 100%;
    }
    
    .tab {
        border: 1px solid $dark;
        border-bottom: 0px;
        border-radius: .4rem .4rem 0rem 0rem;
    }
    
    .exercise-category {
        margin: 1.5rem;
        margin-bottom: 0rem;
    }

    .course-selection{
        :global(.floating) {
            border: 1px solid $dark;
            border-radius: .4rem;
            box-shadow: .0rem .4rem rgba($dark, 0.5); 
            transition: .1s;
        }
        :global(.svelecte-control .sv-content){
            justify-content: center;
        }
    }
    
    .floating:hover {
        box-shadow: .0rem .2rem rgba($dark, 0.5);
        transform: translate(0rem, .2rem);
    }
    
    .sidebar-page {
        border: 1px solid $dark;
        border-radius: .5rem;
        padding-bottom: 1rem; 
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

    .progress-bar {
        border: 1px solid $dark;
        border-radius: 0.4rem;
        background: $light;
        height: 1rem;
    }

    .progress-bar-filler {
        border: 0px;
        border-right: 1px solid $dark;
        background: $primary;
        width: 50%;
        height: 1rem;
    }

    // .progress-bar-filler::after {
    //     content: '';
    //     position: relative;
    //     top: 0.6rem;
    //     border: 0px;
    //     display: block;
    //     background: rgba($dark, .25);
    //     width: 100%;
    //     height: 1rem;
    // }

    // .target-icon {
    //     bottom: 1.7rem;
    //     left: 100%;
    //     transform: translate(-1.8rem, 0rem); 
    //     margin: 0rem;
    //     width: 2.2rem; 
    //     height: 2.2rem;
    // }
    
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