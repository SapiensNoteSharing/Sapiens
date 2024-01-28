<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import ActiveButton from '$lib/components/ActiveButton.svelte';

    let classes = "";
    export {classes as class}
    export let style = "";
    export let courses = [];
    export let best_sellers = [];
    export let new_courses = [];
    export let best_courses = [];
    let suggestions_category = "best_sellers";

    let showed = []
    function load_showed_courses(suggestions_category) {
        showed = [];
        switch (suggestions_category) {
            case "best_sellers":
                for (let i = 0; i < best_sellers.length; i++)
                    showed.push(courses.find(course => course.name == best_sellers[i]));
                break;
            case "new_courses":
                for (let i = 0; i < new_courses.length; i++)
                    showed.push(courses.find(course => course.name == new_courses[i]));
                break;
            case "best_reviewed":
                for (let i = 0; i < best_courses.length; i++)
                    showed.push(courses.find(course => course.name == best_courses[i]));
                break;
        }
    }

    $: load_showed_courses(suggestions_category);
</script>

<div class="href-box d-flex flex-column justify-content-between align-self-center mb-4 {classes}" style={style}>
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={suggestions_category == "best_sellers" ? 'active' : 'not-active'}
        class={"me-3"}
        text={"I più venduti"}
        icon={"bi-graph-up-arrow"}
        on:click={() => suggestions_category = "best_sellers"}
        />
        
        <ActiveButton 
        type={"navigation_link"}
        active={suggestions_category == "new_courses" ? 'active' : 'not-active'}
        fill={suggestions_category == "new_courses" ? '-fill' : ''}
        class={"me-3"}
        text={"Nuovi"}
        icon={"bi-bookmark-plus"}
        on:click={() => suggestions_category = "new_courses"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={suggestions_category == "best_reviewed" ? 'active' : 'not-active'}
        fill={suggestions_category == "best_reviewed" ? '-fill' : ''}
        class={"me-3"}
        text={"Migliori recensioni"}
        icon={"bi-star"}
        on:click={() => suggestions_category = "best_reviewed"}
        />
    </div>
    <div class="d-flex flex-column justify-content-between mb-1">
        {#if showed.length > 0}
            {#each showed as course}
                <div class="d-flex flex-row text-decoration-none justify-content-between align-items-end">
                    <div class="d-flex flex-row align-items-center">
                        <img class="me-4" style="height: 5rem;" src="/src/style/course_icons/{course?.name?.toLowerCase()?.replace(/\s/g, '_')}.png" alt="{course?.name} icon">
                        <div class="d-flex flex-column text-dark align-items-start">
                            <h2 class="display-4">{course?.name}</h2>
                            <h4 class="">{course?.code} &bull; {course?.cfu} CFU</h4>
                            <div class="d-flex text-dark flex-row justify-content-between mb-2">
                                <div>
                                    {#each course?.professors as professor, i}
                                        <span class="text-decoration-none professor">{professor}</span>{i != course?.professors?.length - 1 ? " / " : ""}
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>

                    <NormalButton class={"ms-3"}>
                        <div slot="name">
                            <a type="button" class="btn btn-primary border-0 px-4 text-center w-100 text-dark fs-2" href="/negozio/corsi_singoli/{course?.name?.toLowerCase()?.replace(/\s/g, '_')}">
                                Dettagli
                            </a>
                        </div>
                    </NormalButton>
                </div>
                <hr class="my-4">
            {/each}
        {/if}
    </div>

    <div class="d-flex flex-row justify-content-center">
        <NormalButton class={""}>
            <div slot="name">
                <a type="button" class="btn btn-primary border-0 px-4 text-center w-100 text-dark fs-2" href="/negozio/pacchetti">
                    Vai ai pacchetti
                </a>
            </div>
        </NormalButton>
        <NormalButton class={"ms-3"}>
            <div slot="name">
                <a type="button" class="btn btn-secondary border-0 px-4 text-center w-100 text-dark fs-2" href="/negozio/corsi_singoli">
                    Esplora tutti
                </a>
            </div>
        </NormalButton>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';
    
    .href-box {
        text-decoration: none;
        color: $dark;
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 1rem;
        transition: .25s ease-in-out;
    }
</style>