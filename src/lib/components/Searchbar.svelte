<script>
    let classes = "";
    export {classes as class};

    export let value = "";
</script>

<div class="d-flex position-relative {classes}">
    <input class="form-control confined bg-primary dark pe-5 ms-5" placeholder="Cerca corso.." autocomplete="off" name="search" bind:value>
    <span class="searchbutton py-1 px-2"><i class="bi bi-search"></i></span>
</div>

<style lang="scss">
    @import "$css/variables.scss";

    .searchbutton {
        position: absolute;
        right: 4px;
        top: 2px
    }

    .confined {
        border: 1px solid $dark;
        border-radius: 5px;
    }

    ::placeholder {
        color: $dark;
        opacity: 0.5;
    }
</style>
