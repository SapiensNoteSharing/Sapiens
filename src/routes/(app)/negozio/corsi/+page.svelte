<script>
    import CourseCard from '$lib/components/CourseCard.svelte';
    import { value, filter_tags } from '$lib/stores';
    import Svelecte from 'svelecte';
    
    export let data;
    let courses = data.courses || [];
    let owned = data.my_courses || [];

    let filtered_not_owned = courses.filter(course => !owned.includes(course));

    let sorting_method = "chronological_order";
    
</script>

<div class="d-flex flex-column">
    <!--
    <div class="d-flex mb-5 justify-content-between">
        <div class="d-flex align-items-center">
            {#if $filter_tags.length == 2}
                <span class=""><i class="icon bi bi-funnel"></i></span>
                <h4 class="fs-6 ms-3 my-0">Nessun filtro selezionato</h4>
            {:else}
                <span class="py-2"><i class="icon bi bi-funnel-fill"></i></span>
            {/if}

            {#each $filter_tags as tag}
                {#if tag.selected}
                    <span class="badge my-auto p-2 bg-{tag.color} ms-3 filter_badge text-dark">{tag.name}</span>
                {/if}
            {/each}
        </div>
        
        <div class="d-flex align-items-center">
            {#if $value != "" && $value != undefined}
                <select class="form-select me-3" placeholder="Ordina per:" aria-label="Default select example" bind:value={sorting_method} disabled>
                    <option class="opt" value="match_ascending" selected>Corrispondenza</option>
                </select>
            {:else}
                <Svelecte
                style="width: 18rem;"
                placeholder="Ordina per:"
                options={sorting_methods}
                class="svelecte-control text-left selection-input"
                bind:value={sorting_method}
                />
            {/if}
        </div>
    </div>
-->

    {#if filtered_not_owned.length != 0}
        <div class="d-flex flex-wrap justify-content-between align-content-between">
            {#if sorting_method == "chronological_order" || sorting_method == "chronological_reverse"}
                <div class="w-100 mb-3">
                    <h3 class="display-3 m-0">{filtered_not_owned[0].year} anno</h3>
                </div>
                <div class="w-100 mb-4">
                    <h3 class="display-4 m-0">{filtered_not_owned[0].semester} semestre</h3>
                </div>
                {#each filtered_not_owned as course, $index}
                    {#if $index > 0}
                        {#if course.year != filtered_not_owned[$index - 1].year}
                            <div class="w-100 mb-3">
                                <h3 class="display-3 m-0">{course.year} anno</h3>
                            </div>
                            <div class="w-100 mb-4">
                                <h3 class="display-4 m-0">{course.semester} semestre</h3>
                            </div>
                        {:else if course.semester != filtered_not_owned[$index - 1].semester}
                            <div class="w-100 mb-4">
                                <h3 class="display-4 m-0">{course.semester} semestre</h3>
                            </div>
                        {/if}
                    {/if}
                    <CourseCard {course} owned=0 class="g-col-4 mb-5" href="/negozio/corsi/{course._id}"/>
                {/each}
            {:else if sorting_method == "name_ascending" || sorting_method == "name_descending"}
                <div class="w-100 mt-3">
                    <h3 class="display-3 m-0">{filtered_not_owned[0].name[0]}</h3>
                </div>
                {#each filtered_not_owned as course, $index}
                    {#if $index > 0}
                        {#if course.name[0] != filtered_not_owned[$index - 1].name[0]}
                            <div class="w-100 my-4">
                                <h3 class="display-4">{course.name[0]}</h3>
                            </div>
                        {/if}
                    {/if}
                    <CourseCard {course} owned=0 class="g-col-4 mb-5" href="/negozio/corsi/{course._id}"/>
                {/each}
            {:else}
                {#each filtered_not_owned as course}
                    <CourseCard {course} owned=0 class="g-col-4 mb-5" href="/negozio/corsi/{course._id}"/>
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