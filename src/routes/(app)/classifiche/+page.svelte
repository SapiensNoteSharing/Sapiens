<script>
    export let data;
    let user = data.user || {};

    let league_names = ["Legno", "Bronzo", "Argento", "Oro", "Diamante"];
</script>


<div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center align-items-center">
        {#each Array(5) as _, i}
            <img class="league-icon {user.league_level == i ? "my-league" : ""}" src="src/style/league_level_{i}.png" alt="">
        {/each}        
    </div>
    <h2 class="league-title display-4 mx-auto">Lega {league_names[user.league_level]}</h2>
</div>


<style lang="scss">
    @import '$css/variables.scss';
    
    .league-icon {
        display: inline-block;
        position: relative;
        height: 4rem;
        margin: 0rem 2rem;
    }

    .my-league {
        height: 6rem;
    }

    .league-title {
    }

    .custom-scrollbar {
        scroll-behavior: smooth;
    }
</style>