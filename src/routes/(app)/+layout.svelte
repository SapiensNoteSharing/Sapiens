<script>
    import { onMount } from "svelte";

    import Modal from '$lib/components/Modal.svelte';
    import { page } from '$app/stores';
    import { dna } from '$lib/stores'
    import Sidebar from "$lib/components/Sidebar.svelte";

    export let data;
    let user = data.user

    let dnaModal;

    function openDnaModal() {
        dnaModal.show().then(async res => {
            if (res) {

            }
        })
    }
</script>

<div class="d-flex sticky-top">
    <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom border-dark">
        <div class="d-flex w-100 justify-content-between align-items-center">
            <!-- Sapiens Logo -->
            <img class="ms-3" style="width: 12rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">

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

                <!-- credit -->
                <span class="display-6 text-dark me-2">{user.balance || 0}</span>
                <button type="button" class="me-3 p-2 btn btn-light position-relative" on:click={openDnaModal}>
                    <img style="width: 2.5rem;" src="/src/style/DNA.svg" alt="DNA">
                </button>
            </div>
        </div>
    </nav>
</div>

<div class="d-flex h-100 align-self-stretch">
    <Sidebar courses={data.courses} />

    <div class="flex-grow-1 position-relative">
        <slot></slot>
    </div>
</div>

<!-- DNA sequences info -->
<Modal title="Sequenze di DNA" yes="Capito" classes="bg-primary border-dark" theme="btn-outline-primary" bind:this={dnaModal}>
    Lorem ipsum dolor sit amet. Est tempora perferendis eos quia rerum a rerum laborum eum atque eligendi ut laboriosam optio 33 fugiat quae. At nihil nostrum et Quis magnam ab aliquam temporibus est ipsa reiciendis sed facilis odit aut mollitia consequatur. Aut consectetur veritatis ea adipisci ratione et iste quaerat. Ut beatae obcaecati est harum unde et galisum similique ut officia architecto sed nesciunt delectus.
</Modal>

<div class="d-flex justify-content-between footer">
    <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
        <div class="container-fluid">
            <div>
                <img class="ms-3 footer-logo" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
            </div>

            <div class="d-flex align-items-center">
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
