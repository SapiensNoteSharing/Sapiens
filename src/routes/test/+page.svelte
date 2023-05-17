<script>
    import { onMount } from "svelte";
import Markdown from 'markdown-it';

let file;

onMount(async () => {
    console.log(Markdown)
    const md = new Markdown()
    await reload()
    console.log(file)
    file = md.render(file.file)
    console.log(file)
})
    async function reload(){
        const resp = await fetch('/test2?s=true');
        file = (resp.ok && await resp.json())
    }

</script>

<div>
    {@html file}
</div>