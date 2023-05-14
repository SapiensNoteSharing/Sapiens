<script>
  let classes = '';
  export {classes as class}
  export let style = '';
  export let parent;

  export let id = 'acc-item' + Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000);
</script>

<div class="accordion-item {classes}" {style}>
  <h2 class="accordion-header">
    <div class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#{id}" aria-expanded="false" aria-controls={id}>
      <slot name="name"></slot>
    </div>
  </h2>
  <div {id} class="accordion-collapse collapse" data-bs-parent={parent ? `${parent}` : ""}>
    <div class="accordion-body">
      <slot name="body"></slot>
    </div>
  </div>  
</div>