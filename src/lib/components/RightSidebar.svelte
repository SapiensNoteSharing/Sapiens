<script>
    import Accordion from '$lib/components/Accordion.svelte';
    import AccordionItem from '$lib/components/AccordionItem.svelte';
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Searchbar from '$lib/components/Searchbar.svelte';
    import { viewing } from '$lib/stores';
    import { fly } from 'svelte/transition'
    import { page } from '$app/stores';
    import Item from './Item.svelte'
    import Svelecte from 'svelecte';
    
    export let courses;
    let course = courses[0] || {};
    let _course = course._id ? course : undefined;
    let sidebar_page = "chapters";
    let exercises_category = 1;
    export let open = true
    
    let faculties = [
    "Ingegneria informatica",
    "Ingegneria meccanica",
    "Ingegneria gestionale",
    "Ingegneria biomedica",
    "Ingegneria elettronica",
    "Ingegneria aereospaziale",
    "Ingegneria civile",
    "Ingegneria ambientale"
    ]
    
    let degree_types = [
    'Triennale',
    'Magistrale',
    'A Ciclo Unico'
    ]
    
    // tags andranno presi dal database ( va fatto il crud )
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
        if (filters[key].includes(val)) {
            filters[key] = filters[key].filter(i => i != val);
        } else {
            filters[key] = [...filters[key], val]
        }
    }
    
    function changeCourse(ev) {
        if (ev?.detail?._id) {
            course = _course
            $viewing = {}
        }
    }

    $: isEnabled = $page.route.id == '/(app)/aula_studio' || $page.route.id == '/(app)/negozio/corsi';
</script>


