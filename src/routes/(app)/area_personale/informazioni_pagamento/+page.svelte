<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { page } from '$app/stores';

    export let data;
    let account = {...data.user}
</script>

<div>
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id == "/(app)/area_personale/dati_account" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/area_personale/dati_account" ? '-fill' : ''}
        class={"me-3"}
        text={"Dati account"}
        icon={"bi-person"}
        href={"/area_personale/dati_account"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/area_personale/preferenze" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/area_personale/preferenze" ? '-fill' : ''}
        class={"me-3"}
        text={"Preferenze"}
        icon={"bi-gear"}
        href={"/area_personale/preferenze"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/area_personale/informazioni_pagamento" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/area_personale/informazioni_pagamento" ? '-fill' : ''}
        class={"me-3"}
        text={"Informazioni pagamento"}
        icon={"bi-credit-card"}
        href={"/area_personale/informazioni_pagamento"}
        />
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>