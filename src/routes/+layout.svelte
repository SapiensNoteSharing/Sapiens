<script>
import { onMount } from "svelte";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '$css/global.scss';

</script>


<div class="d-flex">
    <div class="sidebar position-relative">
    </div>
    <div class="pe-4 flex-grow-1">
        <slot></slot>
    </div>

</div>

<style lang="scss">
    @import '$css/variables.scss';
    .sidebar{
        width: 270px;
        height: 100vh;
        background-color: $light;
        border-right: 1px solid $dark;
        resize: horizontal;
        min-width: 200px;
        max-width: 350px;
    }
</style>