
<svelte:window bind:innerWidth={width}/>
<script>
    import { onMount } from "svelte";
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import { mobile } from '$lib/stores';
    import '$css/global.scss';

    let width;

    let bootstrap;
    onMount(async () => {
        bootstrap = await import('bootstrap');
    })

    $: $mobile = width < 768 ? true : false
</script>

<SvelteToast/>

<slot></slot>

<style lang="scss">
</style>
    