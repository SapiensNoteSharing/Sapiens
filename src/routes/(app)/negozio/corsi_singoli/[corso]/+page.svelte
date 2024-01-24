<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import Item from '$lib/components/Item.svelte';
    import { viewing } from '$lib/stores';

    export let data;
    let course = data.course || [];

    console.log(course.name)

    let cartModal;
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }

    let selected_option = "complete"
    let selected_content = "chapters"
</script>

<Modal title="Carrello" yes="Acquista" no="Annulla" class="" theme="btn-outline-primary" bind:this={cartModal}>
    <div class="d-flex m-4 justify-content-between">
        <div>
            <span class="display-6">{course.code}</span>
            <h2 class="display-4 text-dark">{course.name}</h2>
            {#each course.professors as professor, i}
                <span class="text-dark">{professor}{i != course.professors.length - 1 ? " / " : ""}</span>
            {/each}
            <div class="d-flex mt-3">
                <section class="btn-group">
                    <div class="d-flex flex-row justify-content-start me-2">
                        <ActiveButton 
                        active={selected_option == "base" ? 'active' : 'not-active'}
                        fill={selected_option == "base" ? '-fill' : ''}
                        class={"me-3"}
                        text={"Base"}
                        icon={"bi-box"}
                        />

                        <ActiveButton 
                        active={selected_option == "complete" ? 'active' : 'not-active'}
                        fill={selected_option == "complete" ? '-fill' : ''}
                        class={"me-3"}
                        text={"Completo"}
                        icon={"bi-boxes"}
                        />
                    </div>
                </section>
            </div>
        </div>
        <div class="d-flex">
            <h2 class="align-self-center display-3 my-0">{(10 + course.cfu * 5 / 6) * (selected_option == "base" ? 0.8 : 1) * 2}</h2>
            <img style="width: 2rem;" src="/src/style/DNA.svg" alt="DNA">
        </div>
    </div>
</Modal>

<div class="course-details-container d-flex flex-column bg-light p-5">
    <div class="d-flex flex-row justify-content-between">
        <div class="d-flex flex-row justify-content-between">
            <img class="me-5 course-icon" src="/src/style/course_icons/{course.name.toLowerCase().replace(/\s/g, '_')}.png" alt="{course.name}">
            
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
            <h4 class="display-4">{course.university_name}</h4>
            <h4 class="">{course.faculty_code} &bull; {course.faculty_name}</h4>
            <h4 class="">{course?.curriculum_code} &bull; {course?.curriculum_name}</h4>
            <h4 class="">{course?.year} anno &bull; {course?.semester} semestre</h4>
        </div>
    
        <!-- <div class="d-flex flex-row h-100">
            <ActiveButton
            type={"notes_subpages"}
            active={selected_content == "chapters" ? 'active' : 'not-active'}
            fill={selected_content == "chapters" ? '-fill' : ''}
            class={"d-block py-2 mx-2 text-decoration-none h-100"}
            icon={"bi-file-earmark"}
            on:click={() => selected_content = "chapters"}
            />

            <ActiveButton
            type={"notes_subpages"}
            active={selected_content == "exercises" ? 'active' : 'not-active'}
            fill={selected_content == "exercises" ? '' : ''}
            class={"d-block py-2 mx-2 text-decoration-none h-100"}
            icon={"bi-pencil-square"}
            on:click={() => selected_content = "exercises"}
            />

            <ActiveButton
            type={"notes_subpages"}
            active={selected_content == "questions" ? 'active' : 'not-active'}
            fill={selected_content == "questions" ? '' : ''}
            class={"d-block py-2 mx-2 text-decoration-none h-100"}
            icon={"bi-plus-slash-minus"}
            on:click={() => selected_content = "questions"}
            />

            <ActiveButton
            type={"notes_subpages"}
            active={selected_content == "formulary" ? 'active' : 'not-active'}
            fill={selected_content == "formulary" ? '-fill' : ''}
            class={"d-block py-2 mx-2 text-decoration-none h-100"}
            icon={"bi-chat-dots"}
            on:click={() => selected_content = "formulary"}
            />
        </div> -->
    </div>

    <div class="my-4">
        <h2 class="display-4">Argomenti del corso</h2>
        <p >fsafhdjskafhdjsaolfhdjskalhfdjksalfhdjsaklfdhsafiud shafjds afhudso afhdusioa fhdusiaof dsuaof egwuiof dgsuyifod sbafhjdio sgavyucdos bcdjhsao fdguysaio fdcsaio fdsuaif dgsuio </p>
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
                    <a type="button" class="btn btn-secondary text-center w-100 text-dark fs-2" href="/negozio/corsi_singoli">Torna ai corsi</a>
                </div>
            </NormalButton>

            <NormalButton class={"mx-2"}>
                <div slot="name">
                    <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" on:click={openCart}>Ottieni</a>
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