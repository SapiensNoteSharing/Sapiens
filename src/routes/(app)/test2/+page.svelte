<script>
    import Searchbar from '$lib/components/Searchbar.svelte';
    export let data;
    let my_courses = data.my_courses || [];
    let courses = data.courses || [];
    let sorting_method = "chronological_order";
</script>

<div>
    <Searchbar data={courses} sorting_method={sorting_method}></Searchbar>
</div>