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
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>