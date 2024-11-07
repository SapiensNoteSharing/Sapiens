<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import { viewing, user } from '$lib/stores';
    import { goto } from '$app/navigation';
    import { addToCart, removeFromCart } from '$lib/utils'

    export let course = {};

    let classes = '';
    export {classes as class};
    
    export let style = '';
    export let href;
    export let owned;
    export let width = 47;

    function setViewing() {
        let bookmark = $user.courses.find(c => c.course == course._id)?.bookmark
        if (bookmark)
            $viewing = {_id: bookmark, course: course}
        else
            $viewing = {course: course}
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="course-card d-flex flex-row justify-content-between text-decoration-none {classes}" style="min-width: fit-content; width: {width}%; {style}" on:click={() => {if (!owned) goto(href)}}>
    <div class="d-flex flex-column justify-content-between w-100">
        <div class="d-flex flex-row justify-content-between align-items-top">
            <img class="mb-2 course-icon" src="/course_icons/{course?.name?.toLowerCase().replace(/\s/g, '_')}.png" alt="{course.name}">

            <div class="d-flex flex-row justify-content-between">
                {#if owned}
                <a class="course_extra_icon {owned ? "" : "disabled"}" href={href} on:click={setViewing}><i class="display-3 ms-4 bi bi-pencil-square"></i></a>
                <a class="course_extra_icon {owned ? "" : "disabled"}" href={href} on:click={setViewing}><i class="display-3 ms-4 bi bi-plus-slash-minus"></i></a>
                <a class="course_extra_icon {owned ? "" : "disabled"}" href={href} on:click={setViewing}><i class="display-3 ms-4 bi bi-chat-dots"></i></a>
                <a class="course_extra_icon" href={`/negozio/corsi/${course._id}`}><i class="display-3 ms-4 me-2 bi bi-info-circle-fill"></i></a>
                {/if}
            </div>
        </div>

        <h5 class="mt-3 text-dark">{course.code} &bull; {course.cfu} CFU</h5>
        <h1 class="display-4 mb-3 text-dark">{course.name}</h1>

        <div class="d-flex text-dark flex-row justify-content-between mb-2">
            <div>
                {#each course.professors as professor, i}
                    <span class="text-decoration-none professor">{professor}</span>{i != course.professors.length - 1 ? " / " : ""}
                {/each}
            </div>
        </div>

        <div>
            <p>{course.description}</p>
        </div>

        <div class="d-flex flex-wrap justify-content-between align-items-end">
            <div>
                <p class="text-dark d-block me-3" style="margin: 0px;">{course.year}° anno &bull; {course.semester == 0 ? 'Annuale' : `${course.semester}° semestre`}</p>
            </div>
            {#if !owned}
            <div>
                <NormalButton class={""}>
                    <div slot="name">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-missing-attribute -->
                        {#if $user.courses.find(c => c.course == course._id)}
                            <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2">
                                Possiedi già questo corso!
                            </a>
                        {:else if $user.cart.find(c => c.course == course._id)}
                            <a type="button" class="btn btn-secondary px-4 py-2 text-center w-100 text-dark fs-2" on:click|preventDefault={async (ev) => removeFromCart(course, ev)}>
                                Rimuovi dal carrello
                            </a>
                        {:else}
                            <a type="button" class="btn btn-primary px-4 py-2 text-center w-100 text-dark fs-2" on:click|preventDefault={async (ev) => addToCart(course, ev)}>
                                Aggiungi al carrello
                            </a>
                        {/if}
                    </div>
                </NormalButton>
            </div>
            {/if}
        </div>
    </div>

    <div class="d-flex flex-column justify-content-between">
        <!-- {#if course.owned} -->
            <!-- {#if course.pinned} -->
                <!-- <div class="icon-container">
                    <i class="text-secondary display-3 mx-2 bi bi-pin-angle-fill"></i>
                    <i class="text-dark display-3 mx-2 bi bi-pin-angle"></i>
                </div> -->
            <!-- {:else} -->
            <!-- <i class="text-dark display-3 mx-2 bi bi-pin-angle"></i> -->
            <!-- {/if} -->
        <!-- {:else} -->
            
        <!-- {/if} -->
    </div>

    <!-- circular progress bar -->
    <!-- <div class="donut-container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="3rem" height="3rem">
            <circle cx="1.5rem" cy="1.5rem" r="1rem" stroke-linecap="round">
        </svg>
    </div> -->
    
    <!-- vertical progress bar -->
    <!-- <div class="d-flex flex-row justify-content-between">
        <div class="vertical-progress-bar d-flex flex-row justify-content-center">
            <div class="vertical-progress-bar-content"></div>
            <h6 class="vertical-progress-bar-text">64%</h6>
        </div>
    </div> -->
</div>

<style lang="scss">
    @import "$css/variables.scss";
    .course-card {
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 1.5rem;
        padding: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;

        &:hover {
            transition: .25s ease-in-out;
            position: relative;
            transform: translate(0px, -2px);
            box-shadow: 0px 5px 10px 0px rgba($dark, 0.1);
        }

        .course_extra_icon {
            i {
                color: rgba($dark, .5);
                transition: .15s;
            }

            &:not(.disabled) i:hover {
                color: $secondary;
            }
        }

        .course-icon {
            width: 4rem;
            height: 4rem;
        }
    }
    
    .professor {
        transition: .3s;
        color: $dark;

        &:hover {
            color: $secondary;
        }
    }

    .icon-container {
        position: relative;
        right: 2rem;
    }

    .icon-container i {
        position: absolute;
        top: 0;
        left: 0;
    }

    // vertical progress bar
    // .vertical-progress-bar {
    //     position: relative;
    //     background: $light;
    //     border: 1px solid rgba($dark, .25);
    //     height: 100%;
    //     border-radius: 1rem;
    // }

    // .vertical-progress-bar-content {
    //     padding: 0px;
    //     background: $primary;
    //     border-radius: 1rem;
    //     height: 64%;
    //     width: 1rem;
    //     transform: translateY(calc((100 / 64) * (100 - 64) * 1%));
    // }

    // .vertical-progress-bar-text {
    //     background: $primary;
    //     color: $dark;
    //     margin: 0px;
    //     padding: .25rem .5rem;
    //     border: 1px solid rgba($dark, .25);
    //     border-radius: 3rem;
    //     position: absolute;
    //     bottom: 64%;
    //     transform: translate(0%, 50%);
    // }

    // circular progress bar
    // .donut-container {
    //     position: relative;
    //     width: 3rem;
    //     height: 3rem;
    // }

    // circle {
    //     fill: none;
    //     stroke: $primary;
    //     stroke-width: .5rem;
    //     stroke-dasharray: 100;
    //     stroke-dashoffset: 25;
    // }

    // svg {
    //     position: absolute;
    //     transform: rotate(-90deg);
    //     top: 0px;
    //     left: 0px;
    // }

    // @keyframes pulse-animation {
    //     0% {
    //         transform: scale(1);
    //     }
    //     50% {
    //         transform: scale(1.25);
    //     }
    //     100% {
    //         transform: scale(1);
    //     }
    // }

    // .pulse {
    //     animation-name: pulse-animation;
    //     animation-duration: .5s;
    //     animation-iteration-count: 1;
    // }    
</style>