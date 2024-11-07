<script>
    import Rating from './Rating.svelte'
    import { onMount } from 'svelte';
    import { user } from '$lib/stores'
    import LeaveReview from './LeaveReview.svelte';
    let classes = "";
    export {classes as class};

    export let course = {};

    let reviews = []
    async function load(){
        const resp = await fetch(`/api/courses/${course._id}/reviews`)
        reviews = (resp.ok && await resp.json()) || []
    }
    onMount(() => {
        load()
    })
</script>

<div class="d-flex flex-column reviews-container rounded {classes}">
    <h2 class="ms-3 mt-2 mb-0">Recensioni:</h2>
    {#each reviews as review}
        <div class="review-container">
            <div class="d-flex align-items-center mb-2">
                <h4 class="mb-0 me-3">{review.title}</h4>
                <Rating rating={review.rating}/>
            </div>
            {review.description}
            <div class="d-flex justify-content-end">
                Scritta da: {review.user.name} il {new Date(review.createdAt).toLocaleString()}
            </div>
        </div>
    {/each}
    {#if !reviews.length}
        <span class="ms-3">Ancora nessuna recensione! Sii tu il primo!</span>
    {/if}
    {#if $user.courses.find(c => c.course == course._id)}
        <LeaveReview course={course} />
    {/if}
</div>

<style>
    .icon {
        font-size: 20px;
        margin: 0rem -0.4rem;
    }
    .reviews-container {
        border: 1px solid rgba(127, 127, 127, 0.5);
        min-height: 50px;
    }
    .review-container {
        padding: 1rem;
    }
</style>
