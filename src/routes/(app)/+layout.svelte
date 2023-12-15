<script>
    import Sidebar from "$lib/components/Sidebar.svelte";

    export let data;
</script>

<div class="d-flex h-100 align-self-stretch">
    <Sidebar courses={data.courses} user={data.user}/>

    <div class="flex-grow-1 position-relative content">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .content {
        background: $light-primary; 
        padding: 3rem;
    }
</style>