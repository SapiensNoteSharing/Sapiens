<script>
    export let course = {};
    export let open = false;
    export let parent = '';
    export let id = 'acc-item' + Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000);
</script>

<div class="accordion mt-3">
    <div class="accordion-item">
        <h2 class="accordion-header">
            <div class="accordion-button {open ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#{id}" aria-expanded={open} aria-controls={id}>
                <slot name="name">{course.name}</slot>
            </div>
        </h2>
        <div {id} class="accordion-collapse collapse {open ? 'show' : ''}" data-bs-parent={parent ? `${parent}` : ""}>
            <div class="accordion-body">
                <span>Testo di prova</span>
                <slot></slot>
            </div>
        </div>  
    </div>
</div>


<style lang="scss">
    @import '$css/variables.scss';
    
    .accordion {
        & > .accordion-item {
            background-color: transparent;
            border-width: 0 !important;
            .accordion-button {
                padding: .3rem .5rem;
                background-color: transparent;
                border-radius: $border-rounded-xs;
                border-bottom: 0px;
                box-shadow: none;
                &:hover {
                    background-color: $gray-600;
                }
            }
            .accordion-body {
                padding: .2rem 1.3rem;
                background-color: light !important;
            }
        }
        
    }
    
    
    
    .accordion-button::before {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
        margin-right: .5rem;
        content: "";
        background-image: var(--bs-accordion-btn-active-icon);
        background-repeat: no-repeat;
        background-size: 1.25rem;
        transition: transform .2s ease-in-out;
    }
    
    .accordion-button::after {
        display: none !important;
    }
    
    
</style>