<script>
  let classes = '';
  export {classes as class}
  export let style = '';
  export let parent;
  export let open = false;

  export let id = 'acc-item' + Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000);
</script>

<div class="accordion-item {classes}" {style}>
  <h2 class="accordion-header">
    <div class="accordion-button {open ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#{id}" aria-expanded={open} aria-controls={id}>
      <slot name="name"></slot>
    </div>
  </h2>
  <div {id} class="accordion-collapse collapse {open ? 'show' : ''}" data-bs-parent={parent ? `${parent}` : ""}>
    <div class="accordion-body">
      <slot name="body"></slot>
    </div>
  </div>  
</div>