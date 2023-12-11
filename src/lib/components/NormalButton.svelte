<script>
    let classes = "";
    export {classes as classes};

    let active;
    export {active as active};
    
    let style;
    export {style as style};
</script>

<div class="normal {classes} {active}" style="{style}">
    <slot name="name"></slot>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .normal {
        padding: 0px;
        margin: 0rem;
        border-radius: 1rem;
        // border: 1px solid rgba($dark, 0.15);
        transition: .15s;
    }

    .normal:hover {
        transition: .15s;
        color: rgba($dark, 0.4);
        border-radius: 1rem;
        cursor: pointer;
        // background: rgba($dark, 0.05);
    }

    :global(.navbar-item a) {
        transition: .15s;
        color: rgba($dark, 0.4);
        border-radius: 1rem;
    }

    :global(.active .navbar-item a) {
        background: rgba($dark, 0.05);
        color: $secondary;
    }
    
    :global(:not(.active) .navbar-item:hover a) {
        background: rgba($dark, 0.05);
        color: rgba($dark, 0.4);
        transition: .15s;
    }

    :global(.active .navbar-item:hover a) {
        color: $secondary;
    }

    // :global(.active .navbar-item) {
    //     background: $light;
    // }
</style>