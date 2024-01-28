<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import TopChoices from '$lib/components/TopChoices.svelte';

    export let data;
    let user = data.user || {}
    let courses = data.courses || []
    let my_courses = data.my_courses || []
    
    let league_names = ["Vetro", "Bronzo", "Argento", "Oro", "Diamante"];
</script>

<div class="d-flex flex-row">
    <div class="main-content d-flex flex-column me-5">
        {#if my_courses.length > 0}
            <h1 class="display-4 mb-4">Continua da dove hai interrotto</h1>

            <a class="href-box d-flex flex-column justify-content-between mb-4" href="/aula_studio">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <img class="mb-2" style="height: 4rem;" src="/src/style/course_icons/{my_courses[0]?.name.toLowerCase().replace(/\s/g, '_')}.png" alt="{my_courses[0]?.name} icon">
                    <div class="d-flex flex-column justify-content-between">
                        <NormalButton class={"mt-3 mx-3"}>
                            <div slot="name">
                                <a type="button" class="btn btn-primary border-0 px-4 text-center w-100 text-dark fs-2" href="/aula_studio">
                                    Sfoglia gli appunti
                                </a>
                            </div>
                        </NormalButton>
                        <NormalButton class={"mt-3 mx-3"}>
                            <div slot="name">
                                <a type="button" class="btn btn-secondary border-0 px-4 text-center w-100 text-dark fs-2" href="/aula_studio">
                                    Vai agli esercizi
                                </a>
                            </div>
                        </NormalButton>
                    </div>
                </div>
                <h5 class="mt-3 text-dark">{my_courses[0]?.code} &bull; {my_courses[0]?.cfu} CFU</h5>
                <h1 class="display-4 mb-3 text-dark">{my_courses[0]?.name}</h1>
            
                <div class="d-flex flex-row justify-content-between mb-2">
                    <div>
                        {#each (my_courses[0]?.professors || []) as professor, i}
                            <span class="text-decoration-none professor text-dark">{professor}</span>{i != my_courses[0]?.professors.length-1 ? " / " : ""}
                        {/each}
                    </div>
                </div>
            
                <div>
                    <p>{my_courses[0]?.description}</p>
                </div>
            
                <div class="d-flex justify-content-left">
                    <p class="dark" style="margin: 0px;">{my_courses[0]?.year} anno &bull; {my_courses[0]?.semester} semestre</p>
                </div>
            </a>
        {:else}
            <h1 class="display-4 mb-4">Acquista il tuo primo corso</h1>
            
            <TopChoices
            courses={courses}
            class={"w-100"}
            style={""}
            best_sellers={["Algoritmi e strutture dati", "Analisi Matematica I", "Fisica I"]}
            new_courses={["Fisica II", "Geometria e algebra lineare", "Algoritmi e strutture dati"]}
            best_courses={["Fondamenti di ricerca operativa", "Fondamenti di informatica", "Fondamenti di segnali e trasmissione"]}
            />
        {/if}

        <h1 class="display-4 my-4">Organizza lo studio</h1>

        <a class="href-box d-flex flex-row" href="/calendario">
            <img style="width: 20rem;" src="/src/style/spaced repetition.png" alt="">
        </a>
    </div>

    <div class="side-content d-flex flex-column">
        <h1 class="display-4 mb-4">Le tue statistiche</h1>

        <div class="href-box d-flex flex-column mb-4">
            <div class="d-flex align-items-center flex-row mb-3">
                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/streak.png" alt="streak">
                <span class="display-4 ms-3">Streak</span>
            </div>
            <span class="display-6">La tua streak è lunga {user.streak} giorni!</span>
        </div>

        <div class="href-box d-flex flex-column mb-4">
            <div class="d-flex align-items-center flex-row mb-3">
                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/xp.png" alt="xp">
                <span class="display-4 ms-3">Punti XP</span>
            </div>
            <span class="display-6">Hai guadagnato un totale di {user.xp} XP!</span>
        </div>

        {#if user.streak >= 14}
            <a class="href-box d-flex flex-column mb-4" href="/classifiche">
                <div class="d-flex align-items-center flex-row mb-3">
                    <img class="dna-icon" style="height: 2.5rem;" src="/src/style/league_level_{user.league_level}.png" alt="league">
                    <span class="display-4 ms-3">Lega</span>
                </div>
                <span class="display-6">Fai parte della Lega {league_names[user.league_level]}!</span>
            </a>
        {/if}
        
        <a class="href-box d-flex flex-column mb-4" href="negozio/punti_dna">
            <div class="d-flex align-items-center flex-row mb-3">
                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/dna.svg" alt="dna">
                <span class="display-4 ms-3">Punti DNA e RNA</span>
                <img class="dna-icon ms-3" style="height: 2.5rem;" src="/src/style/rna.png" alt="rna">
            </div>
            <p class="mb-2 display-6">Il tuo bilancio è di:</p>
            <ul class="display-6 mb-0">
                <li class="mb-1">{user.dna} punti DNA</li>
                <li>{user.rna} punti RNA</li>
            </ul>
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
        border-radius: 1rem;
        transition: .25s ease-in-out;
    }
</style>