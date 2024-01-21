<script>
    import LeftSidebar from "$lib/components/LeftSidebar.svelte";
    import ActiveButton from '$lib/components/ActiveButton.svelte';
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
        <ActiveButton active class={"me-3"}>
            <div slot="name" class="page-btn outlined display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={update}><i class="me-3 display-5 bi bi-arrow-clockwise"></i>Update</a>
            </div>
        </ActiveButton>
        <input bind:value={href} class="form-control">
        <span class="text">Usage: /{'<path of dir/file>'}</span>
        <br>
        <span class="text">Response:<br>
        </span>
        <textarea class="w-100 h-100">
            {body}
        </textarea>
    </div>
</div>

<style>
    .m-5 {
        height: 100vh;
    }
</style>
