<script>
    import Rating from "./Rating.svelte";
    import Icon from "./Icon.svelte";

    export let course = {};
    let classes = '';
    export {classes as class};
    export let style = '';
</script>

<div class="card {classes}" style="width: 45%;">
    <div class="card-body p-4">
        <div>
            <h1 class="card-title">{ course.code } - { course.name}</h1>
            {#if course.tags.new}
                <span class="badge bg-success ms-3">New!</span>
            {/if}
            {#if course.tags.best_seller}
                <span class="badge bg-secondary ms-3">Best Seller</span>
            {/if}
        </div>
        
        <div class="d-flex dark py-2" style="justify-content: space-between">
            <div>
                {#each course.professors as professor, i}
                    <a class="text-dark text-decoration-none" href="/professors/{professor}">{professor}</a>{i != course.professors.length-1 ? " / " : ""}
                {/each}
            </div>
            <p class="dark" style="margin: 0px;">{course.CFU} CFU</p>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <a class="" href="/corsi/{course.id}/formulario"><i class="icon me-2 text-secondary bi bi-percent"></i></a>
                <a class="" href="/corsi/{course.id}/note"><i class="icon me-2 text-secondary bi bi-journal-text"></i></a>
                <a class="" href="/corsi/{course.id}/test"><i class="icon me-2 text-secondary bi bi-pencil"></i></a>
                <label for="{course.name}_favourite">
                    <input type="checkbox" class="hidden cursor-pointer" id="{course.name}_favourite" bind:checked={course.favourite}>
                    {#if course.favourite}
                        <i class="icon me-2 text-secondary bi bi-heart-fill"></i>
                    {:else}
                        <i class="icon me-2 text-secondary bi bi-heart"></i>
                    {/if}
                </label>
            </div>

            <Rating {course} class=""/>
        </div>
    </div>
</div>

<style>
    .icon {
        font-size: 20px;
        margin: 0rem 1rem;
    }

    .confined {
        border: 1px solid;
    }

    .course-top, .course-bottom {
        padding: 1rem;
    }

    .course-bottom {
        border-top: 0px;
    }

    a {
        text-decoration: none;
        font-size: 16px;
        color: #0b1613;
    }   
</style>