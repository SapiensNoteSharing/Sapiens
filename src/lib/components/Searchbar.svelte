<script>
    import { filters } from "$lib/stores";
    import { sorting_methods } from '$lib/utils';
    import Svelecte from 'svelecte';

    let classes = "";
    export {classes as class};
    $: console.log('filter', $filters.sorting_method)
</script>

<div class="d-flex position-relative {classes}">
    <input class="form-control confined bg-light pe-5" placeholder="Cerca corso.." autocomplete="off" name="search" bind:value={$filters.search}>
    <span class="searchbutton py-1"><i class="bi bi-search"></i></span>

    <Svelecte
    style="width: 18rem;"
    placeholder="Ordina per:"
    labelField="label"
    valueAsObject
    options={sorting_methods}
    class="svelecte-control text-left selection-input"
    bind:value={$filters.sorting_method}
    on:change={(ev) => {console.log(ev); $filters.sorting_method = ev.detail}}
    />
</div>

<style lang="scss">
    @import "$css/variables.scss";

    .searchbutton {
        position: absolute;
        right: 1rem;
        top: 2px;
        opacity: .5;
        transition: .25s;
    }

    .confined:focus + .searchbutton {
        opacity: 1;
    }

    .confined {
        border: 1px solid rgba($dark, 0.25);
        border-radius: .5rem;
    }

    .confined:focus {
        border: 1px solid $dark;
    }

    ::placeholder {
        position: absolute;
        color: $dark;
        opacity: .5;
    }
</style>
