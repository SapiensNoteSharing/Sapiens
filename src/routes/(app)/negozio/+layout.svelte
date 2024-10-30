<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import Cart from '$lib/components/Cart.svelte';
    import { page } from '$app/stores';
    import { user } from '$lib/stores';

    export let data;
    
    let cartModal;
    $: console.log('user', $user)
    $: console.log('cart', $user.cart)

</script>

<div>
    <div class="d-flex mb-5 justify-content-between">
        <div class="d-flex">
            <ActiveButton
            type={"navigation_link"}
            active={$page.route.id.startsWith("/(app)/negozio/pacchetti") ? 'active' : 'not-active'}
            fill={$page.route.id.startsWith("/(app)/negozio/pacchetti") ? '-fill' : ''}
            class={"me-3"}
            text={"Pacchetti"}
            icon={"bi-box-seam"}
            href={"/negozio/pacchetti"}
            />
            
            <ActiveButton 
            type={"navigation_link"}
            active={$page.route.id.startsWith("/(app)/negozio/corsi") ? 'active' : 'not-active'}
            fill={$page.route.id.startsWith("/(app)/negozio/corsi") ? '-fill' : ''}
            class={"me-3"}
            text={"Corsi singoli"}
            icon={"bi-1-circle"}
            href={"/negozio/corsi"}
            />
            
            <ActiveButton 
            type={"navigation_link"}
            active={$page.route.id == "/(app)/negozio/punti_dna" ? 'active' : 'not-active'}
            fill={$page.route.id == "/(app)/negozio/punti_dna" ? '-fill' : ''}
            class={"me-3"}
            text={"Punti DNA"}
            icon={"bi-cart"}
            href={"/negozio/punti_dna"}
            />
        </div>

        <div class="d-flex">
            <Cart items={$user.cart} courses={data.courses} bind:this={cartModal} on:click={cartModal.openCart}/>
        </div>
    </div>
    
    <slot></slot>
</div>