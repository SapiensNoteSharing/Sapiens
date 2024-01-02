<script>
</script>


<div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center align-items-center">
        <img class="league-icon" src="src/style/league.png" alt="">
        <img class="league-icon" src="src/style/league.png" alt="">
        <img class="league-icon my-league" src="src/style/league.png" alt="">
        <img class="league-icon" src="src/style/league.png" alt="">
        <img class="league-icon" src="src/style/league.png" alt="">
    </div>
    <h2 class="league-title display-4 mx-auto">My League</h2>
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