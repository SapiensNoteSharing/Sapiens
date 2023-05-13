<script>
    import Accordion from "./Accordion.svelte";
    import AccordionItem from "./AccordionItem.svelte";
    import Rating from "./Rating.svelte";
    import Icon from "./Icon.svelte";
    import { filter_tags } from '$lib/stores';

    export let course = {};
    let classes = '';
    export {classes as class};
    export let style = '';
</script>

<div class="rounded {classes} confined" {style}>
    <Accordion keepOpen>
        <AccordionItem>
            <div slot="name" class="d-flex align-items-center w-100">
                <h4 class="mb-0">{course.code} - {course.name}</h4>
                {#each course.tags as tag}
                    <span class="badge bg-{ tag.color } ms-3">{ tag.name }</span>
                {/each}
                <div class="d-flex ms-auto me-3">
                    <a class="" href="/corsi/{course.id}/formulario"><i class="icon me-2 text-secondary bi bi-percent"></i></a>
                    <a class="" href="/corsi/{course.id}/note"><i class="icon me-2 text-secondary bi bi-journal-text"></i></a>
                    <a class="" href="/corsi/{course.id}/test"><i class="icon me-2 text-secondary bi bi-pencil"></i></a>
                    <label for="{course.name} favourite">
                        <input type="checkbox" class="hidden cursor-pointer" id="{course.name} favourite" bind:checked={course.favourite}>
                        {#if course.favourite}
                            <i class="icon me-2 text-secondary bi bi-heart-fill"></i>
                        {:else}
                            <i class="icon me-2 text-secondary bi bi-heart"></i>
                        {/if}
                    </label>
                    <label for="{course.name} in cart">
                        <input type="checkbox" class="hidden cursor-pointer" id="{course.name} in cart" bind:checked={course.in_cart}>
                        {#if course.in_cart}
                            <i class="icon me-2 text-secondary bi bi-cart-fill"></i>
                        {:else}
                            <i class="icon me-2 text-secondary bi bi-cart"></i>
                        {/if}
                    </label>
                </div>
            </div>
            <div slot="body">
                <Rating {course} class=""/>
            </div>
        </AccordionItem>
    </Accordion>
    <div class="course-bottom d-flex dark px-3 py-2" style="justify-content: space-between">
        <div>
            {#each course.professors as professor, i}
                <a class="text-dark" href="/professors/{professor}">{professor}</a>{i != course.professors.length-1 ? " / " : ""}
            {/each}
        </div>
        <p class="text-dark" style="margin: 0px;">{course.CFU} CFU</p>
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

    a {
        text-decoration: none;
        font-size: 16px;
        color: #0b1613;
    }   
</style>