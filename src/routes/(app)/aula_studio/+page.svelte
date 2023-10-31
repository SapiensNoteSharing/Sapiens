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
</script>

<div class="cont">
    {@html renderedFile}
</div>

<style lang="scss">
    @import '$css/variables.scss';
.cont {
    min-height: 50vh;
    margin: 1.5rem;
    padding: .5rem .5rem 2rem .5rem;
    border: 1px solid $gray-700;
    border-radius: $border-rounded-sm;
}
</style>
