<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Cart from '$lib/components/Cart.svelte';

    export let data;
    let course = data.course || [];

    let cartModal;
</script>

<Cart {course} bind:this={cartModal}/>

<div class="course-details-container d-flex flex-column bg-light p-5">
    <div class="d-flex flex-row justify-content-between">
        <div class="d-flex flex-row justify-content-between">
            <div class="d-flex flex-column">
                <div class="d-flex text-dark flex-row justify-content-between mb-2">
                </div>
            </div>
        </div>

        <div class="d-flex flex-column align-items-end">
        </div>
    </div>

    <div class="my-4">
        <div class="d-flex flex-column justify-content-between mb-1">
            {#if showed.length > 0}
                {#each showed as course}
                    <div class="d-flex flex-row text-decoration-none justify-content-between align-items-end">
                        <div class="d-flex flex-row align-items-center">
                            <img class="me-4" style="height: 5rem;" src="/src/style/course_icons/{course?.name?.toLowerCase()?.replace(/\s/g, '_')}.png" alt="{course?.name} icon">
                            <div class="d-flex flex-column text-dark align-items-start">
                                <h2 class="display-4">{course?.name}</h2>
                                <h4 class="">{course?.code} &bull; {course?.cfu} CFU</h4>
                                <div class="d-flex text-dark flex-row justify-content-between mb-2">
                                    <div>
                                        {#each (course?.professors || []) as professor, i}
                                            <span class="text-decoration-none professor">{professor}</span>{i != course?.professors?.length - 1 ? " / " : ""}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NormalButton class={"ms-3"}>
                            <div slot="name">
                                <a type="button" class="btn btn-primary border-0 px-4 text-center w-100 text-dark fs-2" href="/negozio/corsi_singoli/{course?.name?.toLowerCase()?.replace(/\s/g, '_')}">
                                    Dettagli
                                </a>
                            </div>
                        </NormalButton>
                    </div>
                    <hr class="my-4">
                {/each}
            {/if}
        </div>
    </div>

    <div class="navigation d-flex flex-row justify-content-between">
        <div class="d-flex flex-row justify-content-center mt-3 align-items-start">
            <NormalButton class={"mx-2"}>
                <div slot="name">
                    <a type="button" class="btn btn-secondary text-center w-100 text-dark fs-2" href="/negozio/pacchetti">Torna ai pacchetti</a>
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