<script>
    import Modal from '$lib/components/Modal.svelte';
    let modal; 

    function open() {
	modal.show().then(async res => {
		if (res) {
			
	    }
    })
}
</script>

<button class="btn btn-primary" on:click={open}></button>

<Modal title="title" yes="yes" no="no" bind:this={modal}>
    <div>Eilà</div>
</Modal>

