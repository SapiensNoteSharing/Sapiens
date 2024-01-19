<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { page } from '$app/stores';

    export let user;
</script>

<div class="left-sidebar px-4">
    <div class="mt-5 sidebar-container">
        <ActiveButton active={$page.route.id == "/(app)/home" ? 'active' : 'not-active'} classes={"my-2"}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/home"><i class="me-3 display-5 bi bi-house-door{$page.route.id == "/(app)/home" ? '-fill' : ''}"></i>Home</a>
            </div>
        </ActiveButton>

        <ActiveButton active={$page.route.id == "/(app)/aula_studio" ? 'active' : 'not-active'} classes={"my-2"}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/aula_studio"><i class="me-3 display-5 bi bi-book{$page.route.id == "/(app)/aula_studio" ? '-fill' : ''}"></i>Aula Studio</a>
            </div>
        </ActiveButton>

        <ActiveButton active={$page.route.id == "/(app)/i_miei_corsi" ? 'active' : 'not-active'} classes={"my-2"}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/i_miei_corsi"><i class="me-3 display-5 bi bi-backpack2{$page.route.id == "/(app)/i_miei_corsi" ? '-fill' : ''}"></i>I miei corsi</a>
            </div>
        </ActiveButton>

        <ActiveButton active={$page.route.id == "/(app)/calendario" ? 'active' : 'not-active'} classes={"my-2"}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/calendario"><i class="me-3 display-5 bi bi-calendar2-event{$page.route.id == "/(app)/calendario" ? '-fill' : ''}"></i>Calendario</a>
            </div>
        </ActiveButton>

        <hr class="mx-3">

        <ActiveButton active={$page.route.id == "/(app)/negozio" ? 'active' : 'not-active'} classes={"my-2"}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/negozio"><i class="me-3 display-5 bi bi-bag{$page.route.id == "/(app)/negozio" ? '-fill' : ''}"></i>Negozio</a>
            </div>
        </ActiveButton>

        <ActiveButton active={$page.route.id == "/(app)/contribuisci" ? 'active' : 'not-active'} classes={"my-2"}>
            <div slot="name" class="navbar-item display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/contribuisci"><i class="me-3 display-5 bi bi-puzzle{$page.route.id == "/(app)/contribuisci" ? '-fill' : ''}"></i>Contribuisci</a>
            </div>
        </ActiveButton>
        
        {#if user.streak < 7}
            <ActiveButton classes={"my-2"} disabled>
                <div slot="name" class="navbar-item display-6 rounded-4">
                    <a class="d-block display-5 px-3 py-2 text-decoration-none"><i class="me-3 display-5 bi bi-lock"></i>Sfide</a>
                </div>
            </ActiveButton>
        {:else}
            <ActiveButton active={$page.route.id == "/(app)/sfide" ? 'active' : 'not-active'} classes={"my-2"}>
                <div slot="name" class="navbar-item display-6 rounded-4">
                    <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/sfide"><i class="me-3 display-5 bi bi-award{$page.route.id == "/(app)/sfide" ? '-fill' : ''}"></i>Sfide</a>
                </div>
            </ActiveButton>
        {/if}

        {#if user.streak < 14}
            <ActiveButton classes={"my-2"} disabled>
                <div slot="name" class="navbar-item display-6 rounded-4">
                    <a class="d-block display-5 px-3 py-2 text-decoration-none"><i class="me-3 display-5 bi bi-lock"></i>Classifiche</a>
                </div>
            </ActiveButton>
        {:else}
            <ActiveButton active={$page.route.id == "/(app)/classifiche" ? 'active' : 'not-active'} classes={"my-2"}>
                <div slot="name" class="navbar-item display-6 rounded-4">
                    <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/classifiche"><i class="me-3 display-5 bi bi-trophy{$page.route.id == "/(app)/classifiche" ? '-fill' : ''}"></i>Classifiche</a>
                </div>
            </ActiveButton>
        {/if}

        {#if user.role == 'admin'}
            <hr class="mx-3">

            <ActiveButton active={$page.route.id == "/test" ? 'active' : 'not-active'} classes={'my-2'}>
                <div slot="name" class="navbar-item display-6 rounded-4">
                    <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/test"><i class="me-3 display-5 bi bi-gear{$page.route.id == "/test" ? '-fill' : ''}"></i>Test</a>
                </div>
            </ActiveButton>

            <ActiveButton active={$page.route?.id?.startsWith("/admin") ? 'active' : 'not-active'} classes={"my-2"}>
                <div slot="name" class="navbar-item display-6 rounded-4">
                    <a class="d-block display-5 px-3 py-2 text-decoration-none" href="/admin/courses"><i class="me-3 display-5 bi bi-person{$page.route?.id?.startsWith("/admin") ? '-fill' : ''}"></i>Admin</a>
                </div>
            </ActiveButton>
        {/if}
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .left-sidebar {
        position: sticky;
        width: 250px;
        min-height: 89vh;
        flex-shrink: 0;
        background-color: $light;
        border-right: 1px solid rgba($dark, 0.25);
    }

    .left-sidebar-container {
        position: sticky;
        top: calc(8rem + 1px);
    }
</style>