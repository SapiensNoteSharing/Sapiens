<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    export let data;
    let courses = data.courses || []
    
    let course = courses.find(course => course.name == "Algoritmi e strutture dati") || {};
    console.log(course);
    $: console.log(data.user)
</script>

<div class="d-flex flex-row">
    <!-- main content -->
    <div class="main-content d-flex flex-column me-5">
        <!-- back to study content -->
        <h1 class="display-4 mb-4">Continua da dove hai interrotto</h1>

        <a class="href-box d-flex flex-column justify-content-between mb-4" href="/aula_studio">
            <div class="d-flex flex-row justify-content-between align-items-center">
                <img class="mb-2" style="height: 4rem;" src="/src/style/course_icons/{course.name.toLowerCase()}.png" alt="{course.name} icon">
                <div class="d-flex flex-column justify-content-between">
                    <NormalButton classes={"mt-3 mx-3"}>
                        <div slot="name">
                            <a type="button" class="px-4 btn btn-primary text-center w-100 text-dark fs-2" href="/aula_studio">
                                Sfoglia gli appunti
                            </a>
                        </div>
                    </NormalButton>
                    <NormalButton classes={"mt-3 mx-3"}>
                        <div slot="name">
                            <a type="button" class="px-4 btn btn-secondary text-center w-100 text-dark fs-2" href="/aula_studio">
                                Vai agli esercizi
                            </a>
                        </div>
                    </NormalButton>
                </div>
            </div>
            <h5 class="mt-3 text-dark">{course.code} &bull; {course.cfu} CFU</h5>
            <h1 class="display-4 mb-3 text-dark">{course.name}</h1>
        
            <div class="d-flex flex-row justify-content-between mb-2">
                <div>
                    {#each (course.professors || []) as professor, i}
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
        </a>

        <!-- calendar -->
        <h1 class="display-4 my-4">Organizza il tuo studio</h1>

        <a class="href-box d-flex flex-row" href="/calendario">
            <img style="width: 20rem;" src="/src/style/spaced repetition.png" alt="">
        </a>
    </div>

    <!-- side content -->
    <div class="side-content d-flex flex-column">
        <!-- streak box -->
        <div class="href-box d-flex flex-column mb-4">
            <div class="d-flex align-items-center flex-row mb-3">
                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/streak.png" alt="streak">
                <span class="display-4 ms-3">Streak</span>
            </div>
            <span class="display-6">La tua streak è lunga 8 giorni!</span>
        </div>

        <!-- xp box -->
        <div class="href-box d-flex flex-column mb-4">
            <div class="d-flex align-items-center flex-row mb-3">
                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/xp.png" alt="xp">
                <span class="display-4 ms-3">Punti XP</span>
            </div>
            <span class="display-6">Hai guadagnato un totale di 560 XP!</span>
        </div>

        <!-- league box -->
        <a class="href-box d-flex flex-column mb-4" href="/classifiche">
            <div class="d-flex align-items-center flex-row mb-3">
                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/league.png" alt="league">
                <span class="display-4 ms-3">Lega</span>
            </div>
            <span class="display-6">Fai parte della Lega Oro!</span>
        </a>
        
        <!-- dna box -->
        <a class="href-box d-flex flex-column mb-4" href="negozio">
            <div class="d-flex align-items-center flex-row mb-3">
                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/DNA.svg" alt="DNA">
                <span class="display-4 ms-3">Punti DNA</span>
            </div>
            <span class="display-6">Il tuo bilancio è di 12 punti DNA</span>
        </a>
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

    .href-box {
        text-decoration: none;
        color: $dark;
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }
</style>