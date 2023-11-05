<script>
    import { viewing } from '$lib/stores';
    import { onMount } from 'svelte';

    export let data;
    const fetch = data.fetch;

    let renderedFile = '';

    $: $viewing?._id && render();

    async function render(){
        const resp = await fetch(`/api/file/${$viewing._id}/content`);
        renderedFile = ''
        if(resp.ok) renderedFile = await resp.text()
    }
$: console.log($viewing)
</script>

<div class="cont">
    {#if $viewing?._id}<center><h1>{$viewing.name || ''}</h1></center>{/if}
    {@html renderedFile}
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .cont {
        min-height: 50vh;
        padding: 2rem 2rem;
        width: 90%;

        :global(p) {
            font-size: 1rem;
        }

        :global(h2) {
            font-size: 1.5rem;
            background: #f1f1ef;
            padding: 5px 10px 2px 10px;
            border-bottom: 1px solid black;
        }
        
        :global(h3) {
            font-size: 1.25rem;
            text-decoration-line: underline;
        }
    }
</style>
