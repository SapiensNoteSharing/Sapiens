<script>
    import LeftSidebar from "$lib/components/LeftSidebar.svelte";
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import { page } from '$app/stores'; 

    export let data;
    const fetch = data.fetch
    
    let href = ''
    let body = {}, timer;

    $: user = $page.data.user

    function debounce() {
        clearTimeout(timer)
        timer = setTimeout(async () => {
            const resp = await fetch(`/test3?href=${href}`)
            body = (resp.ok && await resp.json()) || []
            body = JSON.stringify(body, null, 4);
        }, 200)
    }

    async function update(){
        const resp = await fetch(`/api/testupdate`)
        const body = (resp.ok && await resp.json()) || {}
    }
    
    $: href != undefined && debounce()
</script>

<div class="d-flex h-100 align-self-stretch">
    <LeftSidebar user={user}/>

    <div class="col m-5">
        <NormalButton class={"me-3"}>
            <div slot="name" class="page-btn rounded-4 mb-3">
                <a class="btn btn-primary text-center px-4 py-2 rounded-4 w-100 text-dark fs-2" on:click={update}><i class="me-3 display-5 bi bi-arrow-clockwise"></i>Update</a>
            </div>
        </NormalButton>
        <p class="text mb-3">Usage: /{'<path of dir/file>'}</p>
        <input class="form-control mb-2" bind:value={href}>
        <p class="text mb-3">Response:</p>
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
