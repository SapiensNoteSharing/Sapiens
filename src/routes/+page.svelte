<script>
import Icon from '$lib/components/Icon.svelte';
import Course from '$lib/components/Course.svelte';

let data = {
    professors: ['Caterina Stoppato', 'Giorgio Ottaviani'],
    codice: 'B003273',
    name: 'Geometria e algebra Lineare'
}

</script>

<Course {data} class="mb-3"/>