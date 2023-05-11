<script>
    import Accordion from "./Accordion.svelte";
    import Rating from "./Rating.svelte";
    import Icon from "./Icon.svelte";

    export let course = {};
    let classes = '';
    export {classes as class};
    export let style = '';
</script>

<div class="rounded {classes} confined border-dark" {style}>
    <Accordion class="confined rounded-top dark" style="border-bottom: 1px solid #0b1613;">
        <div slot="name" class="d-flex">
            <h4 class="d-block m-0">{course.code} - {course.name}</h4>
            <div class="d-flex">
                <a class="icon me-2 text-secondary" href="/corsi/{course.id}/formulario"><i class="bi bi-percent"></i></a>
                <a class="icon me-2 text-secondary" href="/corsi/{course.id}/note"><i class="bi bi-journal-text"></i></a>
                <a class="icon me-2 text-secondary" href="/corsi/{course.id}/test"><i class="bi bi-pencil"></i></a>
            </div>
            <!-- <Rating {course} class=""/> -->
        </div>
        <div slot="body">
            
        </div>
    </Accordion>
    <div class="course-bottom d-flex dark px-3 py-2" style="justify-content: space-between">
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
        border: 1px solid;
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