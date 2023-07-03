<script>
    import Rating from "./Rating.svelte";
    import Icon from "./Icon.svelte";

    export let course = {};
    let classes = '';
    export {classes as class};
    export let style = '';
</script>

<div class="card {classes}" style="width: 45%;">
    <div class="course-top p-4">
        <!-- title, favourites and cart -->
        <div class="d-flex justify-content-between">
            <div>
                <h1 class="card-title m-0">{ course.code } - { course.name}</h1>
            </div>
            <div class="d-flex">
                {#if course.favourite}
                    <div class="text-secondary pulse">
                        <i class="icon mx-2 bi bi-heart-fill"></i>
                    </div>
                {:else}
                    <div class="text-secondary">
                        <i class="icon mx-2 bi bi-heart"></i>
                    </div>
                {/if}

                {#if course.owned}
                    <a class="" href="/corsi/{course.id}/scheda"><i class="icon mx-2 text-secondary bi bi-box-arrow-up-right"></i></a>
                {:else if course.in_cart}
                    <div class="text-secondary">
                        <i class="icon mx-2 text-secondary bi bi-cart-fill"></i>
                    </div>
                {:else}
                    <div class="text-secondary">
                        <i class="icon mx-2 text-secondary bi bi-cart"></i>
                    </div>
                {/if}
            </div>
        </div>

        <!-- tags -->
        <div>

        </div>
    </div>

    <div class="course-bottom">        
        <div class="d-flex justify-content-between p-4">
            <div>
                {#each course.professors as professor, i}
                    <a class="text-decoration-none professor" href="/professors/{professor}">{professor}</a>{i != course.professors.length-1 ? " / " : ""}
                {/each}
            </div>
            <p class="dark" style="margin: 0px;">{course.CFU} CFU</p>
        </div>

        <div class="d-flex p-4 justify-content-between">
            <label for="{course.name}_favourite">
                <input type="checkbox" class="hidden cursor-pointer" id="{course.name}_favourite" bind:checked={course.favourite}>
            </label>
        </div>

        <div class="accordion" id="{course.name}-reviews">
            <div class="accordion-item">
                <h2 class="accordion-header" id="{course.name}-reviews-heading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#{course.name}-reviews-body" aria-expanded="false" aria-controls="{course.name}-reviews-body">
                        <div class="d-flex w-100 justify-content-between align-items-center">
                            <div>
                                <span>{ course.reviews_number } recensioni</span>    
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="me-2">{ course.rating }</span>
                                <Rating { course } class="me-3"/>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id="{course.name}-reviews-body" class="accordion-collapse collapse" aria-labelledby="{course.name}-reviews-heading">
                    <div class="accordion-body">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "$css/variables.scss";

    .icon {
        font-size: 20px;
        margin: 0rem 1rem;
    }

    .confined {
        border: 1px solid;
    }

    .course-top {
        border: 1px solid $dark;
        background: $primary;
        border-radius: 1rem 1rem 0rem 0rem;
    }

    .course-bottom {
        background: $light;
        border: 1px solid $dark;   
        border-top: 0px;     
        border-radius: 0rem 0rem 1rem 1rem;
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