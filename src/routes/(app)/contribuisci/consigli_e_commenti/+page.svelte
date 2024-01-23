<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { page } from '$app/stores';
</script>

<div class="d-flex flex-column">
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuisci/condividi_appunti" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuisci/condividi_appunti" ? '-fill' : ''}
        class={"me-3"}
        text={"Condividi i tuoi appunti"}
        icon={"bi-file-earmark-plus"}
        href={"/contribuisci/condividi_appunti"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuisci/suggerisci_correzione" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuisci/suggerisci_correzione" ? '-fill' : ''}
        class={"me-3"}
        text={"Suggerisci correzione"}
        icon={"bi-exclamation-triangle"}
        href={"/contribuisci/suggerisci_correzione"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuisci/consigli_e_commenti" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuisci/consigli_e_commenti" ? '-fill' : ''}
        class={"me-3"}
        text={"Consigli e commenti"}
        icon={"bi-chat-dots"}
        href={"/contribuisci/consigli_e_commenti"}
        />
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>