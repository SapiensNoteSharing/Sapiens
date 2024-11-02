<script>
    import { filters } from "$lib/stores";
    import { sorting_methods } from '$lib/utils';
    import Svelecte from 'svelecte';

    let classes = "";
    export {classes as class};

</script>

<div class="d-flex position-relative {classes}">
    <input class="form-control confined" placeholder="Cerca corso.." autocomplete="off" name="search" bind:value={$filters.search}>
    <span class="searchbutton py-1"><i class="bi bi-search"></i></span>

    <div class="svelecte-custom-selection">
        <Svelecte
        placeholder="Ordina per:"
        labelField="label"
        valueAsObject
        options={sorting_methods}
        class="svelecte-control text-left selection-input"
        bind:value={$filters.sorting_method}
        on:change={(ev) =>  $filters.sorting_method = ev.detail}
        />
    </div>

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
        border-radius: .5rem 0 0 .5rem;
    }

    .confined:focus {
        border: 1px solid $dark;
        box-shadow: none;
    }

    ::placeholder {
        position: absolute;
        color: $dark;
        opacity: .5;
    }
</style>
