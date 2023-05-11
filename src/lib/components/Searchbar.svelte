<script>
    let classes = "";
    export {classes as class};

    export let value = "";
</script>

<div class="d-flex position-relative {classes}">
    <input class="form-control confined placeholder col-12 bg-primary dark" placeholder="Cerca corso.." autocomplete="off" name="search" bind:value>
    <span class="searchbutton py-1 px-2"><i class="bi bi-search"></i></span>
</div>

<style>
    .searchbutton {
        position: absolute;
        right: 4px;
        top: 2px
    }

    .confined {
        border: 1px solid #0b1613;
        border-radius: 5px;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #0b1613;
    }
</style>
