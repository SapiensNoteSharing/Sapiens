<script>
    import LeftSidebar from "$lib/components/LeftSidebar.svelte";
    import RightSidebar from "$lib/components/RightSidebar.svelte";

    export let data;
</script>

<div class="d-flex h-100 align-self-stretch">
    <LeftSidebar user={data.user}/>
    <div class="background">
        <div class="content">
            <slot></slot>
        </div>

        <RightSidebar courses={data.courses}></RightSidebar>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .content {
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        height: 89vh;
        padding: 3rem;
        transition: width .5s;
        flex: 1 0;
    }
    .background {
        background: $light-primary;
        display: flex;
        width: 100%;
    }
</style>