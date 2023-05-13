<script>
    let classes = "";
    export {classes as class};

    let styles = "";
    export {styles as style};

    export let id = Math.floor(Math.random() * 1000);
</script>

<div class="accordion {classes}" style="{styles}" id="{id}">
    <slot></slot>
</div>

<style>

</style>