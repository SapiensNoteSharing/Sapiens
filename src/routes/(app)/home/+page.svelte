<script>
    import Icon from '$lib/components/Icon.svelte';
    import Course from '$lib/components/Course.svelte';
    import CourseCard from '$lib/components/CourseCard.svelte';
    import FloatingButton from '$lib/components/FloatingButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { view, value, filter_tags, dna } from '$lib/stores';
    import { space } from 'svelte/internal';

    export let data;
    let courses = data.courses || []
    
    let course = courses.find(course => course.name == "Algoritmi e strutture dati");
    console.log(course);
</script>

<div class="d-flex flex-row">
    <!-- main content -->
    <div class="main-content d-flex flex-column me-5">
        <!-- back to study content -->
        <h1 class="display-4 mb-4">Continua da dove hai interrotto</h1>

        <div class="box d-flex flex-column justify-content-between mb-4">
            <div class="d-flex flex-row justify-content-between align-items-top">
                <img class="mb-2" style="height: 4rem;" src="/src/style/course_icons/{course.name}.png" alt="{course.name} icon">
            </div>
            <h5 class="mt-3 text-dark">{course.code} &bull; {course.cfu} CFU</h5>
            <h1 class="display-4 mb-3 text-dark">{course.name}</h1>
        
            <div class="d-flex flex-row justify-content-between mb-2">
                <div>
                    {#each course.professors as professor, i}
                        <span class="text-decoration-none professor text-dark">{professor}</span>{i != course.professors.length-1 ? " / " : ""}
                    {/each}
                </div>
            </div>
        
            <div>
                <p>{course.description}</p>
            </div>
        
            <div class="d-flex justify-content-left">
                <p class="dark" style="margin: 0px;">{course.year} anno &bull; {course.semester} semestre</p>
            </div>
        </div>

        <!-- calendar -->
        <h1 class="display-4 my-4">Organizza il tuo studio</h1>

        <div class="box d-flex flex-row">
            <img style="width: 20rem;" src="/src/style/spaced repetition.png" alt="">
        </div>
    </div>

    <!-- side content -->
    <div class="side-content d-flex flex-column">
        <!-- streak box -->
        <div class="box d-flex flex-row mb-4">
            <img class="dna-icon" style="height: 2.5rem;" src="/src/style/streak.png" alt="streak">
        </div>

        <!-- league box -->
        <div class="box d-flex flex-row mb-4">
            <img class="dna-icon" style="height: 2.5rem;" src="/src/style/league.svg" alt="league">
        </div>

        <!-- xp box -->
        <div class="box d-flex flex-row mb-4">
            <img class="dna-icon" style="height: 2.5rem;" src="/src/style/DNA.svg" alt="xp">
        </div>
        
        <!-- dna box -->
        <div class="box d-flex flex-row mb-4">
            <img class="dna-icon" style="height: 2.5rem;" src="/src/style/DNA.svg" alt="DNA">
        </div>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .main-content {
        width: 70%;
        height: 100%;
        box-sizing: border-box;
    }

    .side-content {
        width: 30%;
        height: 100%;
        box-sizing: border-box;
    }

    .box {
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }
    
    :root {
        --scroll-size: 10px;
        --scroll-track: $light;
        --scroll-thumb: $primary;
        --scroll-thumb-radius: 5px;
    }
</style>