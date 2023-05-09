<script>
    import Icon from "./Icon.svelte";

    export let course = {};
    let classes = '';
    export {classes as class};
    export let style = '';
</script>

<div class="rounded {classes}" {style}>
    <div class="confined rounded-top dark course-top" style="background-color: #f0fbf8;">
        <div class="d-flex justify-content-between">
            <div class=d-flex>
                <a class="icon me-2 dark"><i class="bi bi-caret-right-fill"></i></a>
                <h4 style="margin: 0px;">{course.codice} - {course.name}</h4>
            </div>
            <div class="d-flex">
                <a class="icon me-2 dark" href="/corsi/{course.id}/formulario"><i class="bi bi-percent"></i></a>
                <a class="icon me-2 dark" href="/corsi/{course.id}/note"><i class="bi bi-journal-text"></i></a>
                <a class="icon me-2 dark" href="/corsi/{course.id}/test"><i class="bi bi-pencil"></i></a>
            </div>
        </div>
    </div>
    <div class="confined rounded-bottom course-bottom d-flex light" style="background-color: #2d594d; justify-content: space-between">
        <div>
            {#each course.professors as professor, i}
                <a class='light' href='/professors/{professor}'>{professor}</a>{i != course.professors.length-1 ? ' / ' : ''}
            {/each}
        </div>
        <p class="light" style="margin: 0px;">{course.CFU} CFU</p>
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