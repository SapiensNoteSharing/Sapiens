<script>
    import { onMount } from "svelte";


let file, text;

onMount(async () => {
    reload()
})
    async function reload(){
        const resp = await fetch('/admin/api/file');
        console.log(resp)
        file = (resp.ok && await resp.json())
    }

</script>

<div>
    {file}
</div>