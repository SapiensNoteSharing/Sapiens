<script>
    export let data;
    const fetch = data.fetch
    
    let href = ''
    let body = {}, timer;
    
    function debounce(){
        clearTimeout(timer)
        timer = setTimeout(async () => {
            const resp = await fetch(`/test3?href=${href}`)
            body = (resp.ok && await resp.json()) || []
            body = JSON.stringify(body, null, 2);
            const r1 = await fetch(`admin/api/octokit`);
            const b = (r1.ok && await r1.json())
            console.log(b)
        }, 200)
    }
    
    $: href != undefined && debounce()
</script>

<div class="m-5">
    <div class="row h-100">
        <div class="col">
            <input bind:value={href} class="form-control">
            <span class="text">Usage: /{'<path of dir/file from Università>'}</span>
            <br>
            <span class="text">Response:<br>
            </span>
            <textarea class="w-100 h-100">
                {body}
            </textarea>
        </div>
    </div>
</div>

<style>
    .m-5{
        height: 100vh;
    }
</style>
