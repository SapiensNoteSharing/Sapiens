<script>
import { fly } from 'svelte/transition'

export let iconType;
export let title;
export let titleClass = '';

let hovering = false;

</script>


<div style="width: 200px; height: 200px" on:hover={() => hovering = true}>
    {#if hovering}
        <p class={titleClass} transition:fly={{y: 20, duration: 1000}}>{title}</p>
    {:else}
        <i class="bi {iconType}"></i>
    {/if}
</div>


<style>
.icon {
    width: 30px;
    height: 20px;
}
</style>