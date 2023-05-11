<script>
    let classes = "";
    export {classes as class};

    let styles = "";
    export {styles as style};

    let id = Math.random(1);
</script>

<div class="accordion" style="{styles}">
    <div class="accordion-item {classes}">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#{id}">
                <div class="d-flex">
                    <slot name="name"/>
                </div>
            </button>
        </h2>
        <div id="{id}" class="accordion-collapse collapse">
            <div class="accordion-body">
                <slot name="body"/>
            </div>
        </div>
    </div>
</div>

<style>

</style>