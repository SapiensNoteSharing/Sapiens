<script>
    import Sidebar from '$lib/components/Sidebar.svelte';
    import { page } from '$app/stores';
    import 'highlight.js/styles/github.css';

    export let data;
</script>

<div class="d-flex h-100 align-items-stretch">
    <div class="flex-grow-1 position-relative m-5">
        <slot></slot>
    </div>
</div>

<style lang="scss">

</style>