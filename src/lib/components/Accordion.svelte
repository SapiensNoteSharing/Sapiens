<script>
    let classes = "";
    export {classes as class};

    let styles = "";
    export {styles as style};

    export let id = Math.floor(Math.random() * 1000);
    export let keepOpen = false;
    let open = false
</script>

<div class="accordion" id="accordionPanelsStayOpenExample">
    <slot></slot>
</div>

<style>

</style>