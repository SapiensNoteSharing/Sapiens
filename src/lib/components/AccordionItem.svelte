<script>
	let classes = '';
	export {classes as class}
	export let style = '';
	export let parent;
	export let open = false;
	export let title = '';

	export let id = 'acc-item' + Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000);
</script>

<div class="accordion-item {classes}" {style}>
	<h2 class="accordion-header">
		<div class="accordion-button bg-light {open ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#{id}" aria-expanded={open} aria-controls={id}>
			<slot name="name">{title}</slot>
		</div>
	</h2>
	<div {id} class="accordion-collapse collapse {open ? 'show bg-light' : ''}" data-bs-parent={parent ? `${parent}` : ""}>
		<div class="accordion-body">
			<slot name="body"></slot>
		</div>
	</div>  
</div>

<style>
	.accordion-button::before {
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
		margin-right: 1rem;
		content: "";
		background-image: var(--bs-accordion-btn-active-icon);
		background-repeat: no-repeat;
		background-size: 1.25rem;
		transition: transform .2s ease-in-out;
	}

	.collapsed::before {
		transform: rotate(-180deg);
	}

	.accordion-button::after {
		display: none !important;
	}
</style>