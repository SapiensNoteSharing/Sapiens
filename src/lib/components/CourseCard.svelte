<script>
    import Rating from "./Rating.svelte";
    import Icon from "./Icon.svelte";

    export let course = {};
    let classes = '';
    export {classes as class};
    export let style = '';
</script>

<div class="course-card p-4 d-flex flex-column justify-content-between {classes}" style="width: 47%;">
    <div class="d-flex flex-row justify-content-between align-items-top">
        <img style="width: 4rem;" src="/src/style/target.png" alt="Course icon">
        
        <div class="d-flex flex-row justify-content-between align-items-top">
            {#if course.favourite}
                <div class="text-dark pulse">
                    <i class="icon mx-2 bi bi-heart-fill"></i>
                </div>
            {:else}
                <div class="text-dark">
                    <i class="icon mx-2 bi bi-heart"></i>
                </div>
            {/if}

            {#if course.owned}
                <a class="" href="/corsi/{course.id}/scheda"><i class="icon mx-2 text-dark bi bi-box-arrow-up-right"></i></a>
            {:else if course.in_cart}
                <div class="text-dark">
                    <i class="icon mx-2 text-dark bi bi-cart-fill"></i>
                </div>
            {:else}
                <div class="text-dark">
                    <i class="icon mx-2 text-dark bi bi-cart"></i>
                </div>
            {/if}
        </div>
    </div>
    <h5 class="mt-3">{course.cdl_code}</h5>
    <h1 class="display-5">{course.name}</h1>

    <div class="d-flex justify-content-between">
        <div>
            {#each course.professors as professor, i}
                <a class="text-decoration-none professor" href="/professors/{professor}">{professor}</a>{i != course.professors.length-1 ? " / " : ""}
            {/each}
        </div>
        <p class="dark" style="margin: 0px;">{course.cfu} CFU</p>
    </div>
</div>

<style lang="scss">
    @import "$css/variables.scss";

    .icon {
        font-size: 20px;
        margin: 0rem 1rem;
    }

    .course-card {
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }

    .course-card:hover {
        transition: .25s ease-in-out;
        position: relative;
        box-shadow: 0px 5px 10px 0px rgba($dark, 0.1);
    }

    .course-bottom {
        background: $light;
        border: 1px solid $dark;   
        border-top: 0px;     
    }

    a {
        text-decoration: none;
        font-size: 16px;
        color: #0b1613;
    }

    @keyframes pulse-animation {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }

    .pulse {
        animation-name: pulse-animation;
        animation-duration: .5s;
        animation-iteration-count: 1;
    }    

    .professor {
        transition: .3s;
        color: $dark;
    }

    .professor:hover {
        color: $secondary;
    }
</style>