<div class="sidebar {open ? '' : 'closed'} {isEnabled ? '' : 'd-none'}">
    {#if !open}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div in:fly={{x: 50, delay: 200, duration: 200}} class="position-relative {isEnabled ? '' : 'd-none'}">
            <i class="open-btn display-3 bi bi-arrow-bar-left" on:click={() => open = !open}></i>
        </div>
    {/if}
    
    <div class="right-sidebar">
        {#if open}
            <i in:fly={{x: 50, delay: 250, opacity: 1, duration: 600}} class="close-btn display-3 bi bi-x-lg" on:click={() => open = !open}></i>
        {/if}
        
        {#if $page.route.id == '/(app)/aula_studio'}
            <div class=" mt-5 course-selection">
                <Svelecte
                placeholder="Seleziona corso"
                options={courses}
                valueAsObject
                valueField="_id"
                labelField="name"
                class="svelecte-control text-center course-selection-content mb-4 display-5 bg-light"
                bind:value={_course}
                on:change={(ev) => changeCourse(ev)}
                on:blur={() => _course = course}
                />
            </div>
            
            <div class="d-flex flex-column">
                <div class="d-flex flex-rpw justify-content-between">
                    <ActiveButton
                    type={"notes_subpages"}
                    active={sidebar_page == "chapters" ? 'active' : 'not-active'}
                    fill={sidebar_page == "chapters" ? '-fill' : ''}
                    class={"d-block py-2 text-decoration-none h-100"}
                    icon={"bi-file-earmark"}
                    on:click={() => sidebar_page = "chapters"}
                    />

                    <ActiveButton
                    type={"notes_subpages"}
                    active={sidebar_page == "exercises" ? 'active' : 'not-active'}
                    fill={sidebar_page == "exercises" ? '' : ''}
                    class={"d-block py-2 text-decoration-none h-100"}
                    icon={"bi-pencil-square"}
                    on:click={() => sidebar_page = "exercises"}
                    />

                    <ActiveButton
                    type={"notes_subpages"}
                    active={sidebar_page == "questions" ? 'active' : 'not-active'}
                    fill={sidebar_page == "questions" ? '' : ''}
                    class={"d-block py-2 text-decoration-none h-100"}
                    icon={"bi-plus-slash-minus"}
                    on:click={() => sidebar_page = "questions"}
                    />

                    <ActiveButton
                    type={"notes_subpages"}
                    active={sidebar_page == "formulary" ? 'active' : 'not-active'}
                    fill={sidebar_page == "formulary" ? '-fill' : ''}
                    class={"d-block py-2 text-decoration-none h-100"}
                    icon={"bi-chat-dots"}
                    on:click={() => sidebar_page = "formulary"}
                    />
                </div>
            </div>
            {#if sidebar_page == "chapters"}
                <div class="right-sidebar-page">
                    <div class="navigation">
                        {#each (course.chapters || []) as chapter}
                            <Item collapsible obj={chapter} icon="chevron" class="chapter" active={chapter.files.map(file => file._id).includes($viewing._id)}>
                                <div slot="menu">
                                    {#each chapter.files || [] as file}
                                        <Item obj={file} class="file" on:click={(ev) => $viewing = {...ev.detail, course: course}} active={$viewing._id == file._id}></Item>
                                    {/each}
                                </div>
                            </Item>
                        {/each}
                    </div>
                </div>
            {:else if sidebar_page == "exercises"}
                <div class="right-sidebar-page d-flex flex-column">
                    <NormalButton class="bg-light">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div slot="name" class="exercise-category-btn d-flex flex-column justify-content-between p-3 mb-4" on:click={() => exercises_category = 1}>
                            <div class="d-flex flex-row justify-content-between">
                                <p class="display-6 text-dark">Capitolo 1</p>
                                <p class="display-6 text-dark">5/8</p>
                            </div>
                            
                            <div id="progressBar1" class="progress-bar w-100 position-relative">
                                <div class="progress-bar-filler bg-primary"></div>
                            </div>
                        </div>
                    </NormalButton>
                    
                    <NormalButton class="bg-light">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div slot="name" class="exercise-category-btn d-flex flex-column justify-content-between p-3 mb-4" on:click={() => exercises_category = 2}>
                            <div class="d-flex flex-row justify-content-between">
                                <p class="display-6 text-dark">Capitolo 2</p>
                                <p class="display-6 text-dark">17/23</p>
                            </div>
                            
                            <div id="progressBar2" class="progress-bar w-100 position-relative">
                                <div class="progress-bar-filler bg-primary"></div>
                            </div>
                        </div>
                    </NormalButton>
                    
                    <NormalButton class="bg-light">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div slot="name" class="exercise-category-btn d-flex flex-column justify-content-between p-3 mb-4" on:click={() => exercises_category = 3}>
                            <div class="d-flex flex-row justify-content-between">
                                <p class="display-6 text-dark">Capitolo 3</p>
                                <p class="display-6 text-dark">4/21</p>
                            </div>
                            
                            <div id="progressBar3" class="progress-bar w-100">
                                <div class="progress-bar-filler bg-primary"></div>
                            </div>
                        </div>
                    </NormalButton>
                </div>
            {:else if sidebar_page == "formulary"}
                <div class="right-sidebar-page">
                    
                </div>
            {:else if sidebar_page == "questions"}
                <div class="right-sidebar-page">
                    
                </div>
            {/if}
        {:else if $page.route.id == '/(app)/negozio/corsi'}
            <div class="d-flex align-items-center my-5">
                <h1 class="mb-0 m-auto display-3 align-bottom text-dark">Filtri</h1>
            </div>
            
            <Searchbar class="align-self-center mb-5"></Searchbar>
            
            <Accordion let:id class="mb-5">
                <AccordionItem class="filter-category">
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
                <AccordionItem class="filter-category">
                    <div slot="name">
                        Tipo di Laurea
                    </div>
                    {#each degree_types as type}
                        <div class="me-2 mb-2">
                            <button class="btn filter" class:btn-primary={filters.degree_type.includes(type)} on:click={() => toggleFilter('degree_type', type)}>{type}</button>
                        </div>
                    {/each}
                </AccordionItem>
                <AccordionItem class="filter-category">
                    <div slot="name">
                        Tags
                    </div>
                    {#each tags as tag}
                        <div class="me-2 mb-2">
                            <button class="btn filter {filters.tags.includes(tag.name) ? `btn-${tag.color}` : ''}" on:click={() => toggleFilter('tags', tag.name)}>{tag.name}</button>
                        </div>
                    {/each}
                </AccordionItem>
                <AccordionItem class="filter-category">
                    <div slot="name">
                        Rating
                    </div>
                </AccordionItem>
            </Accordion>
        {:else if $page.route.id == '/(app)/i_miei_corsi'}
            <div class="d-flex align-items-center my-5">
                <h1 class="mb-0 m-auto display-3 align-bottom text-dark">Filtri</h1>
            </div>
            
            <Searchbar class="align-self-center mb-5"></Searchbar>
            
            <Accordion let:id class="mb-5">
                <AccordionItem class="filter-category">
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
                <AccordionItem class="filter-category">
                    <div slot="name">
                        Tipo di Laurea
                    </div>
                    {#each degree_types as type}
                    <div class="me-2 mb-2">
                        <button class="btn filter" class:btn-primary={filters.degree_type.includes(type)} on:click={() => toggleFilter('degree_type', type)}>{type}</button>
                    </div>
                    {/each}
                </AccordionItem>
                <AccordionItem class="filter-category">
                    <div slot="name">
                        Tags
                    </div>
                    {#each tags as tag}
                    <div class="me-2 mb-2">
                        <button class="btn filter {filters.tags.includes(tag.name) ? `btn-${tag.color}` : ''}" on:click={() => toggleFilter('tags', tag.name)}>{tag.name}</button>
                    </div>
                    {/each}
                </AccordionItem>
                <AccordionItem class="filter-category">
                    <div slot="name">
                        Rating
                    </div>
                </AccordionItem>
            </Accordion>
        {/if}
    </div>
</div>


<style lang="scss">
    @import '$css/variables.scss';
    .sidebar {
        background-color: $light;
        position: relative;
        border-left: 1px solid rgba($dark, 0.25);
        width: 300px;
        transition: transform .7s, width .7s;
        min-height: 89vh;
        &.closed {
            transform: translateX(100%);
            width: 0px;
            transition: transform .7s, width .7s;
        }
    }

    .right-sidebar {
        max-width: 300px;
        padding: 0 1.5rem;
        min-width: 300px;
    }
    
    .close-btn {
        position: absolute;
        top: .5rem;
        right: 1rem;
        cursor: pointer;
        transition: .35s;
        
        &:hover {
            color: $secondary;
            transition: .35s;
        }
    }
    .open-btn {
        position: absolute;
        top: .5rem;
        left: -2rem;
        cursor: pointer;
        transition: .35s;
        
        &:hover {
            color: $secondary;
            transition: .35s;
        }
    }

    .right-sidebar-container {
        position: relative;
    }


    .filter-category {
        border: 0px;
    }
    
    .selected-course {
        width: 100%;
    }
    
    .tab {
        border: 1px solid $dark;
        border-bottom: 0px;
        border-radius: .4rem .4rem 0rem 0rem;
        width: 50px;
    }
    
    .exercise-category-btn {
        border: 1px solid rgba($dark, .25);
        border-radius: 1rem;
    }

    .course-selection {
        transition: .1s;
        justify-content: center;
    }

    .course-selection-content {
        border-radius: 1rem;
        border: 1px solid $dark;
    }
    
    .floating:hover {
        box-shadow: .0rem .2rem rgba($dark, 0.5);
        transform: translate(0rem, .2rem);
    }
    
    .right-sidebar-page {
        margin-top: 1.5rem;
        padding-bottom: 1rem;
        min-width: fit-content;
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
            padding-top: .5rem;
            padding-bottom: .5rem;
        }
        
        :global(.submenu) {
            border: none !important;
        }
        
        :global(.header.open) {
            background-color: $light !important;
        }
        
        :global(.item.file) {
            margin-left: 0.5rem;
            border-left: 1px solid rgba($dark, .25);
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
        border: 1px solid rgba($dark, 0.25);
        transition: .15s;
    }
    
    .filter:hover(:not(.btn-primary)) {
        background: rgba($dark, 0.1);
    }
</style>