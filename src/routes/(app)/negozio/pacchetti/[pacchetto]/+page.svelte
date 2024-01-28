<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Cart from '$lib/components/Cart.svelte';
    import Item from '$lib/components/Item.svelte';
    import { viewing } from '$lib/stores';

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
        <h2 class="display-4">Argomenti del corso</h2>
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