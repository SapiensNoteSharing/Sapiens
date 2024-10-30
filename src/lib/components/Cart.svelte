<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { user } from '$lib/stores';
    import { goto } from '$app/navigation';
    import { costFormula } from '$lib/utils';    
    export let items;
    export let courses;
    let selected_option = "complete"

    //TODO: cambiare selected_option come booleano

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
                    body: JSON.stringify(items.map(i => ({_id: i._id, plan: i.selected_option})))
                })
                const body = (resp.ok && await resp.json())

                if(body.success){
                    $user.courses.push(items.map(i => ({course: i._id, plan: i.selected_option})))
                } else {
                    goto('/negozio/punti_dna')
                }
            };
        })
    }
</script>

<!--TODO: fix icona-->
<i class="bi bi-cart border border-1" on:click={openCart}></i>
<Modal title="Carrello" yes="Acquista" no="Annulla" class="" theme="btn-outline-primary" bind:this={cartModal}>
    {#each items.map(item => ({course: courses.find(c => c._id == item.course), plan: item.plan})) as item}
    {@const course = item.course}
    <div class="d-flex flex-column justify-content-between m-4">
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
            <div class="d-flex flex-row justify-content-start me-2">
                <ActiveButton
                type="navigation_link"
                active={selected_option == "base" ? 'active' : 'not-active'}
                fill={selected_option == "base" ? '-fill' : ''}
                class={"me-3"}
                text={"Base"}
                icon={"bi-file-earmark"}
                on:click={() => selected_option = "base"}
                />

                <ActiveButton 
                type="navigation_link"
                active={selected_option == "complete" ? 'active' : 'not-active'}
                fill={selected_option == "complete" ? '-fill' : ''}
                class={"me-3"}
                text={"Completo"}
                icon={"bi-folder"}
                on:click={() => selected_option = "complete"}
                />
            </div>

            <div class="d-flex">
                <h2 class="align-self-center display-3 my-0">{costFormula(course.cfu, course.plan)}</h2>
                <img style="width: 2rem;" src="/dna.svg" alt="dna">
            </div>
        </div>

        <h2>Include:</h2>
        {#if selected_option == "base"}
            <p class="m-0">Solo gli appunti</p>
        {:else}
            <p class="m-0">Appunti, esercizi svolti, formulario e lo storico delle domande poste alla prova orale</p>
        {/if}
    </div>
    {/each}
    {#if !items.length}
    Carrello vuoto
    {/if}
</Modal>