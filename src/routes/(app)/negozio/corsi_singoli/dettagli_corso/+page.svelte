<script>
    import CourseCard from '$lib/components/CourseCard.svelte';
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { value, filter_tags } from '$lib/stores';
    import { page } from '$app/stores';

    export let data;
    let courses = data.courses || [];
    let user = data.user || {};

    let owned = [
        courses.find(course => course.name == "Analisi Matematica I"),
        courses.find(course => course.name == "Fisica I"),
        courses.find(course => course.name == "Algoritmi e strutture dati"),
    ].filter(Boolean);

    // elenco dei corsi non posseduti
    let ownedCoursesNames = owned.map(course => course.name);
    let not_owned = courses.filter(course => !ownedCoursesNames.includes(course.name));

    let sorting_method = "chronological_order";

    let cartModal;
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }

    let course = courses[0];

    let selected_option = "base";
</script>

<Modal title="Carrello" yes="Acquista" no="Annulla" class="" theme="btn-outline-primary" bind:this={cartModal}>
    <div class="d-flex m-4 justify-content-between">
        <div>
            <span class="display-6">{course.code}</span>
            <h2 class="display-4 text-dark">{course.name}</h2>
            {#each course.professors as professor, i}
                <span class="text-dark">{professor}{i != course.professors.length - 1 ? " / " : ""}</span>
            {/each}
            <div class="d-flex mt-3">
                <section class="btn-group">
                    <div class="d-flex flex-row justify-content-start me-2">
                        <input type="radio" class="btn-check" name="{course.name}-accesso" id="{course.name}-base" bind:group={selected_option}>
                        <ActiveButton 
                        active={selected_option == "base" ? 'active' : 'not-active'}
                        fill={selected_option == "base" ? '-fill' : ''}
                        class={"me-3"}
                        text={"Base"}
                        icon={"bi-box"}
                        />

                        <input type="radio" class="btn-check" name="{course.name}-accesso" id="{course.name}-completo" bind:group={selected_option}>
                        <ActiveButton 
                        active={selected_option == "complete" ? 'active' : 'not-active'}
                        fill={selected_option == "complete" ? '-fill' : ''}
                        class={"me-3"}
                        text={"Completo"}
                        icon={"bi-boxes"}
                        />
                    </div>
                </section>
            </div>
        </div>
        <div class="d-flex">
            <h2 class="align-self-center display-3 my-0">{(10 + course.cfu * 5 / 6) * (selected_option == "base" ? 0.8 : 1) * 2}</h2>
            <img style="width: 2rem;" src="/src/style/DNA.svg" alt="DNA">
        </div>
    </div>
</Modal>

<div class="d-flex flex-column">
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>