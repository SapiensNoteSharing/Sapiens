<script>
import { onMount } from "svelte";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
onMount(async () => {
    const bootstrap = await import('bootstrap')
})
</script>

<div class="p-5">
<slot></slot>
</div>