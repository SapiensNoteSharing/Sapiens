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
</script>

<style lang="scss">
    @import '$css/variables.scss';
    
    .custom-scrollbar {
        scroll-behavior: smooth;
    }
   

    
    :root {
        --scroll-size: 10px;
        --scroll-track: $light;
        --scroll-thumb: $primary;
        --scroll-thumb-radius: 5px;
    }
</style>