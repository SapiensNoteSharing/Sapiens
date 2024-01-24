<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { page } from '$app/stores';

    export let data;
    let courses = data.courses || [];
    let user = data.user || {};

    let owned = [
        courses.find(course => course.name == "Analisi Matematica I"),
        courses.find(course => course.name == "Fisica I"),
        courses.find(course => course.name == "Algoritmi e strutture dati"),
    ].filter(Boolean);

    function get_semester_bundle_courses() {
        let semester_bundle_courses = [];
        for (let course of courses) {
            if (
                course.university_name == data.user.university_name &&
                course.faculty_code == data.user.faculty_code &&
                course.year == data.user.year &&
                course.semester == data.user.semester
            ) {
                semester_bundle_courses.push(JSON.parse(JSON.stringify({ ...course, owned: owned.includes(course) })));
            }
        }
        return semester_bundle_courses
    }

    function get_year_bundle_courses() {
        let year_bundle_courses = [];
        for (let course of courses) {
            if (
                course.university_name == data.user.university_name &&
                course.faculty_code == data.user.faculty_code &&
                course.year == data.user.year
            ) {
                year_bundle_courses.push(JSON.parse(JSON.stringify({ ...course, owned: owned.includes(course) })));
            }
        }
        return year_bundle_courses
    }

    function get_degree_bundle_courses() {
        let degree_bundle_courses = [];
        for (let course of courses) {
            if (
                course.university_name == data.user.university_name &&
                course.faculty_code == data.user.faculty_code
            ) {
                degree_bundle_courses.push(JSON.parse(JSON.stringify({ ...course, owned: owned.includes(course) })));
            }
        }

        return degree_bundle_courses
    }

    function sort_course_list(course_list, sort_method = sorting_method) {
        switch(sort_method) {
            case "no_order":
                course_list.sort((a, b) => {
                    if (Math.random() < 0.5)
                        return -1;
                    else
                        return 1;
                });
                break;
            case "name_ascending":
                course_list.sort((a, b) => {
                    if (a.name < b.name)
                        return -1;
                    else if (a.name == b.name) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "name_descending":
                course_list.sort((a, b) => {
                    if (a.name > b.name)
                        return -1;
                    else if (a.name == b.name) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "code_ascending":
                course_list.sort((a, b) => {
                    if (a.code < b.code)
                        return -1;
                    else if (a.code == b.code) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "code_descending":
                course_list.sort((a, b) => {
                    if (a.code > b.code)
                        return -1;
                    else if (a.code == b.code) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "chronological_order":
                course_list.sort((a, b) => {
                    const yearOrder = { "Primo": 1, "Secondo": 2, "Terzo": 3 };
                    const semesterOrder = { "Primo e secondo": 0, "Primo": 1, "Secondo": 2 };

                    if (yearOrder[a.year] < yearOrder[b.year])
                        return -1;
                    else if (yearOrder[a.year] == yearOrder[b.year]) {
                        if (semesterOrder[a.semester] < semesterOrder[b.semester])
                            return -1;
                        else if (semesterOrder[a.semester] == semesterOrder[b.semester])
                            return 0;
                        else
                            return 1;
                    } else
                        return 1;
                });
                break;
            case "chronological_reverse":
                course_list.sort((a, b) => {
                    const yearOrder = { "Primo": 1, "Secondo": 2, "Terzo": 3 };
                    const semesterOrder = { "Primo e secondo": 0, "Primo": 1, "Secondo": 2 };

                    if (yearOrder[a.year] < yearOrder[b.year])
                        return 1;
                    else if (yearOrder[a.year] == yearOrder[b.year]) {
                        if (semesterOrder[a.semester] < semesterOrder[b.semester])
                            return 1;
                        else if (semesterOrder[a.semester] == semesterOrder[b.semester])
                            return 0;
                        else
                            return -1;
                    } else
                        return -1;
                });
                break;
        }
    }

    let semester_bundle_courses = get_semester_bundle_courses()
    sort_course_list(semester_bundle_courses, "chronological_order");
    let year_bundle_courses = get_year_bundle_courses()
    sort_course_list(year_bundle_courses, "chronological_order");
    let degree_bundle_courses = get_degree_bundle_courses()
    sort_course_list(degree_bundle_courses, "chronological_order");

    let cartModal;
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }

    let selected_option = "base";
    let course = courses[0];
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
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id.startsWith("/(app)/negozio/pacchetti") ? 'active' : 'not-active'}
        fill={$page.route.id.startsWith("/(app)/negozio/pacchetti") ? '-fill' : ''}
        class={"me-3"}
        text={"Pacchetti"}
        icon={"bi-box-seam"}
        href={"/negozio/pacchetti"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id.startsWith("/(app)/negozio/corsi_singoli") ? 'active' : 'not-active'}
        fill={$page.route.id.startsWith("/(app)/negozio/corsi_singoli") ? '-fill' : ''}
        class={"me-3"}
        text={"Corsi singoli"}
        icon={"bi-1-circle"}
        href={"/negozio/corsi_singoli"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/negozio/punti_dna" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/negozio/punti_dna" ? '-fill' : ''}
        class={"me-3"}
        text={"Punti DNA"}
        icon={"bi-cart"}
        href={"/negozio/punti_dna"}
        />
    </div>

    <div class="row g-3 mb-4 align-items-center">
        <div class="col-md-4" style="--bs-gutter-x: 1.5rem">
            <div class="bundle">
                <h2 class="display-3">Pacchetto <span class="text-dark">{data.user.semester} semestre</span></h2>
                <h2 class="display-6">{semester_bundle_courses.length} corsi</h2>

                <div class="d-flex flex-row justify-content-between flex-wrap align-items-end">
                    {#each semester_bundle_courses as course}
                        {#if course.owned}
                            <!-- <img class="bundle-course-icon" style="filter: grayscale(100%);" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt=""> -->
                        {:else}
                            <!-- <img class="bundle-course-icon" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt=""> -->
                        {/if}
                    {/each}
                </div>

                <div class="d-flex flex-row justify-content-center" style={"margin-top: 3rem;"}>
                    <NormalButton class={"mx-2"}>
                        <div slot="name">
                            <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" href="/negozio/pacchetti/dettagli_pacchetto">Dettagli</a>
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
        <div class="col-md-4" style="--bs-gutter-x: 1.5rem">
            <div class="bundle">
                <h2 class="display-3">Pacchetto <span class="text-dark">{data.user.year} anno</span></h2>
                <h2 class="display-6">{year_bundle_courses.length} corsi</h2>

                <div class="d-flex flex-row justify-content-between flex-wrap align-items-end">
                    {#each year_bundle_courses as course}
                        {#if course.owned}
                            <!-- <img class="bundle-course-icon" style="filter: grayscale(100%);" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt=""> -->
                        {:else}
                            <!-- <img class="bundle-course-icon" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt=""> -->
                        {/if}
                    {/each}
                </div>
                <div class="d-flex flex-row justify-content-center" style={"margin-top: 3rem;"}>
                    <NormalButton class={"mx-2"}>
                        <div slot="name">
                            <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" href="/negozio/pacchetti/dettagli_pacchetto">Dettagli</a>
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
        <div class="col-md-4" style="--bs-gutter-x: 1.5rem">
            <div class="bundle">
                <h2 class="display-3">Pacchetto <span class="text-dark">{data.user.faculty_name}</span></h2>
                <h2 class="display-6">{degree_bundle_courses.length} corsi</h2>
                
                <div class="d-flex flex-row justify-content-between flex-wrap align-items-end">
                    {#each degree_bundle_courses as course}
                    {#if course.owned}
                    <!-- <img class="bundle-course-icon" style="filter: grayscale(100%);" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt=""> -->
                    {:else}
                    <!-- <img class="bundle-course-icon" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt=""> -->
                    {/if}
                    {/each}
                </div>
                
                <div class="d-flex flex-row justify-content-center" style={"margin-top: 3rem;"}>
                    <NormalButton class={"mx-2"}>
                        <div slot="name">
                            <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" href="/negozio/pacchetti/dettagli_pacchetto">Dettagli</a>
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