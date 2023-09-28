<script>
    
    export let icon = '';
    export let active = false;
    export let href = '.';
    export let collapsible = false;
    export let obj = {};
    
    let classes = '';
    export {classes as class};
    export let style = '';
    
    const id = 'menu-' + Math.floor(Math.random()*100000) + Math.floor(Math.random()*10000) 
    let hovering = false;
    let open = false
</script>


<a href={collapsible ? `#${id}` : href} 
data-bs-toggle="{collapsible ? 'collapse' : ''}" 
class="item {classes}" {style}
class:hover={hovering} class:active={active} 
data-sveltekit-preload-data="hover" 
on:mouseenter={() => hovering = true} 
on:mouseleave={() => hovering = false}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="d-flex header" on:click={() => {if(collapsible) open = !open}} class:hover={hovering} class:open={open}>
        {#if icon == 'chevron'}
        <i class="bi bi-chevron-right text-dark"></i>
        {:else if icon}
        <img src={icon} class="icon" class:hover={hovering} alt="Item icon" height="25px">
        {/if}
        <a class="href" data-bs-toggle="{collapsible ? 'collapse' : ''}" href="{collapsible ? `#${id}` : href}" aria-expanded="false" class:hover={hovering} class:ms-1={icon}>
            <slot>{obj?.name}</slot>
        </a>
    </div>
    <div class="collapse" {id} class:open={open}>
    {#if collapsible}
        <slot name="menu">
        </slot>
    {/if}
    </div>
</a>

<style lang="scss">
    @import '$css/variables.scss';
    a {
        text-decoration: none;
    }
    .href {
        color: $dark;
    }
    .item {
        display: block;
        font-family: Poppins;
        border-radius: $border-rounded-xs;
        background-color: $gray-600;
        .header {
            padding: .2rem .5rem
        }
        .header.open {
            background-color: $gray-700;
            border-radius: $border-rounded-xs $border-rounded-xs 0 0;
        }
        .collapse {
            padding: 0 0 .2rem .5rem;
            border-left: 1px solid $gray-800;
            border-radius: 0 0 $border-rounded-xs $border-rounded-xs
        }
        .icon.hover {
            filter: invert(76%) sepia(49%) saturate(384%) hue-rotate(116deg) brightness(90%) contrast(89%);
        }
        &.submenu {
            & > div > a.href {
                font-weight: 400;
            }
            &.active > div > a.href {
                color: $light;
                font-weight: 700;
            }
        }
        &.active {
            & > div > a.href {
                color: $light;
                font-weight: 700;
            }
        }
        
        &.active .icon {
            filter: invert(76%) sepia(49%) saturate(384%) hue-rotate(116deg) brightness(90%) contrast(89%);
        }
    }
</style>
