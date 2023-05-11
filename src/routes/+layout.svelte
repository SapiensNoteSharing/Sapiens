<script>
import { onMount } from "svelte";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '$css/global.scss';

</script>


<div class="row">
    <div class="sidebar position-relative">
    </div>
    <div class="col pe-4">
        <slot></slot>
    </div>

</div>

<style lang="scss">
    @import '$css/variables.scss';
    .sidebar{
        position: relative;
        width: 25%;
        height: 100vh;
        background-color: $primary;
        border-right: 1px solid $dark;
        resize: horizontal;
        min-width: 20%;
        max-width: 30%;
    }
</style>