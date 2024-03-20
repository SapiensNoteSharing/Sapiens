<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { page } from '$app/stores';
</script>

<div>
    <div class="d-flex flex-row mb-5">
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
    
    <slot></slot>
</div>