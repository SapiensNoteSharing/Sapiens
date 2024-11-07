<script>
    let classes = "";
    export {classes as class};


    /*TODO: potenziare rating: se inizializzato con valore non cliccabile (solo lettura), 
            altrimenti se inizializzato con rating undefined, 
            cliccabile per lasciare un voto (anche scrittura)
    */
    export let rating = 0;

    let filled_stars = Math.floor(rating);
    let half_star = (rating % 1) ? 1 : 0; 
    let empty_stars = Math.floor(5 - rating);

</script>

<div class="d-flex {classes}">
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
