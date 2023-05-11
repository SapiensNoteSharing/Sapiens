<script>
    let classes = "";
    export {classes as class};

    export let course = {};
    let filled_stars = Math.floor(course.rating);
    let half_star = (course.rating % 1) ? 1 : 0; 
    let empty_stars = Math.floor(5 - course.rating);
</script>

<div class="d-flex {classes}">
    {#each Array(filled_stars) as _, index (index)}
        <i class="bi bi-star-fill icon me-2 text-success"></i>
    {/each}
    {#if half_star}
        <i class="bi bi-star-half icon me-2 text-success"></i>
    {/if}
    {#each Array(empty_stars) as _, index (index)}
        <i class="bi bi-star icon me-2 text-success"></i>
    {/each}
</div>

<style>
    .icon {
        font-size: 20px;
        margin: 0rem -0.4rem;
    }
</style>
