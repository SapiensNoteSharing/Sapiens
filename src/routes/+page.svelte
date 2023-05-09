<script>
import Icon from '$lib/components/Icon.svelte';
import Course from '$lib/components/Course.svelte';
    import Searchbar from '../lib/components/Searchbar.svelte';

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

<div>
    <Searchbar/>
    <button></button>
</div>

{#each courses as course}
    <Course {course} class="mb-3"/>
{/each}