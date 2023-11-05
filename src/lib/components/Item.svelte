<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();


    export let icon = '';
    export let active = false;
    export let href = '';
    export let collapsible = false;
    export let obj = {};
    
    let classes = '';
    export {classes as class};
    export let style = '';
    
    const id = 'menu-' + Math.floor(Math.random()*100000) + Math.floor(Math.random()*10000) 
    let hovering = false;
    let open = false

    function handleClick(ev){
        if(collapsible) open = !open
        dispatch('click', obj)
    }

    //
    //
</script>


<!-- svelte-ignore a11y-missing-attribute -->
<a
class="item {classes}" {style}
class:hover={hovering} class:active={active} 
data-sveltekit-preload-data="hover" 
on:mouseenter={() => hovering = true} 
on:mouseleave={() => hovering = false}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="d-flex header" on:click|preventDefault={handleClick} class:hover={hovering} class:open={open} data-bs-toggle="{collapsible ? 'collapse' : ''}" href={collapsible ? `#${id}` : href}  aria-expanded="false" >
        {#if icon == 'chevron'}
            <i class="bi bi-chevron-right text-dark" class:rotate={open}></i>
        {:else if icon}
            <img src={icon} class="icon" class:hover={hovering} alt="Item icon" height="25px">
        {/if}
            <a class="href" class:hover={hovering} class:ms-1={icon}>
                <slot>{obj?.name}</slot>
            </a>
        </div>
    {#if collapsible}
        <div class="collapse submenu" {id} class:open={open}>
            <slot name="menu">
            </slot>
        </div>
    {/if}
</a>

<style lang="scss">
    @import '$css/variables.scss';
    a {
        text-decoration: none;
    }

    .href {
        color: $dark;
        transition: .1s;
    }

    .item {
        display: block;
        font-family: Poppins;
        background-color: $gray-500;

        .header {
            padding: .2rem .5rem;
            cursor: pointer;
        }

        .header.open {
            background-color: $success;
        }

        .collapse {
            border-radius: 0 0 $border-rounded-xs $border-rounded-xs;
        }

        .icon.hover {
            filter: invert(76%) sepia(49%) saturate(384%) hue-rotate(116deg) brightness(90%) contrast(89%);
        }

        .submenu {
            padding-left: .5rem;
            border-left: 1px solid $gray-700;
            border-bottom: 1px solid $gray-700;

            & > div > a.href {
                font-weight: 400;
            }

            &.active > div > a.href {
                color: $secondary;
                font-weight: 700;
            }
        }

        &.active {
            color: $secondary;

            & > div > a.href {
                color: $secondary;
                font-weight: 600;
            }
        }
        
        &.active .icon {
            filter: invert(76%) sepia(49%) saturate(384%) hue-rotate(116deg) brightness(90%) contrast(89%);
        }
    }

    .bi.bi-chevron-right {
        height: fit-content;
        transition: transform 0.2s;
    }

    .bi.bi-chevron-right.rotate {
        transform: rotate(90deg);
    }
</style>
