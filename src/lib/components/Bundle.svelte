<script>
    import NormalButton from '$lib/components/NormalButton.svelte';

    export let title;
    export let courses;
    export let href

    let max_list_length = 4;
</script>

<div class="col-md-4" style="--bs-gutter-x: 1.5rem">
    <div class="bundle">
        <h2 class="display-3"><span class="text-dark">{title}</span></h2>
        <h2 class="display-6 mb-4">{courses.length} corsi</h2>

        <div class="d-flex flex-column justify-content-between">
            {#each courses as course, i}
                {#if i < max_list_length}
                    <p class="display-6">{course.name}</p>
                {/if}
            {/each}

            {#if courses.length >= max_list_length}
                <p class="display-6">... +{courses.length - max_list_length}</p>
            {/if}
        </div>
            
        <!-- <div class="d-flex flex-row justify-content-between flex-wrap align-items-end">
            {#each semester_bundle_courses as course}
                {#if course.owned}
                    <img class="bundle-course-icon" style="filter: grayscale(100%);" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt="">
                {:else}
                    <img class="bundle-course-icon" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt="">
                {/if}
            {/each}
        </div> -->

        <div class="d-flex flex-row justify-content-center mt-3">
            <NormalButton class={"mx-2"}>
                <div slot="name">
                    <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" href={href}>Dettagli</a>
                </div>
            </NormalButton>

            <NormalButton class={"mx-2"}>
                <div slot="name">
                    <a type="button" class="btn btn-secondary text-center w-100 text-dark fs-2" on:click={openCart}>Ottieni</a>
                </div>
            </NormalButton>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .bundle {
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 1.5rem;
        padding: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;

        &:hover {
            transition: .25s ease-in-out;
            position: relative;
            box-shadow: 0px 5px 10px 0px rgba($dark, 0.1);
        }
    }

    .box {
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }

    .bundle-course-icon {
        width: 3.5rem;
        margin: 2rem 1.5rem 0rem 1.5rem;
    }
</style>