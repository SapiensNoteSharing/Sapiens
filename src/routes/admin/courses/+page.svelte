<script>
import Course from '$lib/components/Course.svelte'

export let data;

let courses = data.courses || [];



</script>


<div class="d-flex w-100 justify-content-between align-items-center">
    <h3>Corsi</h3>
    <button class="btn btn-primary" on:click={}>New</button>
</div>

{#each courses as course}
    <Course {course}></Course>
{/each}

