<script>
    import { onMount } from "svelte";
    import '$css/global.scss';

    let bootstrap;
    onMount(async () => {
        bootstrap = await import('bootstrap');
    })
</script>

<slot></slot>

<style lang="scss">
</style>
    