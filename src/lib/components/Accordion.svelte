<script>
    let classes = "";
    export {classes as class};

    let style = "";

    export let id = 'acc' + Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 1000000);
</script>

<div class="accordion {classes}" {style} {id}>
    <slot></slot>
</div>

<style>

</style>