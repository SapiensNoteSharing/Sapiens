<script>
import Icon from '$lib/components/Icon.svelte';
import Course from '$lib/components/Course.svelte';

let data = {
    professors: ['Giorgio', 'Caterina'],
    codice: 'B00047',
    name: 'Geom e alg Lineare'
}

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Course {data} class="mb-3"/>

<div class="w-100" style="height: 200px">
    <Icon title="prova" iconType="bi-list"/>
</div>