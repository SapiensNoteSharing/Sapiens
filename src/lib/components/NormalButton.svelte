<script>
    let classes = "";
    export {classes as classes};

    let style;
    export {style as style};
</script>

<div class="normal-btn {classes}" style="{style}">
    <slot name="name"></slot>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .normal-btn {
        padding: 0px;
        margin: 0rem;
        border-radius: 1rem;
        background: $primary;
        // border: 1px solid rgba($dark, 0.15);
        transition: .15s;
        
        &:hover {
            transition: .15s;
            color: rgba($dark, 0.4);
            background: filter($primary, 10%);
            cursor: pointer;
            // background: rgba($dark, 0.05);
        }
    }

    // :global(.navbar-item a) {
    //     transition: .15s;
    //     color: rgba($dark, 0.4);
    //     border-radius: 1rem;
    // }

    // :global(.active .navbar-item a) {
    //     background: rgba($dark, 0.05);
    //     color: $secondary;
    // }
    
    // :global(:not(.active) .navbar-item:hover a) {
    //     background: rgba($dark, 0.05);
    //     color: rgba($dark, 0.4);
    //     transition: .15s;
    // }

    // :global(.active .navbar-item:hover a) {
    //     color: $secondary;
    // }
</style>