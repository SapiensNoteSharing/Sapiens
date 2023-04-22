<script>
import Icon from "./Icon.svelte";

export let data = {};
let classes = '';
export {classes as class};
export let style = ''

</script>

<div class="rounded {classes}" {style}>
    <div class="confined rounded-top light course-top" style="background-color: #2d594d;">
        <div class="d-flex justify-content-between">
            <h4 class="">{data.codice} - {data.name}</h4>
            <div class="d-flex">
                <a class="icon me-2 light" href="/corsi/{data.id}/formulario"><i class="bi bi-percent"></i></a>
                <a class="icon me-2 light" href="/corsi/{data.id}/note"><i class="bi bi-journal-text"></i></a>
                <a class="icon me-2 light" href="/corsi/{data.id}/test"><i class="bi bi-pencil"></i></a>
            </div>
        </div>
    </div>
    <div class="confined rounded-bottom course-bottom" style="background-color: #f0fbf8;">
        {#each data.professors as professor, i}
            <a href='/professors/{professor}'>{professor}</a>{i != data.professors.length-1 ? ' / ' : ''}
        {/each}    
    </div>
</div>

<style>
.icon {
    font-size: 20px;
    margin: 0rem 1rem;
}

.confined {
    border: 1px solid #0b1613;
}

.course-top, .course-bottom {
    padding: 1rem;
}

.light {
    color: #f0fbf8;
}

a {
    text-decoration: none;
    font-size: 16px;
    color: #0b1613;
}
</style>