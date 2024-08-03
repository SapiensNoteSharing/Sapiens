<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Cart from '$lib/components/Cart.svelte';
    import Item from '$lib/components/Item.svelte';
    import { viewing } from '$lib/stores';

    export let data;
    let course = data.course || [];

    let cartModal;

    // let selected_content = "chapters"
</script>

<Cart {course} bind:this={cartModal}/>

<div class="course-details-container d-flex flex-column bg-light p-5">
    <div class="d-flex flex-row justify-content-between">
        <div class="d-flex flex-row justify-content-between">
            <img class="me-5 course-icon" src="/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt="{course.name}">
            
            <div class="d-flex flex-column">
                <h2 class="display-3">{course.name}</h2>
                <h4 class="">{course.code} &bull; {course.cfu} CFU</h4>
                <div class="d-flex text-dark flex-row justify-content-between mb-2">
                    <div>
                        {#each course.professors as professor, i}
                            <span class="text-decoration-none professor">{professor}</span>{i != course.professors.length - 1 ? " / " : ""}
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column align-items-end">
            <h4 class="display-4">{course?.university?.name}</h4>
            <h4 class="">{course?.degree?.name} &bull; {course?.degree?.type}</h4>
            <h4 class="">{course?.year}° anno &bull; {course?.semester == 0 ? 'Annuale' : `${course.semester}° semestre`}</h4>
        </div>
    </div>

    <div class="my-4">
        <h2 class="display-4">Argomenti del corso</h2>
        {course.description || ''}
    </div>

    <div class="navigation d-flex flex-row justify-content-between">
        <div class="d-flex flex-column">
            <h2 class="display-4">Indice</h2>
            {#each (course.chapters || []) as chapter}
                <Item collapsible obj={chapter} icon="chevron" class="chapter">
                    <div slot="menu">
                        {#each chapter.files || [] as file}
                        <Item obj={file} class="file" on:click={(ev) => $viewing = ev.detail}></Item>
                        {/each}
                    </div>
                </Item>
            {/each}
        </div>

        <div class="d-flex flex-row justify-content-center mt-3 align-items-start">
            <NormalButton class={"mx-2"}>
                <div slot="name">
                    <a type="button" class="btn btn-secondary text-center w-100 text-dark fs-2" href="/negozio/corsi">Torna ai corsi</a>
                </div>
            </NormalButton>

            <NormalButton class={"mx-2"}>
                <div slot="name">
                    <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" on:click={cartModal.openCart}>Ottieni</a>
                </div>
            </NormalButton>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .course-details-container {
        border: 1px solid rgba($dark, .25);
        border-radius: 1rem;
    }

    .professor {
        transition: .3s;
        color: $dark;

        &:hover {
            color: $secondary;
            cursor: pointer;
        }
    }

    .course-icon {
        width: 6rem;
        height: 6rem;
    }

    .navigation {    
        :global(.course) {
            background-color: $light !important;
            font-size: 1.05rem;
            font-weight: 500;
            border: none;
        }
        
        :global(.chapter) {
            background-color: $light !important;
            font-size: 1rem;
            font-weight: 400;
        }
        
        :global(.file) {
            background-color: $light !important;
            font-size: .95rem;
            font-weight: 300;
            padding-left: 1rem;
        }
        
        :global(.item) {
            padding-top: .5rem;
            padding-bottom: .5rem;
        }
        
        :global(.submenu) {
            border: none !important;
        }
        
        :global(.header.open) {
            background-color: $light !important;
        }
        
        :global(.item.file) {
            margin-left: 0.5rem;
            border-left: 1px solid rgba($dark, .25);
        }
        
        :global(.href) {
            padding-left: .5rem;
        }
        
        :global(.bi-chevron-right.rotate) {
            color: $secondary !important;
        }
    }
</style>