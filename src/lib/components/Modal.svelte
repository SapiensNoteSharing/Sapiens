<script>
import { onMount } from 'svelte';

/** @type {string} **/
export let id = Date.now();
/** @type {string} **/
export let title;
/** @type {string} **/
export let yes = "Yes";
/** @type {string} **/
export let no = "";
/** @type {boolean} **/
export let enabled = true;
/** @type {boolean} **/
export let large = false;
export let xlarge = false;

export let args = {};

export let classes = "";
export let theme = "";

let bootstrap, modal, modalWin, cache = {};

function close(resp) {
	modal.hide();
	cache[id].resolve(resp);
}

export function show(props = {}) {
	args = props;
	modal = new bootstrap.Modal(modalWin);
	modal.show();
	return new Promise((resolve, reject) => {
		cache[id] = {
			resolve: resolve,
			reject: reject
		};
	});
}

onMount(async () => {
	bootstrap = await import('bootstrap');
})
</script>
    
<div class="modal fade" bind:this={modalWin} tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" data-bs-backdrop="static">
	<div class="modal-dialog modal-dialog-centered" class:modal-lg={large} class:modal-xl={xlarge} role="document">
		<div class="modal-content">
			<div class="modal-header {classes}">
				<h3 class="modal-title fs-1" id="modalTitle">{title}</h3>
				<!-- <button type="button" class="btn-primary btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => close(false)}></button> -->
			</div>
			<div class="modal-body">
				<slot/>
			</div>
			<div class="modal-footer">
				{#if no}
					<button type="button" class="btn btn-outline-secondary text-dark fs-3 px-4 py-2 border-dark rounded-pill" on:click={() => close(false)}>{no}</button>
				{/if}
				<button type="button" class="btn {theme} text-dark fs-3 px-4 py-2 border-dark rounded-pill" on:click={() => close(true)} disabled={!enabled}>{yes}</button>
			</div>
		</div>
	</div>
</div>
  
  