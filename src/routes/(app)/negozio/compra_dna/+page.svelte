<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { page } from '$app/stores';

    export let data;
    let user = data.user || {};

    let cartModal;
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }
</script>

<div class="d-flex flex-column">
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id == "/(app)/negozio/pacchetti" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/negozio/pacchetti" ? '-fill' : ''}
        class={"me-3"}
        text={"Pacchetti"}
        icon={"bi-box-seam"}
        href={"/negozio/pacchetti"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/negozio/corsi_singoli" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/negozio/corsi_singoli" ? '-fill' : ''}
        class={"me-3"}
        text={"Corsi singoli"}
        icon={"bi-1-circle"}
        href={"/negozio/corsi_singoli"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/negozio/compra_dna" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/negozio/compra_dna" ? '-fill' : ''}
        class={"me-3"}
        text={"Punti DNA"}
        icon={"bi-cart"}
        href={"/negozio/compra_dna"}
        />
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>