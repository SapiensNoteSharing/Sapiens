<script>
import Icon from "./Icon.svelte";

export let data = {};
let classes = '';
export {classes as class};
export let style = ''

</script>

<div class="support rounded {classes}" {style}>
    <div class="rounded">
        <div class="d-flex justify-content-between">
            <h4 class="">{data.codice} - {data.name}</h4>
            <div class="d-flex">
                <a class="me-2" href="/corsi/{data.id}/formulario"><i class="bi bi-percent"></i></a>
                <a class="me-2" href="/corsi/{data.id}/note"><i class="bi bi-percent"></i></a>
                <a href="/corsi/{data.id}/test"><i class="bi bi-percent"></i></a>
            </div>
        </div>
    </div>
    <div class="rounded-bottom">
        {#each data.professors as professor, i}
            <a href='/professors/{professor}'>{professor}</a>{i != data.professors.length-1 ? '/' : ''}
        {/each}    
    </div>

</div>

<style>
.support {
    border: 1px solid black;
    padding: 1rem;
}
a {
    color: black
}
</style>