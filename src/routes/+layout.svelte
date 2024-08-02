<script>
    import { onMount } from "svelte";
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import '$css/global.scss';

    let bootstrap;
    onMount(async () => {
        bootstrap = await import('bootstrap');
    })
</script>

<SvelteToast/>

<slot></slot>

<style lang="scss">
</style>
    