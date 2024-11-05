<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { page } from '$app/stores';
</script>

<div>
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuzione/condividi_appunti" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuzione/condividi_appunti" ? '-fill' : ''}
        class={"me-3"}
        text={"Condividi i tuoi appunti"}
        icon={"bi-file-earmark-plus"}
        href={"/contribuzione/condividi_appunti"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuzione/dashboard" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuzione/dashboard" ? '-fill' : ''}
        class={"me-3"}
        text={"Dashboard"}
        icon={"bi-bar-chart"}
        href={"/contribuzione/dashboard"}
        />
    </div>
    
    <slot></slot>
</div>