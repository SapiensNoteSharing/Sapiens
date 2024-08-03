<script>
    import Bundle from '$lib/components/Bundle.svelte';
    import { user } from '$lib/stores'
    import { sort_course_list } from '$lib/utils';
    export let data;

    let courses = data.courses || [];
    let owned = data.my_courses || [];

</script>

<div class="d-flex flex-column">
    <div class="row g-3 mb-4">
        <Bundle 
            type="semestre" 
            class="col-md-4"
            title={"Pacchetto semestrale"} 
            subtitle={`${$user?.semester}°` + " semestre"} 
            href="/negozio/pacchetti/semestre" 
            enabled={$user?.semester != null && $user?.year != null && $user?.degree?.name != undefined}>
        </Bundle>

        <Bundle 
            type="anno" 
            class="col-md-4" 
            title={"Pacchetto annuale"} 
            subtitle={`${$user?.year}°` + " anno"} 
            href="/negozio/pacchetti/anno" 
            enabled={$user?.year != null && $user?.degree?.name != undefined}>
        </Bundle>
        
        <Bundle 
            type="facoltà" 
            class="col-md-4" 
            title={"Pacchetto facoltà"} 
            subtitle={$user?.degree?.name} 
            href="/negozio/pacchetti/facoltà" 
            enabled={$user?.degree?.name != undefined}>
        </Bundle>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>