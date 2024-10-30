<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Modal from '$lib/components/Modal.svelte';

    import { user } from '$lib/stores';
    import { goto } from '$app/navigation';
    import { costFormula } from '$lib/utils';    

    export let items;
    export let courses;
    export let cartModal;

    export function openCart(ev) {
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        cartModal.show().then(async res => {
            if (res) {
                const resp = await fetch(`/api/user/${$user._id}/buy`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(items.map(i => ({_id: i._id, plan: i.plan})))
                })
                const body = (resp.ok && await resp.json())

                if (body.success)
                    $user.courses.push(items.map(i => ({course: i._id, plan: i.plan})))
                else
                    goto('/negozio/punti_dna')
            };
        })
    }
</script>

<NormalButton>
    <div slot="name">
        <div class="cart-icon px-3 py-2" on:click={openCart}>
            <i class="bi bi-cart m-0"></i>
        </div>
    </div>
</NormalButton>

<Modal title="Carrello" yes="Acquista" no="Annulla" class="" xlarge="true" theme="btn-outline-primary" bind:this={cartModal}>
    {#if items.length}
        {#each items as item}
            {@const course = courses.find(c => c._id == item.course)}
            <div class="d-flex justify-content-between m-4">
                <div class="d-flex flex-row align-items-center mb-4">
                    <img class="me-4 course-icon" src="/course_icons/{course?.name?.toLowerCase()?.replace(/\s/g, '_')}.png" alt="{course?.name}" style="width: 5rem; height: 5rem;">

                    <div class="d-flex flex-column justify-content-between align-items-left">
                        <span class="display-6">{course.code}</span>
                        <h2 class="display-4 text-dark">{course.name}</h2>
                        <div>
                            {#each course?.professors || [] as professor, i}
                                <span class="text-dark">{professor} {i != course?.professors?.length - 1 ? " / " : ""}</span>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-row justify-content-between mb-4">
                    <div class="d-flex flex-row justify-content-center me-2 my-auto">
                        <ActiveButton
                            type="navigation_link"
                            active={item.plan == 0 ? 'active' : 'not-active'}
                            fill={item.plan == 0 ? '-fill' : ''}
                            class={"me-3"}
                            text={"Base"}
                            icon={"bi-file-earmark"}
                            on:click={() => item.plan = 0}
                        />

                        <ActiveButton 
                            type="navigation_link"
                            active={item.plan == 1 ? 'active' : 'not-active'}
                            fill={item.plan == 1 ? '-fill' : ''}
                            class={"me-3"}
                            text={"Completo"}
                            icon={"bi-folder"}
                            on:click={() => item.plan = 1}
                        />
                    </div>

                    <div class="d-flex ms-4">
                        <h2 class="align-self-center display-3 my-0">{costFormula(course.cfu, item.plan)}</h2>
                        <img style="width: 2rem;" src="/dna.svg" alt="dna">
                    </div>
                </div>

                <!-- TODO: make it as a popover -->
                <!-- <h2>Include:</h2>
                {#if selected_option == 0}
                    <p class="m-0">Solo gli appunti</p>
                {:else}
                    <p class="m-0">Appunti, esercizi svolti, formulario e lo storico delle domande poste alla prova orale</p>
                {/if} -->
            </div>
        {/each}

        <hr>

        <div class="d-flex justify-content-between m-4">
            <h2 class="display-4 text-dark my-auto">Totale</h2>

            <div class="d-flex ms-4">
                <h2 class="align-self-center display-3 my-0">{items.reduce((acc, i) => acc + costFormula(courses.find(c => c._id == i.course).cfu, i.plan), 0)}</h2>
                <img style="width: 2rem;" src="/dna.svg" alt="dna">
            </div>
        </div>
    {:else}
        Il carrello è vuoto. Aggiungi un corso per cominciare!
    {/if}
</Modal>

<style lang="scss">
    @import '$css/variables.scss';
    
    .cart-icon {
        border-radius: 1rem;
        transition: .15s;

        &:hover {
            background-color: rgba($dark, .05);
            color: $secondary;
            transition: .15s;
            cursor: pointer;
        }
    }
</style>