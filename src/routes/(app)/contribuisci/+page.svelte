<script>
    import Icon from '$lib/components/Icon.svelte';
    import Course from '$lib/components/Course.svelte';
    import CourseCard from '$lib/components/CourseCard.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { view, value, filter_tags, dna } from '$lib/stores';
    import { space } from 'svelte/internal';

    let subpage = "submit";
</script>

<div class="d-flex flex-row">
    <NormalButton active={subpage == "submit" ? 'active' : 'not-active'} classes={"me-3"}>
        <div slot="name" class="navbar-item outlined display-6 rounded-4">
            <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "submit"}><i class="me-3 display-5 bi bi-file-earmark-plus{subpage == "submit" ? '-fill' : ''}"></i>Nuovo corso</a>
        </div>
    </NormalButton>

    <NormalButton active={subpage == "correction" ? 'active' : 'not-active'} classes={"me-3"}>
        <div slot="name" class="navbar-item outlined display-6 rounded-4">
            <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "correction"}><i class="me-3 display-5 bi bi-exclamation-triangle{subpage == "correction" ? '-fill' : ''}"></i>Correzione</a>
        </div>
    </NormalButton>

    <NormalButton active={subpage == "suggestion" ? 'active' : 'not-active'} classes={"me-3"}>
        <div slot="name" class="navbar-item outlined display-6 rounded-4">
            <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "suggestion"}><i class="me-3 display-5 bi bi-chat-dots{subpage == "suggestion" ? '-fill' : ''}"></i>Suggerimento</a>
        </div>
    </NormalButton>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .main-content {
        width: 70%;
        height: 100%;
        box-sizing: border-box;
    }

    .side-content {
        width: 30%;
        height: 100%;
        box-sizing: border-box;
    }

    .box {
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }
</style>