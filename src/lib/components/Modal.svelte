<script>
import { onMount } from 'svelte';

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
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">{title}</h5>
        <button type="button" class="btn-primary btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => close(false)}></button>
      </div>
      <div class="modal-body">
        <slot {args}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" on:click={() => close(false)}>{no}</button>
        <button type="button" class="btn btn-primary" on:click={() => close(true)} disabled={!enabled}>{yes}</button>
      </div>
    </div>
  </div>
</div>