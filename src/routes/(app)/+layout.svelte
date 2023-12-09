<script>
    import Sidebar from "$lib/components/Sidebar.svelte";

    export let data;
</script>

<div class="d-flex h-100 align-self-stretch">
    <Sidebar courses={data.courses}/>

    <div class="flex-grow-1 position-relative">
        <slot></slot>
    </div>
</div>