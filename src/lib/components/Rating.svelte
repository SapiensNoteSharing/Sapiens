<script>
    let classes = "";
    export {classes as class};

    export let course = {};
    if(!course.rating) course.rating = 0
    let filled_stars = Math.floor(course.rating);
    let half_star = (course.rating % 1) ? 1 : 0; 
    let empty_stars = Math.floor(5 - course.rating);
</script>

<div class="d-flex {classes}" id="{course.name}-rating">
    <!-- <span>Valutazioni: </span>  -->
    {#each Array(filled_stars) as _, index (index)}
        <i class="bi bi-star-fill icon px-2 text-success"></i>
    {/each}
    {#if half_star}
        <i class="bi bi-star-half icon px-2 text-success"></i>
    {/if}
    {#each Array(empty_stars) as _, index (index)}
        <i class="bi bi-star icon px-2 text-success"></i>
    {/each}
    <!-- <span class="ms-3">{ course.rating }</span> -->
</div>

<style>
    .icon {
        font-size: 20px;
        margin: 0rem -0.4rem;
    }
</style>
