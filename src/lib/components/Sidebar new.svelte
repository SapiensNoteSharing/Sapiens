<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import { page } from '$app/stores';

    export let data;
    let user = data.user || {};
</script>

<div class="sidebar px-5 position-relative">
    <!-- Site navigation -->
    <NormalButton active={$page.route.id == "/(app)/home" ? 'active' : 'not-active'} classes={"m-2"}>
        <div slot="name" class="navbar-item display-6 rounded-4">
            <a class="d-block px-4 py-2 text-decoration-none" href="/home">Home</a>
        </div>
    </NormalButton>

    <NormalButton active={$page.route.id == "/(app)/aula_studio" ? 'active' : 'not-active'} classes={"m-2"}>
        <div slot="name" class="navbar-item display-6 rounded-4">
            <a class="d-block px-4 py-2 text-decoration-none" href="/aula_studio">Aula Studio</a>
        </div>
    </NormalButton>

    <NormalButton active={$page.route.id == "/(app)/corsi" ? 'active' : 'not-active'} classes={"m-2"}>
        <div slot="name" class="navbar-item display-6 rounded-4">
            <a class="d-block px-4 py-2 text-decoration-none" href="/corsi">Corsi</a>
        </div>
    </NormalButton>

    <NormalButton active={$page.route.id == "/(app)/classifiche" ? 'active' : 'not-active'} classes={"m-2"}>
        <div slot="name" class="navbar-item display-6 rounded-4">
            <a class="d-block px-4 py-2 text-decoration-none" href="/classifiche">Classifiche</a>
        </div>
    </NormalButton>

    {#if data.user.role == 'admin'}
        <NormalButton active={$page.route.id == "/test" ? 'active' : 'not-active'} classes={'m-2'}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block px-4 py-2 text-decoration-none" href="/test">Test</a>
            </div>
        </NormalButton>

        <NormalButton active={$page.route?.id?.startsWith("/admin") ? 'active' : 'not-active'} classes={"m-2"}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block px-4 py-2 text-decoration-none" href="/admin/courses">Admin</a>
            </div>
        </NormalButton>
    {/if}
</div>

<style lang="scss">
    @import '$css/variables.scss';
    
    .sidebar {
        width: 300px;
        min-height: 82vh;
        flex-shrink: 0;
        background-color: $light;
        border-right: 1px solid rgba($dark, 0.25);
    }
</style>