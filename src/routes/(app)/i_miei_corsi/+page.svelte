<script>
    import CourseCard from '$lib/components/CourseCard.svelte';
    import TopChoices from '$lib/components/TopChoices.svelte';
    import { filters, user } from '$lib/stores';
    import { filter_and_sort } from '$lib/utils';
    
    export let data;
    let courses = data.courses || [];
    let my_courses = data.my_courses || [];

    let filtered_owned = filter_and_sort(my_courses, $filters.sorting_method.field, $filters.sorting_method.secondary_field, $filters.sorting_method.ascending);

    let suggestions_category = "best_sellers";
    let best_sellers = ["Algoritmi e strutture dati", "Analisi Matematica I", "Fisica I"];
    let new_courses = ["Fisica II", "Geometria e algebra lineare", "Algoritmi e strutture dati"];
    let best_courses = ["Fondamenti di ricerca operativa", "Fondamenti di informatica", "Fondamenti di segnali e trasmissione"];

    let showed = []
    function load_showed_courses(suggestions_category) {
        showed = []
        switch (suggestions_category) {
            case "best_sellers":
                for (let i = 0; i < best_sellers.length; i++)
                    showed.push(courses.find(course => course.name == best_sellers[i]));
                break;
            case "new_courses":
                for (let i = 0; i < best_sellers.length; i++)
                    showed.push(courses.find(course => course.name == new_courses[i]));
                break;
            case "best_reviewed":
                for (let i = 0; i < best_sellers.length; i++)
                    showed.push(courses.find(course => course.name == best_courses[i]));
                break;
        }
    }

    $: load_showed_courses(suggestions_category);
</script>

<div class="d-flex flex-column">
    {#if filtered_owned.length > 0}
        <div class="d-flex mb-5 justify-content-between">
            <div class="d-flex align-items-center">
                {#if $filters.tags.length == 2}
                    <span class=""><i class="icon bi bi-funnel"></i></span>
                    <h4 class="fs-6 ms-3 my-0">Nessun filtro selezionato</h4>
                {:else}
                    <span class="py-2"><i class="icon bi bi-funnel-fill"></i></span>
                {/if}

                {#each $filters.tags as tag}
                    {#if tag.selected}
                        <span class="badge my-auto p-2 bg-{ tag.color } ms-3 filter_badge text-dark">{ tag.name }</span>
                    {/if}
                {/each}
            </div>
            
            <div class="d-flex align-items-center">

            </div>
        </div>

        <div class="d-flex flex-wrap justify-content-between align-content-between">
            {#if $filters.sorting_method.field == "year"}
                <div class="w-100 mb-3">
                    <h3 class="display-3 m-0">{filtered_owned[0].year} anno</h3>
                </div>
                <div class="w-100 mb-4">
                    <h3 class="display-4 m-0">{filtered_owned[0].semester} semestre</h3>
                </div>
                {#each filtered_owned as course, $index}
                    {#if $index > 0}
                        {#if course.year != filtered_owned[$index - 1].year}
                            <div class="w-100 mb-3">
                                <h3 class="display-3 m-0">{course.year} anno</h3>
                            </div>
                            <div class="w-100 mb-4">
                                <h3 class="display-4 m-0">{course.semester} semestre</h3>
                            </div>
                        {:else if course.semester != filtered_owned[$index - 1].semester}
                            <div class="w-100 mb-4">
                                <h3 class="display-4 m-0">{course.semester} semestre</h3>
                            </div>
                        {/if}
                    {/if}
                    <CourseCard {course} owned=1 class="g-col-4 mb-5" href="/aula_studio"/>
                {/each}
            {:else if $filters.sorting_method.field == "name"}
                <div class="w-100 mt-3">
                    <h3 class="display-3 m-0">{filtered_owned[0].name[0]}</h3>
                </div>
                {#each filtered_owned as course, $index}
                    {#if $index > 0}
                        {#if course.name[0] != filtered_owned[$index - 1].name[0]}
                            <div class="w-100 mb-4">
                                <h3 class="display-4">{course.name[0]}</h3>
                            </div>
                        {/if}
                    {/if}
                    <CourseCard {course} owned=1 class="g-col-4 mb-5"/>
                {/each}
            {:else}
                {#each filtered_owned as course}
                    <CourseCard {course} owned=1 class="g-col-4 mb-5"/>
                {/each}
            {/if}
        </div>
    {:else}
        <h2 class="display-4 mb-4">Al momento non hai nessun corso</h2>

        <TopChoices
        courses={courses}
        class={""}
        style={"width: 800px;"}
        best_sellers={["Algoritmi e strutture dati", "Analisi Matematica I", "Fisica I"]}
        new_courses={["Fisica II", "Geometria e algebra lineare", "Algoritmi e strutture dati"]}
        best_courses={["Fondamenti di ricerca operativa", "Fondamenti di informatica", "Fondamenti di segnali e trasmissione"]}
        />
    {/if}
</div>

<style lang="scss">
    @import '$css/variables.scss';
    .icon {
        display: inline-block;
        position: relative;
        font-size: 1.5rem;
        height: 1.5rem;
    }

    .filter_badge {
        border: 1px solid $dark;
    }
</style>