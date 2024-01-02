<script>
    let classes = "";
    export {classes as classes};

    let active;
    export {active as active};
    
    let style;
    export {style as style};

    let disabled;
    export {disabled as disabled}
</script>

<div class="active-btn {classes} {active}" style="{style}" {disabled}>
    <slot name="name"></slot>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .active-btn {
        padding: 0px;
        margin: 0rem;
        border-radius: 1rem;
        // border: 1px solid rgba($dark, 0.15);
        transition: .15s;
        
        &:hover:not([disabled]) {
            transition: .15s;
            color: rgba($dark, 0.4);
            cursor: pointer;
            // background: rgba($dark, 0.05);
        }
    }

    :global(:not([disabled]) .navbar-item a) {
        transition: .15s;
        color: rgba($dark, 0.4);
        border-radius: 1rem;
    }

    :global([disabled] .navbar-item a) {
        color: rgba($dark, 0.2);
    }

    :global(.active .navbar-item a) {
        background: rgba($dark, 0.05);
        color: $secondary;
    }
    
    :not([disabled]):global(:not(.active) .navbar-item:hover) {
        background: rgba($dark, 0.05);
        transition: .15s;
    }

    :global(.active .navbar-item:hover a) {
        color: $secondary;
    }
</style>