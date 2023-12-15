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

    let pageTitle
    function setTitle() {
        pageTitle = $page.route.id.split('/').pop()
        pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
    }

    $: $page.route.id && setTitle()
</script>

<div class="page">
    {#if $page.route.id == '/'}
        <div class="d-flex">
            <nav class="navbar navbar-expand-lg bg-light w-100">
                <div class="d-flex w-100 justify-content-center align-items-center">
                    <img style="width: 18rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
                </div>
            </nav>
        </div>
    {:else}
        <div class="d-flex">
            <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
                <div class="d-flex w-100 align-items-center">
                    <!-- Sapiens Logo -->
                    <a href="/home">
                        <img class="sapiens-logo" style="height: 4rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
                    </a>
                    
                    <h2 class="nav-primary display-3 text-decoration-none align-self-center m-0 ms-4">{pageTitle}</h2>

                    <div class="d-flex nav-secondary flex-row justify-right align-items-center me-3">
                        <NormalButton classes={"m-2"}>
                            <div slot="name" class="navbar-item display-6 rounded-4 py-2 px-3">
                                <span class="display-6  align-middle text-dark">{user.league_position || 'n'}°</span>
                                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/league.svg" alt="league">
                            </div>
                        </NormalButton>

                        <NormalButton classes={"m-2"}>
                            <div slot="name" class="display-6 rounded-4 py-2 px-3">
                                <span class="display-6  align-middle text-dark">{user.streak || 0}</span>
                                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/streak.png" alt="streak">
                            </div>
                        </NormalButton>

                        <NormalButton classes={"m-2"} on:click={openDnaModal}>
                            <div slot="name" class="display-6 rounded-4 py-2 px-3">
                                <span class="display-6  align-middle text-dark">{user.balance || 0}</span>
                                <img class="dna-icon" style="height: 2.5rem;" src="/src/style/DNA.svg" alt="DNA">
                            </div>
                        </NormalButton>

                        <NormalButton active={$page.route.id == "/(app)/area_personale" ? 'active' : 'not-active'} classes={"m-2"}>
                            <div slot="name" class="display-6 rounded-4">
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
        overflow-y: scroll;
        border-bottom: 1px solid rgba($dark, 0.25) !important;
    }

    .sapiens-logo {
        position: relative;
        left: 150px;
        transform: translate(-50%);
    }

    .nav-primary {
        position: absolute;
        left: 300px;
    }

    .nav-secondary {
        position: absolute;
        right: 0px;
    }

    .user-icon {
        width: 3rem; 
        border-radius: 3rem;
    }

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
    