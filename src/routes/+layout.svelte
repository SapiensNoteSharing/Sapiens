<script>
    import { onMount } from "svelte";
    import Modal from '$lib/components/Modal.svelte';
    import FloatingButton from '$lib/components/FloatingButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { dna } from '$lib/stores';
    import '$css/global.scss';
    
    export let data;
    let user = data.user || {};
        
    let dnaModal;

    onMount(async () => {
        const bootstrap = await import('bootstrap');
    })

    function openDnaModal() {   
        dnaModal.show().then(async res => {
            if (res) {

            }
        })
    }
</script>

{#if $page.route.id == '/'}
    <div class="d-flex">
        <nav class="navbar navbar-expand-lg bg-light w-100">
            <div class="d-flex w-100 justify-content-center align-items-center">
                <!-- Sapiens Logo -->
                <img style="width: 18rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
            </div>
        </nav>
    </div>
{:else}
    <div class="d-flex sticky-top">
        <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
            <div class="d-flex w-100 align-items-center">
                <!-- Sapiens Logo -->
                <a href="/home">
                    <img class="sapiens-logo" style="height: 4rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
                </a>
                
                <div class="d-flex nav-primary flex-row justify-left align-items-center">
                    <!-- Site navigation -->
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
                </div>

                <div class="d-flex nav-secondary flex-row justify-right align-items-center me-3">
                    <NormalButton classes={"m-2"} on:click={openDnaModal}>
                        <div slot="name" class="navbar-item display-6 rounded-4 py-2 ps-3 pe-2">
                            <span class="display-6  align-middle text-dark">{user.streak || 0}</span>
                            <img class="dna-icon" style="height: 2.5rem;" src="/src/style/streak.png" alt="streak">
                        </div>
                    </NormalButton>

                    <NormalButton classes={"m-2"} on:click={openDnaModal}>
                        <div slot="name" class="navbar-item display-6 rounded-4 py-2 ps-3 pe-2">
                            <span class="display-6  align-middle text-dark">{user.balance || 0}</span>
                            <img class="dna-icon" style="height: 2.5rem;" src="/src/style/DNA.svg" alt="DNA">
                        </div>
                    </NormalButton>

                    <NormalButton active={$page.route.id == "/(app)/area_personale" ? 'active' : 'not-active'} classes={"m-2"}>
                        <div slot="name" class="navbar-item display-6 rounded-4">
                            <a href="/area_personale"><img class="d-block user-icon" src="/src/style/user.jpg" alt="account"></a>
                        </div>
                    </NormalButton>
                </div>
            </div>
        </nav>
    </div>
{/if}

<slot></slot>

<!-- DNA sequences info -->
<Modal title="Sequenze di DNA" yes="Capito" classes="bg-primary" theme="btn-outline-primary" bind:this={dnaModal}>
    Lorem ipsum dolor sit amet. Est tempora perferendis eos quia rerum a rerum laborum eum atque eligendi ut laboriosam optio 33 fugiat quae. At nihil nostrum et Quis magnam ab aliquam temporibus est ipsa reiciendis sed facilis odit aut mollitia consequatur. Aut consectetur veritatis ea adipisci ratione et iste quaerat. Ut beatae obcaecati est harum unde et galisum similique ut officia architecto sed nesciunt delectus.
</Modal>

<div class="d-flex justify-content-between footer">
    <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
        <div class="container-fluid">
            <div>
                <img class="ms-3 footer-logo" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
            </div>

            <div class="d-flex align-items-center">
                <a href="" class="me-4"><i class="icon footer-element bi bi-whatsapp"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-discord"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-instagram"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-facebook"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-twitter-x"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-linkedin"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-tiktok"></i></a>
            </div>

            <div class="d-flex">
                <span class="me-5">
                    <a class="display-6 text-decoration-none footer-element" href="#">Chi siamo</a>
                </span>
                <span class="me-5">
                    <a class="display-6 text-decoration-none footer-element" href="#">FAQ</a>
                </span>
            </div>
        </div>
    </nav>
</div>

<style lang="scss">
    @import '$css/variables.scss';
    
    .icon {
        font-size: 20px;
    }
    
    .display-6 {
       font-size: 1.4rem;
    }

    .navbar {
        border-bottom: 1px solid rgba($dark, 0.25) !important;
    }

    .sapiens-logo {
        position: relative;
        left: 200px;
        transform: translate(-50%);
    }

    .nav-primary {
        position: absolute;
        left: 400px;
    }

    .nav-secondary {
        position: absolute;
        right: 0px;
    }

    .user-icon {
        width: 3rem; 
        border-radius: 3rem;
    }

    // .navbar-item:before {
    //     content: '';
    //     position: absolute;
    //     width: 200%;
    //     height: 200%;
    //     // background: rgba($light, 0.25);
    //     background: rgba($light, 0.55);
    //     transform: translate(-100%) rotate(-60deg);
    //     filter: blur(0px);
    // }

    // .navbar-item:hover:before {
    //     content: '';
    //     width: 200%;
    //     height: 200%;
    //     background: rgba($light, 0.55);
    //     transform: translate(100%) rotate(-60deg);
    //     filter: blur(0px);
    //     position: absolute;
    //     transition: 3s;
    // }

    .dna-btn {
        background: $light;
    }

    .dna-btn::hover {
        background: $secondary !important;
    }

    .full-height {
        height: 73vh;
        margin: 0rem 5rem;
    }
    
    .title {
        font-size: 6rem;
    }
    
    .subtitle {
        font-size: 2rem;
    }
    
    .icon {
        font-size: 20px;
    }
    
    .landing-page-image {
        width: 50%;
    }
    
    .footer {
        border-top: 1px solid rgba($dark, 0.25);
    }
    
    .footer-logo {
        height: 3rem;
        filter: brightness(0);
    }
    
    .footer-element {
        color: $dark;
        opacity: 0.5;
    }
    
    .footer-element:hover {
        color: $secondary;
        transition: 0.1s;
        opacity: 1;
    }
</style>
    