<script>
    import CourseCard from '$lib/components/CourseCard.svelte';
    import { filters } from '$lib/stores';
    import { filter_and_sort, years, semesters } from '$lib/utils';

    export let data;
    let courses = data.courses || [];
    let owned = data.my_courses || [];
    let not_owned = courses.filter(course => !owned.includes(course));
    // TODO: filtrare anche quelli nel carrello

    $: filtered_not_owned = filter_and_sort(courses, $filters.search, $filters.sorting_method.field, $filters.sorting_method.secondary_field, $filters.sorting_method.ascending);
</script>

<div class="d-flex flex-column">
    <div class="d-flex mb-5 justify-content-between">
        <div class="d-flex align-items-center">
            <!-- {#if $filters.tags?.length == 2}
                <span class=""><i class="icon bi bi-funnel"></i></span>
                <h4 class="fs-6 ms-3 my-0">Nessun filtro selezionato</h4>
            {:else}
                <span class="py-2"><i class="icon bi bi-funnel-fill"></i></span>
            {/if}

            {#each $filters.tags as tag}
                {#if tag.selected}
                    <span class="badge my-auto p-2 bg-{tag.color} ms-3 filter_badge text-dark">{tag.name}</span>
                {/if}
            {/each} -->
        </div>
        
        <div class="d-flex align-items-center">

        </div>
    </div>

    {#if filtered_not_owned.length != 0}
        <div class="d-flex flex-wrap justify-content-between align-content-between">
            {#if $filters.sorting_method.field == "year"}
                {#each filtered_not_owned as course, i}
                    {#if course.year != filtered_not_owned[i - 1]?.year}
                        <div class="w-100 mb-3">
                            <h3 class="display-3 m-0">{years?.[course?.year-1]?.label} anno</h3>
                        </div>
                        <div class="w-100 mb-4">
                            <h3 class="display-4 m-0">{course.semester == 0 ? 'Annuale' : `${semesters?.[course?.semester]?.label} semestre`}</h3>
                        </div>
                    {:else if course.semester != filtered_not_owned[i - 1].semester}
                        <div class="w-100 mb-4">
                            <h3 class="display-4 m-0">{course.semester == 0 ? 'Annuale' : `${semesters?.[course?.semester]?.label} semestre`}</h3>
                        </div>
                    {/if}
                    <CourseCard {course} class="g-col-4 mb-5" href="/negozio/corsi/{course?._id}"/>
                {/each}
            {:else if $filters.sorting_method.field == "name"}
                {#each filtered_not_owned as course, i}
                    {#if course.name[0] != filtered_not_owned[i - 1]?.name?.[0]}
                        <div class="w-100 my-4">
                            <h3 class="display-4">{course.name[0]}</h3>
                        </div>
                    {/if}
                    <CourseCard {course} class="g-col-4 mb-5" href="/negozio/corsi/{course?._id}"/>
                {/each}
            {:else}
                {#each filtered_not_owned as course}
                    <CourseCard {course} class="g-col-4 mb-5" href="/negozio/corsi/{course?._id}"/>
                {/each}
            {/if}
        </div>
    {:else}
        <h2>Hai comprato tutti i corsi disponibili! Grazie!</h2>
    {/if}
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>