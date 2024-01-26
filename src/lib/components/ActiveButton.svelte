<script>
    let classes = "";
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();

    export {classes as class};

    export let active;
    export let style
    export let disabled
    export let href
    export let text
    export let icon
    export let fill = "";
    export let type
    export let src
    export let alt
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="active-btn {classes} {!disabled ? active : ''}" style="{style}" {disabled} on:click={() => {dispatch("click")}}>
    <slot name="name">
        {#if type == "user_stats"}
            <a class="page-btn rounded-4 py-2 px-3 text-decoration-none" href={href}>
                <span class="display-3 align-middle text-dark me-1">{text}</span>
                <img style="height: 2.5rem;" src={src} alt={alt}>
            </a>
        {:else if type == "navigation_link"}
            <div class="page-btn display-6 rounded-4 {disabled ? "disabled" : ""}">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href={disabled ? "" : href}><i class="me-3 display-5 bi {icon}{disabled ? "-fill" : fill}"></i>{text}</a>
            </div>
        {:else if type == "notes_subpages"}
            <div class="page-btn display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href={href} {disabled}><i class="display-3 bi {icon}{fill}"></i></a>
            </div>
        {/if}
    </slot>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .active-btn {
        padding: 0px;
        margin: 0rem;
        border-radius: 1rem;
        transition: .15s;
        
        .page-btn {
            display: inline-block;
            width: 100%;
            height: 100%;
        }

        .page-btn a {
            transition: .15s;
            color: rgba($dark, 0.4);
        }

        .page-btn.disabled a {
            color: rgba($dark, 0.2);
            cursor: not-allowed !important;
        }

        &:hover :not(.disabled).page-btn {
            transition: .15s;
            color: rgba($dark, 0.4);
            background: rgba($dark, 0.05);
            cursor: pointer;
        }

        &.active .page-btn {
            background: rgba($dark, 0.05);
        }

        &.active .page-btn a {
            color: $secondary;
        }
    }
</style>