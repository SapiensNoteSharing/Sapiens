<script>
import Icon from '$lib/components/Icon.svelte';
import Course from '$lib/components/Course.svelte';
import { view } from '$lib/stores';


let courses = [
    {
        professors: ['Caterina Stoppato', 'Giorgio Ottaviani'],
        codice: 'B003273',
        name: 'Geometria e algebra Lineare',
        CFU: '6'
    },
    {
        professors: ['Serena Matucci'],
        codice: 'B019481',
        name: 'Analisi Matematica I',
        CFU: '9'
    },
    {
        professors: ['Fabio Cinti'],
        codice: 'B003273',
        name: 'Fisica I',
        CFU: '6'
    },
    {
        professors: ['Stefano Berretti'],
        codice: 'B003273',
        name: 'Fondamenti di Informatica',
        CFU: '9'
    }
]
</script>


<div class="d-flex flex-column content">
    <div class="d-flex align-items-center my-5">
        <h2 class="ms-auto me-auto display-2">I Miei Corsi</h2>
        <i class="bi bi-gear display-6"></i>
    </div>
        <div class="d-flex mb-5">
            <!--searchbar-->
            <div class="ms-auto btn-group" role="group">
                <input type="radio" class="btn-check" name="view" id="btnradio1" autocomplete="off" value="list" class:active={$view == 'list'} bind:group={$view}>
                <label class="btn btn-outline-primary" for="btnradio1"><i class="bi bi-list"></i></label>
        
                <input type="radio" class="btn-check" name="view" id="btnradio2" autocomplete="off" value="grid" class:active={$view == 'grid'} bind:group={$view}>
                <label class="btn btn-outline-primary" for="btnradio2"><i class="bi bi-border-all"></i></label>

                <input type="radio" class="btn-check" name="view" id="btnradio3" autocomplete="off" value="graph" class:active={$view == 'graph'} bind:group={$view}>
                <label class="btn btn-outline-primary" for="btnradio3"><i class="bi bi-diagram-3-fill"></i></label>
            </div>
        </div>
        {#each courses as course}
            <Course {course} class="mb-3"/>
        {/each}
</div>

<style>
    .content{
        padding-left: 5rem;
        padding-right: 5rem;
    }
</style>
