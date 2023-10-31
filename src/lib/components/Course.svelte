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
            <div slot="name" class="d-flex justify-content-between align-items-center w-100">
                <div class="d-flex">
                    <h2 class="mb-0">{course.name} - {course.code}</h2>
                    <!-- {#each course.tags as tag}
                        <span class="badge bg-{ tag.color } ms-3">{ tag.name }</span>
                    {/each} -->
                </div>
                
                <div class="d-flex">
                    <label for="{course.name} favourite">
                        <input type="checkbox" class="hidden cursor-pointer" id="{course.name} favourite" bind:checked={course.favourite} on:click|stopPropagation>
                        <div class="text-secondary" class:pulse={course.favourite} on:click|stopPropagation>
                            <i class="icon mx-2 bi bi-heart{course.favourite ? '-fill' : ''}"on:click|stopPropagation></i>
                        </div>
                    </label>
                    {#if course.owned}
                        <a class="" href="/corsi/{course.id}/scheda"><i class="icon mx-2 text-secondary bi bi-box-arrow-up-right"></i></a>
                    {:else}
                        <label for="{course.name} in cart">
                            <input type="checkbox" class="hidden cursor-pointer" id="{course.name} in cart" bind:checked={course.in_cart}>
                            <div>
                                <i class="icon mx-2 text-secondary bi bi-cart{course.in_cart ? '-fill' : ''}"></i>
                            </div>
                        </label>
                    {/if}
                </div>
            </div>
            <div>
                <h2>Argomenti del corso</h2>
                <p>
                    Lorem ipsum dolor sit amet. Est tempora perferendis eos quia rerum a rerum laborum eum atque eligendi ut laboriosam optio 33 fugiat quae. At nihil nostrum et Quis magnam ab aliquam temporibus est ipsa reiciendis sed facilis odit aut mollitia consequatur. Aut consectetur veritatis ea adipisci ratione et iste quaerat. Ut beatae obcaecati est harum unde et galisum similique ut officia architecto sed nesciunt delectus.
                </p>
            </div>
            
            <div class="mb-4">
                <h2>Indice</h2>
                <Accordion let:id>
                    {#each course.content as chapter, i}
                    <AccordionItem parent={id} class="border-light">
                        <div slot="name">
                            {chapter.name}
                        </div>
                        {#each (chapter.files || chapter.directories) as paragraph}
                        <li class="fs-3 list-group-item">{paragraph.name?.replace(/\..*(?=[a-z])/, '')}</li>
                        {/each}
                    </AccordionItem>
                    {/each}
                </Accordion>
            </div>
            
            <div>
                <p>Tipo di Laurea: {course.degree}</p>
                <p>Codice CdL: {course.cdl_code} - {course.cdl_name}</p>
                <p>Curriculum: {course.curriculum_code} - {course.curriculum_name}</p>
            </div>
            
            <Accordion let:id>
                <AccordionItem parent={id} class="border-dark">
                    <div slot="name" class="d-flex justify-content-between w-100">
                        <div class="d-flex w-100 justify-content-between align-items-center">
                            <div>
                                <span>{ course.reviews_number || 0 } recensioni</span>    
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="me-2">{course.rating}</span>
                                <Rating {course} class="me-3"/>
                            </div>
                        </div>
                    </div>
                    <div id="{course.name}-reviews-body" class="accordion-collapse collapse" aria-labelledby="{course.name}-reviews-heading">
                        <div class="accordion-body">
                        </div>
                    </div>
                </AccordionItem>
            </Accordion>
        </AccordionItem>
    </Accordion>
    <div class="course-bottom d-flex dark px-3 py-2 justify-content-between">
        <div>
            <!-- {#each course.professors as professor, i}
                <a class="professor" href="/professors/{professor}">{professor}</a>{i != course.professors.length-1 ? " / " : ""}
            {/each} -->
        </div>
        <p class="text-dark" style="margin: 0px;">{course.CFU || 0} CFU</p>
    </div>
</div>

<style lang="scss">
    @import "$css/variables.scss";
    
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
    
    .index-parent {
        border: 0px !important;
    }
    
    .professor {
        transition: .3s;
        color: $dark;
    }
    
    .professor:hover {
        color: $secondary;
    }
</style>