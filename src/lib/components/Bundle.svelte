<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Modal from '$lib/components/Modal.svelte';

    export let type = "";
    export let title = "";
    export let subtitle = "";
    export let courses = [];
    export let href = ""
    export let disabled = false;
    let classes = "";
    export {classes as class}

    let max_list_length = 5;

    let cartModal;
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }
</script>

<Modal title="Carrello" yes="Acquista" no="Annulla" class="" theme="btn-outline-primary" bind:this={cartModal}>
    <div class="d-flex m-4 justify-content-between">
        <div>
            <div class="d-flex mt-3">
                <section class="btn-group">
                    <div class="d-flex flex-row justify-content-start me-2">
                        
                    </div>
                </section>
            </div>
        </div>
        <div class="d-flex">
            <h2 class="align-self-center display-3 my-0"></h2>
            <img style="width: 2rem;" src="/src/style/dna.svg" alt="dna">
        </div>
    </div>
</Modal>

<div class={classes} style="--bs-gutter-x: 1.5rem">
    <div class="bundle">
        <h2 class="display-3"><span class="text-dark">{title}</span></h2>

        {#if disabled == false}
            {#if courses.length > 0}
                <h2 class="display-5 my-3"><span class="text-dark">{subtitle} &bull; {courses.length} corsi</span></h2>

                <div class="d-flex flex-column justify-content-between mt-4">
                    {#if courses.length <= max_list_length}
                        {#each courses as course, i}
                            <p class="display-6 text-truncate">{course.name}</p>
                        {/each}
                    {:else}
                        {#each courses as course, i}
                            {#if i < max_list_length - 1}
                                <p class="display-6 text-truncate">{course.name}</p>
                            {/if}
                        {/each}

                        <p class="display-6">... +{courses.length - max_list_length + 1}</p>
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

                <div class="d-flex flex-row justify-content-center">
                    <NormalButton class={"mx-2"}>
                        <div slot="name">
                            <a type="button" class="btn btn-primary text-center w-100 fs-2" href={href}>Dettagli</a>
                        </div>
                    </NormalButton>

                    <NormalButton class={"mx-2"}>
                        <div slot="name">
                            <a type="button" class="btn btn-secondary text-center w-100 fs-2" on:click={openCart}>Ottieni</a>
                        </div>
                    </NormalButton>
                </div>
            {:else}
                {#if type == "semester"}
                    <h4 class="fs-3 mb-4">Purtroppo non abbiamo ancora corsi per questo <strong>semestre</strong>.</h4>
                {:else if type == "year"}
                    <h4 class="fs-3 mb-4">Purtroppo non abbiamo ancora corsi per questo <strong>anno</strong>.</h4>
                {:else if type == "faculty"}
                    <h4 class="fs-3 mb-4">Purtroppo non abbiamo ancora corsi per questa <strong>facoltà</strong>.</h4>
                {/if}
                <h4 class="fs-3 mb-4">Aiutaci mandandoci i tuoi appunti.</h4>

                <div class="d-flex flex-row justify-content-center">
                    <NormalButton class={"w-100"}>
                        <div slot="name">
                            <a type="button" class="btn btn-primary text-center w-100 fs-2" href="/contribuisci/condividi_appunti">Contribuisci</a>
                        </div>
                    </NormalButton>
                </div>
            {/if}
        {:else}
            <h4 class="fs-3 mb-4">Non abbiamo abbastanza informazioni per creare questo pacchetto per te.</h4>
            {#if type == "semester"}
                <h4 class="fs-3">Inserisci il <strong>semestre</strong> che stai frequentando.</h4>
            {:else if type == "year"}
                <h4 class="fs-3">Inserisci l'<strong>anno</strong> che stai frequentando.</h4>
            {:else if type == "faculty"}
                <h4 class="fs-3">Inserisci la <strong>facoltà</strong> alla quale sei iscritto.</h4>
            {/if}
            <div class="d-flex flex-row justify-content-center mt-5">
                <NormalButton class={"w-100"}>
                    <div slot="name">
                        <a type="button" class="btn btn-primary text-center w-100 fs-2" href="/area_personale/dati_account">Aggiungi dati</a>
                    </div>
                </NormalButton>
            </div>
        {/if}
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