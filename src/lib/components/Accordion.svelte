<script>
    
</script>

<div class="accordion">
    <div class="accordion-item confined rounded-top dark">
        <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseOne"
            >
            <div class="d-flex">
                <slot name="name"/>
            </div>
        </button>
        <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingOne"
            style=""
        >
            <div class="accordion-body">
                <slot name="body"/>
            </div>
        </div>
    </div>
</div>