<script>
    import NormalButton from '$lib/components/NormalButton.svelte';

    export let data;
    const fetch = data.fetch
    
    let href = ''
    let body = {};

    async function update() {
        const resp = await fetch(`/api/testupdate`)
        const body = (resp.ok && await resp.json()) || {}
    }
</script>

<div class="d-flex h-100 align-self-stretch">
    <div class="col">
        <NormalButton class={""}>
            <div slot="name">
                <a type="button" class="btn btn-primary px-4 py-2 text-center w-100 text-dark fs-2" on:click={update}><i class="me-3 display-5 bi bi-arrow-clockwise"></i>Aggiorna</a>
            </div>
        </NormalButton>
        <p class="text mb-3">Percorso: /{'<path of dir/file>'}</p>
        <input class="form-control mb-2" bind:value={href}>
        <p class="text mb-3">Risposta:</p>
        <textarea class="response">
            {body}
        </textarea>
    </div>
</div>

<style>
    .response {
        width: 100%;
        height: 80%;
    }
</style>
