<script>
    let classes = "";
    export {classes as classes};

    let style;
    export {style as style};

    let disabled;
    export {disabled as disabled}
</script>

<div class="normal-btn {classes}" style="{style}" {disabled}>
    <slot name="name"></slot>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .normal-btn {
        display: inline-block;
        width: auto;
        padding: 0rem;
        transition: .15s;
        background-color: transparent;
    }
</style>