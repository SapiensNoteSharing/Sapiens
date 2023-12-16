<script>
    import LeftSidebar from '$lib/components/LeftSidebar.svelte';
    import 'highlight.js/styles/github.css';

    export let data;
</script>

<div class="d-flex h-100 align-self-stretch">
    <LeftSidebar user={data.user}/>

    <div class="flex-grow-1 position-relative m-5">
        <slot></slot>
    </div>
</div>

<style lang="scss">

</style>