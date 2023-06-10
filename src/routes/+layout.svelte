<script>
import { onMount } from "svelte";
import '$css/global.scss'


onMount(async () => {
    const bootstrap = await import('bootstrap')
})

</script>

<slot/>