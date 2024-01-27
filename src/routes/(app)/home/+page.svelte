<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    export let data;
    let courses = data.courses || []
    let my_courses = data.my_courses || []
    let user = data.user || {}
    let league_names = ["Vetro", "Bronzo", "Argento", "Oro", "Diamante"];

    let suggestions_category = "best_sellers";
    let best_sellers = ["Algoritmi e strutture dati", "Analisi Matematica I", "Fisica I"];
    let new_courses = ["Fisica II", "Geometria e algebra lineare", "Algoritmi e strutture dati"];
    let best_courses = ["Fondamenti di ricerca operativa", "Fondamenti di informatica", "Fondamenti di segnali e trasmissione"];

    let showed = []
    function load_showed_courses(suggestions_category) {
        showed = []
        switch (suggestions_category) {
            case "best_sellers":
                for (let i = 0; i < best_sellers.length; i++)
                    showed.push(courses.find(course => course.name == best_sellers[i]));
                break;
            case "new_courses":
                for (let i = 0; i < best_sellers.length; i++)
                    showed.push(courses.find(course => course.name == new_courses[i]));
                break;
            case "best_reviewed":
                for (let i = 0; i < best_sellers.length; i++)
                    showed.push(courses.find(course => course.name == best_courses[i]));
                break;
        }
    }

    $: load_showed_courses(suggestions_category);
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
            
            <div class="href-box d-flex flex-column justify-content-between mb-4 w-100">
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
                    {#each showed as course}
                        <div class="d-flex flex-row text-decoration-none justify-content-between align-items-end">
                            <div class="d-flex flex-row align-items-center">
                                <img class="me-4" style="height: 5rem;" src="/src/style/course_icons/{course?.name.toLowerCase().replace(/\s/g, '_')}.png" alt="{course?.name} icon">
                                <div class="d-flex flex-column text-dark align-items-start">
                                    <h2 class="display-4">{course.name}</h2>
                                    <h4 class="">{course.code} &bull; {course.cfu} CFU</h4>
                                    <div class="d-flex text-dark flex-row justify-content-between mb-2">
                                        <div>
                                            {#each course.professors as professor, i}
                                            <span class="text-decoration-none professor">{professor}</span>{i != course.professors.length - 1 ? " / " : ""}
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <NormalButton class={"ms-3"}>
                                <div slot="name">
                                    <a type="button" class="btn btn-primary border-0 px-4 text-center w-100 text-dark fs-2" href="/negozio/corsi_singoli/{course?.name.toLowerCase().replace(/\s/g, '_')}">
                                        Dettagli
                                    </a>
                                </div>
                            </NormalButton>
                        </div>
                        <hr class="my-4">
                    {/each}
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