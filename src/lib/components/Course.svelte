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
    <Accordion let:id>
        <AccordionItem>
            <div slot="name" class="d-flex align-items-center w-100">
                <h2 class="mb-0">{course.code} - {course.name}</h2>
                {#each course.tags as tag}
                    <span class="badge bg-{ tag.color } ms-3">{ tag.name }</span>
                {/each}
                <div class="d-flex ms-auto me-3">
                    <!-- <a class="" href="/corsi/{course.id}/formulario"><i class="icon mx-2 text-secondary bi bi-percent"></i></a>
                    <a class="" href="/corsi/{course.id}/note"><i class="icon mx-2 text-secondary bi bi-journal-text"></i></a>
                    <a class="" href="/corsi/{course.id}/test"><i class="icon mx-2 text-secondary bi bi-pencil"></i></a> -->
                    <label for="{course.name} favourite">
                        <input type="checkbox" class="hidden cursor-pointer" id="{course.name} favourite" bind:checked={course.favourite}>
                        {#if course.favourite}
                            <div class="text-secondary pulse">
                                <i class="icon mx-2 bi bi-heart-fill"></i>
                            </div>
                        {:else}
                            <div class="text-secondary">
                                <i class="icon mx-2 bi bi-heart"></i>
                            </div>
                        {/if}
                    </label>
                    <label for="{course.name} in cart">
                        <input type="checkbox" class="hidden cursor-pointer" id="{course.name} in cart" bind:checked={course.in_cart}>
                        {#if course.owned}
                            <a class="" href="/corsi/{course.id}/scheda"><i class="icon mx-2 text-secondary bi bi-box-arrow-up-right"></i></a>
                        {:else if course.in_cart}
                            <div class="text-secondary">
                                <i class="icon mx-2 text-secondary bi bi-cart-fill"></i>
                            </div>
                        {:else}
                            <div class="text-secondary">
                                <i class="icon mx-2 text-secondary bi bi-cart"></i>
                            </div>
                        {/if}
                    </label>
                </div>
            </div>
            <div slot="body">
                <!-- Course content -->
                <div>
                    <h2>Argomenti del corso</h2>
                    <p>
                        Lorem ipsum dolor sit amet. Est tempora perferendis eos quia rerum a rerum laborum eum atque eligendi ut laboriosam optio 33 fugiat quae. At nihil nostrum et Quis magnam ab aliquam temporibus est ipsa reiciendis sed facilis odit aut mollitia consequatur. Aut consectetur veritatis ea adipisci ratione et iste quaerat. Ut beatae obcaecati est harum unde et galisum similique ut officia architecto sed nesciunt delectus.
                    </p>
                </div>

                <!-- Chapters and paragraphs -->
                <div>
                    <h2>Indice</h2>
                    <ul class="list-group">
                        {#each course.chapters as chapter}
                            <li class="list-group-item">{chapter.title}
                                <ul class="list-group">
                                    {#each chapter.paragraphs as paragraph}
                                        <li class="list-group-item">{paragraph}</li>
                                    {/each}
                                </ul>
                            </li>
                        {/each}
                    </ul>
                </div>

                <!-- Further courses info -->
                <div>
                    <p>Tipo di Laurea: {course.degree}</p>
                    <p>Codice CdL: {course.cdl_code} - {course.cdl_name}</p>
                    <p>Curriculum: {course.curriculum_code} - {course.curriculum_name}</p>
                </div>

                <AccordionItem>
                    <div slot="name" class="d-flex w-100 justify-content-between align-items-center">
                        <div>
                            <span>{ course.reviews_number} recensioni</span>    
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="me-2">{ course.rating }</span>
                            <Rating {course} class="me-3"/>
                        </div>
                    </div>

                    <div slot="body">

                    </div>
                </AccordionItem>
            </div>
        </AccordionItem>
    </Accordion>
    <div class="course-bottom d-flex dark px-3 py-2 justify-content-between">
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

    @keyframes pulse-animation {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }

    .pulse {
        animation-name: pulse-animation;
        animation-duration: .5s;
        animation-iteration-count: 1;
    }      
</style>