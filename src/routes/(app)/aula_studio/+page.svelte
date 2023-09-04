<script>
import {
    onMount
} from "svelte";
import Markdown from 'markdown-it';
import '$css/theme.css'
export let data;
</script>

<div>
    {@html data.file}
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
