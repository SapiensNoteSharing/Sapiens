<script>
    import Accordion from "./Accordion.svelte";
    import Icon from "./Icon.svelte";

    export let course = {};
    let classes = '';
    export {classes as class};
    export let style = '';
</script>

<div class="rounded {classes}" {style}>
    <Accordion>
        <div slot="name" class="d-flex">
            <h4 class="d-block">{course.code} - {course.name}</h4>
            <div class="d-flex ms-auto">
                <a class="icon me-2 text-secondary" href="/corsi/{course.id}/formulario"><i class="bi bi-percent"></i></a>
                <a class="icon me-2 text-secondary" href="/corsi/{course.id}/note"><i class="bi bi-journal-text"></i></a>
                <a class="icon me-2 text-secondary" href="/corsi/{course.id}/test"><i class="bi bi-pencil"></i></a>
            </div>
        </div>
        <div slot="body">
            
        </div>
    </Accordion>
    <div class="confined rounded-bottom course-bottom d-flex dark" style="justify-content: space-between">
        <div>
            {#each course.professors as professor, i}
                <a class='dark' href='/professors/{professor}'>{professor}</a>{i != course.professors.length-1 ? ' / ' : ''}
            {/each}
        </div>
        <p class="dark" style="margin: 0px;">{course.CFU} CFU</p>
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

    .course-bottom {
        border-top: 0px;
    }

    .light {
        color: #f0fbf8;
    }

    .dark {
        color: #0b1613;
    }

    a {
        text-decoration: none;
        font-size: 16px;
        color: #0b1613;
    }   
</style>