<script>
    export let data;
    $: user = data.user || {};

    let league_names = ["Vetro", "Bronzo", "Argento", "Oro", "Diamante"];

    let before = user.league_level <= 2 ? (4 - 2 * user.league_level) : 0;
    let after = user.league_level >= 2 ? (-4 + 2 * user.league_level) : 0;
</script>


<div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center align-items-center">
        {#each Array(before) as _}
            <img class="league-icon" src="src/style/leagues/blank.png" alt="">
        {/each}      
        {#each Array(5) as _, i}
            <img class="league-icon {user.league_level == i ? "my-league" : ""}" src="src/style/leagues/level_{i}.png" alt="">
        {/each}  
        {#each Array(after) as _}
            <img class="league-icon" src="src/style/leagues/blank.png" alt="">
        {/each}       
    </div>
    <h2 class="text-dark display-3 mx-auto my-2">Lega {league_names[user.league_level]}</h2>
</div>


<style lang="scss">
    @import '$css/variables.scss';
    
    .league-icon {
        display: inline-block;
        position: relative;
        height: 4rem; 
        width: 4rem;
        margin: 0rem 2rem;
    }

    .my-league {
        height: 7rem;
        width: 7rem;
    }
</style>