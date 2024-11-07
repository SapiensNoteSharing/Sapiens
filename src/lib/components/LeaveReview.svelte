<script>
    import Rating from '$lib/components/Rating.svelte'
    import { info, error } from '$lib/toast'
    let classes = "";
    export {classes as class};

    export let course = {};

    let review = {}

    async function submit(){
        const resp = await fetch(`/api/user/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...review, course: course._id, rating: review.rating || 2})
        })
        const answ = (resp.ok && await resp.json()) || {}
        if(answ.success){
            info('La tua recensione è stata salvata')
        } else {
            error('Qualcosa è andato storto')
        }
    }

    function checkValidity(review){
        return review.title
    }
</script>

<h4 class="ms-3 mt-2">Recensisci il corso:</h4>
<div class="review-container">
    <div class="d-flex align-items-center mb-2">
        <label for="title" class="mx-3">Title: </label>
        <input class="form-control w-50" bind:value={review.title}>
        <Rating class="ms-5" bind:rating={review.rating}/>
    </div>
    <label for="description" class="mx-3">Description: </label>
    <textarea class="review-body form-control w-75 mx-3" for="description" bind:value={review.description}></textarea>
    <div class="d-flex justify-content-end p-3">
        <button class="btn btn-primary" disabled={!checkValidity(review)} on:click={submit}>Invia</button>
    </div>
</div>

<style>
    .icon {
        font-size: 20px;
        margin: 0rem -0.4rem;
    }
    .review-body {
        min-height: 50px;
    }
</style>
