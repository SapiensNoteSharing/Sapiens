<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { onMount } from 'svelte';

    let classes = "";
    export {classes as class}
    export let style = "";

    let icons = {
        'New!': 'bi-bookmark-plus',
        'Best Seller': 'bi-graph-up-arrow',
        'Best Reviewed': 'bi-star'
    }

    let suggestions;
    let suggestions_category;

    let showed;

    async function load_suggestions() {
        const resp = await fetch(`/api/courses/topchoices`);
        suggestions = (resp.ok && await resp.json()) || []
        suggestions_category = suggestions?.[0]?._id
    }

    onMount(() => {
        load_suggestions()
    })

$: showed = suggestions?.find(sugg => sugg._id == suggestions_category)?.courses || []
</script>

<div class="href-box d-flex flex-column justify-content-between align-self-center mb-4 {classes}" style={style}>
    <div class="d-flex flex-row mb-5">
        {#each suggestions?.map(sugg => sugg._id) || [] as tag}
        <ActiveButton
        type={"navigation_link"}
        active={suggestions_category == tag ? 'active' : 'not-active'}
        class={"me-3"}
        text={tag}
        icon={icons[tag]}
        on:click={() => suggestions_category = tag}
        />
        {/each}
    </div>
    <div class="d-flex flex-column justify-content-between mb-1">
        {#if showed?.length > 0}
            {#each showed as course}
                <div class="d-flex flex-row text-decoration-none justify-content-between align-items-end">
                    <div class="d-flex flex-row align-items-center">
                        <img class="me-4" style="height: 5rem;" src="/course_icons/{course?.name?.toLowerCase()?.replace(/\s/g, '_')}.png" alt="{course?.name} icon">
                        <div class="d-flex flex-column text-dark align-items-start">
                            <h2 class="display-4">{course?.name}</h2>
                            <h4 class="">{course?.code} &bull; {course?.cfu} CFU</h4>
                            <div class="d-flex text-dark flex-row justify-content-between mb-2">
                                <div>
                                    {#each (course?.professors || []) as professor, i}
                                        <span class="text-decoration-none professor">{professor}</span>{i != course?.professors?.length - 1 ? " / " : ""}
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>

                    <NormalButton class={"ms-3"}>
                        <div slot="name">
                            <a type="button" class="btn btn-primary border-0 px-4 text-center w-100 text-dark fs-2" href="/negozio/corsi/{course?._id}">
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
                <a type="button" class="btn btn-secondary border-0 px-4 text-center w-100 text-dark fs-2" href="/negozio/corsi">
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