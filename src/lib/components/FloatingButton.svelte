<script>
    let classes = "";
    export {classes as classes};

    let active;
    export {active as active};
    
    let style;
    export {style as style};
</script>

<div class="floating {classes} {active}" style="{style}">
    <slot name="name"></slot>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .floating {
        padding: 0px;
        border: 1px solid $dark;
        border-radius: 1rem;
        box-shadow: 0rem .4rem rgba($dark, 0.6);
        margin-bottom: 0.4rem;
        transition: .1s;
    }

    .floating:hover {
        box-shadow: 0rem .2rem rgba($dark, 0.6);
        transform: translate(0rem, .2rem);
    }

    .floating.active {
        box-shadow: none;
        transform: translate(0rem, .4rem);
    }
</style>