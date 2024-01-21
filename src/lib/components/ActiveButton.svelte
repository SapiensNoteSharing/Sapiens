<script>
    let classes = "";
    export {classes as class};

    export let active;
    export let style
    export let disabled
    export let href
    export let text
    export let icon
    export let fill
</script>

<div class="active-btn {classes} {!disabled ? active : ''}" style="{style}" {disabled}>
    <slot name="name">
        <div class="page-btn display-6 rounded-4">
            <a class="d-block display-5 px-3 py-2 text-decoration-none" href={href} {disabled}><i class="me-3 display-5 bi {icon}{fill}"></i>{text}</a>
        </div>
    </slot>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .active-btn {
        padding: 0px;
        margin: 0rem;
        border-radius: 1rem;
        
        &:hover .page-btn {
            transition: .15s;
            color: rgba($dark, 0.4);
            background: rgba($dark, 0.05);
            cursor: pointer;
        }

        .page-btn a {
            transition: .15s;
            color: rgba($dark, 0.4);
            border-radius: 1rem;
        }

        &.active .page-btn a {
            background: rgba($dark, 0.05);
            color: $secondary;
        }

        // :not([disabled]) .page-btn a {
        //     transition: .15s;
        //     color: rgba($dark, 0.4);
        //     border-radius: 1rem;
        // }

        // [disabled] .page-btn a {
        //     color: rgba($dark, 0.2);
        // }

        // :not([disabled]) :not(.active) .page-btn:hover {
        //     background: rgba($dark, 0.05);
        //     transition: .15s;
        // }
    }
</style>