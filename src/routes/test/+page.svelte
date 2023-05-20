<script>
    import { onMount } from "svelte";
import Markdown from 'markdown-it';
import '$css/theme.css'
let file;

    async function reload(){
        const resp = await fetch('/admin/api/file');
        console.log(resp)
        file = (resp.ok && await resp.json())
        console.log(file)
    }
onMount(() => reload())

</script>

<div>
    {@html file}
</div>

<style lang="scss">
    .img-cont {
        width: 800px;
        height: 800px;
        img {
            width: 800px;
            height: 800px;
        }
    }
</style>