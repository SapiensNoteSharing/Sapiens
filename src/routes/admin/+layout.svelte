<script>
import { page } from '$app/stores'


    export let data;


</script>




<div>
    <div class="d-flex sticky-top">
        <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom border-dark">
            <div class="d-flex w-100 justify-content-between align-items-center">
                <!-- Sapiens Logo -->
                <img class="ms-3" style="width: 18rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
    
                <div class="d-flex me-3 align-items-center">
                    <!-- Site navigation -->
                    {#if data.user.role == 'admin'}
                    <span class="me-5">
                        <a class="display-6 text-decoration-none navbar_page" class:active={$page.route?.id?.startsWith("/admin")} href="/admin/courses">Admin</a>
                    </span>
                    {/if}
                    <span class="me-5">
                        <a class="display-6 text-decoration-none navbar_page" class:active={$page.route.id == "/(app)/esplora_corsi"} href="/esplora_corsi">Esplora Corsi</a>
                    </span>
                    <span class="me-5">
                        <a class="display-6 text-decoration-none navbar_page" class:active={$page.route.id == "/(app)/aula_studio"} href="/aula_studio">Aula Studio</a>
                    </span>
                    <span class="me-5">
                        <a class="display-6 text-decoration-none navbar_page" class:active={$page.route.id == "/(app)/area_personale"} href="/area_personale">Area personale</a>
                    </span>
    
                </div>
            </div>
        </nav>
    </div>

    <div class="m-4">

        <slot></slot>
    </div>

    <div class="footer">
        <nav class="navbar navbar-expand-lg bg-light d-flex justify-content-between w-100 border-bottom">
            <div>        
                <img class="ms-3 footer-logo" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
            </div>

            <div class="d-flex">
                <a href="" class="me-4"><i class="icon footer_element bi bi-whatsapp"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-discord"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-instagram"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-facebook"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-twitter"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-linkedin"></i></a>
            </div>

            <div class="d-flex">
                <span class="me-5">
                    <a class="display-6 text-decoration-none footer_element" href="#">Chi siamo</a>
                    </span>
                <span class="me-5">
                    <a class="display-6 text-decoration-none footer_element" href="#">FAQ</a>
                </span>
            </div>
        </nav>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';
    .navbar {
        height: 100px;
    }
    .sidebar {
        width: 25%;
        min-height: 82vh;
        background-color: $primary;
        border-right: 1px solid $dark;
    }
    
    .icon {
        font-size: 20px;
    }
    
    .navbar_page.active {
        color: $secondary;
    }
    
    .navbar_page:not(.active) {
        color: $dark;
        opacity: 0.5;
    }
    
    .navbar_page:not(.active):hover {
        opacity: 1;
        transition: 0.3s;
    }
    
    .footer {
        border-top: 1px solid $dark;
    }
    
    .footer-logo {
        width: 12rem;
        filter: brightness(0);
    }
    
    .footer_element {
        color: $dark;
        opacity: 0.5;
    }
    
    .footer_element:hover {
        color: $secondary;
        transition: 0.1s;
        opacity: 1;
    }
</style>