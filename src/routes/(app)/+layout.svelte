<script>
    import LeftSidebar from "$lib/components/LeftSidebar.svelte";
    import RightSidebar from "$lib/components/RightSidebar.svelte";

    export let data;
    export let subpage;
</script>

<div class="d-flex h-100 align-self-stretch">
    <LeftSidebar user={data.user}/>

    <div class="flex-grow-1 position-relative content">
        <slot></slot>
    </div>

    <RightSidebar courses={data.courses} subpage={subpage}/>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .content {
        overflow-y: auto;
        height: 89vh;
        background: $light-primary;
        padding: 3rem;
    }
</style>