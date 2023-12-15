<script>
    import Icon from '$lib/components/Icon.svelte';
    import Course from '$lib/components/Course.svelte';
    import CourseCard from '$lib/components/CourseCard.svelte';
    import FloatingButton from '$lib/components/FloatingButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { view, value, filter_tags, dna } from '$lib/stores';
    import { space } from 'svelte/internal';
</script>


<div class="d-flex flex-column">
    <div class="d-flex flex-row justify-content-center align-items-center">
        <img class="league-icon" src="src/style/target.png" alt="">
        <img class="league-icon" src="src/style/target.png" alt="">
        <img class="league-icon my-league" src="src/style/target.png" alt="">
        <img class="league-icon" src="src/style/target.png" alt="">
        <img class="league-icon" src="src/style/target.png" alt="">
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

    :root {
        --scroll-size: 10px;
        --scroll-track: $light;
        --scroll-thumb: $primary;
        --scroll-thumb-radius: 5px;
    }

    .custom-scrollbar {
        scroll-behavior: smooth;
    }
</style>