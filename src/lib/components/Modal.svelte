<script>
	import { onMount } from 'svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
	
	/** @type {string} **/
	export let id = Date.now();
	/** @type {string} **/
	export let title;
	/** @type {string} **/
	export let yes = "Yes";
	/** @type {string} **/
	export let no = "No";
	/** @type {boolean} **/
	export let enabled = true;
	/** @type {boolean} **/
	export let large = false;
	export let xlarge = false;

	export let args = {};
	export let center = false;

	let classes = ""
	export {classes as class};
	export let theme = "";

	let bootstrap, modal, modalWin, cache = {};

	function close(resp) {
		modal.hide();
		cache[id].resolve(resp);
	}

	function buy() {
		// if (user.dna > cost) {
			// user.dna -= cost;
			close();
		// } else {
			// alert("Non hai abbastanza punti dna")
		// }
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
			<!-- <div class="modal-header {class}">
				<h3 class="modal-title display-4 text-dark" id="modalTitle">{title}</h3>
			</div> -->
			
			<div class="modal-body">
				<slot/>
			</div>

			<div class="modal-footer d-flex flex-row justify-content-{center == true ? "center" : "end"}">
				{#if no}
					<NormalButton class={"ml-auto"} style={""}>
						<div slot="name">
							<a type="button" class="btn btn-primary text-center px-4 py-2 rounded-4 w-100 text-dark fs-2" on:click={close}>
								{no}
							</a>
						</div>
					</NormalButton>
				{/if}
				<NormalButton class={"ml-auto"} style={""}>
					<div slot="name">
						<a type="button" class="btn btn-secondary text-center px-4 py-2 rounded-4 w-100 text-dark fs-2" on:click={buy}>
							{yes}
						</a>
					</div>
				</NormalButton>
			</div>
		</div>
	</div>
</div>
  
  