<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { page } from '$app/stores';

    export let user;
</script>

<div class="left-sidebar px-4">
    <div class="mt-5 sidebar-container">
        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/home" ? 'active' : 'not-active'} 
        fill={$page.route.id == "/(app)/home" ? '-fill' : ''}
        class={"my-2"}
        href={"/home"}
        text={"Home"}
        icon={"bi-house-door"}
        >
        </ActiveButton>

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/aula_studio" ? 'active' : 'not-active'} 
        fill={$page.route.id == "/(app)/aula_studio" ? '-fill' : ''}
        class={"my-2"}
        href={"/aula_studio"}
        text={"Aula Studio"}
        icon={"bi-book"}
        >
        </ActiveButton>

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/calendario" ? 'active' : 'not-active'} 
        fill={$page.route.id == "/(app)/calendario" ? '-fill' : ''}
        class={"my-2"}
        href={"/calendario"}
        text={"Calendario"}
        icon={"bi-calendar-week"}
        >
        </ActiveButton>

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id.startsWith("/(app)/negozio") ? 'active' : 'not-active'} 
        fill={$page.route.id.startsWith("/(app)/negozio") ? '-fill' : ''}
        class={"my-2"}
        href={"/negozio/pacchetti"}
        text={"Negozio"}
        icon={"bi-bag"}
        >
        </ActiveButton>

        <hr class="mx-3">

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id.startsWith("/(app)/contribuzione") ? 'active' : 'not-active'} 
        fill={$page.route.id.startsWith("/(app)/contribuzione") ? '-fill' : ''}
        class={"my-2"}
        href={"/contribuzione/condividi_appunti"}
        text={"Contribuzione"}
        icon={"bi-puzzle"}
        >
        </ActiveButton>

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/forum" ? 'active' : 'not-active'} 
        fill={$page.route.id == "/(app)/forum" ? '-fill' : ''}
        class={"my-2"}
        href={"/forum"}
        text={"Forum"}
        icon={"bi-chat-dots"}
        >
        </ActiveButton>

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/sfide" ? 'active' : 'not-active'} 
        fill={$page.route.id == "/(app)/sfide" ? '-fill' : ''}
        disabled={user.streak < 7}
        class={"my-2"}
        href={"/sfide"}
        text={"Sfide"}
        icon={user.streak < 7 ? "bi-lock" : "bi-award"}
        >
        </ActiveButton>

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/classifiche" ? 'active' : 'not-active'} 
        fill={$page.route.id == "/(app)/classifiche" ? '-fill' : ''}
        disabled={user.streak < 14}
        class={"my-2"}
        href={"/classifiche"}
        text={"Classifiche"}
        icon={user.streak < 14 ? "bi-lock" : "bi-trophy"}
        >
        </ActiveButton>

        {#if user.role == 'admin'}
            <hr class="mx-3">

            <ActiveButton 
            type={"navigation_link"}
            active={$page.route.id == "/(app)/test" ? 'active' : 'not-active'} 
            fill={$page.route.id == "/(app)/test" ? '-fill' : ''}
            class={"my-2"}
            href={"/test"}
            text={"Test"}
            icon={"bi-gear"}
            >
            </ActiveButton>

            <ActiveButton 
            type={"navigation_link"}
            active={$page.route.id.startsWith("/admin/courses") ? 'active' : 'not-active'}
            fill={$page.route.id.startsWith("/admin/courses") ? '-fill' : ''}
            class={"my-2"}
            href={"/admin/courses"}
            text={"Admin"}
            icon={"bi-person"}
            >
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