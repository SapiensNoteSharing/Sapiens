<script>
    import { onMount } from "svelte";
    import Modal from '$lib/components/Modal.svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { dna } from '$lib/stores'
    import '$css/global.scss';

    export let data;
    let user = data.user || {}
    let loginModal, registerModal;
        
    let userLogin = {}
    let userRegister = {}
    let dnaModal;

    onMount(async () => {
        const bootstrap = await import('bootstrap')
    })

    function openDnaModal() {   
        dnaModal.show().then(async res => {
            if (res) {

            }
        })
    }

    function registerUser() {
        registerModal.show().then(async res => {
            if(res){
                const resp = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userRegister)
                });
                if(resp.ok) {
                    goto('/esplora_corsi')
                }
            }
        })
    }
    
    function loginUser(){
        loginModal.show().then(async res => {
            if(res){
                const resp = await fetch(`/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userLogin)
                })
                if(resp.ok){
                    goto('/esplora_corsi')
                }
            }
        })
    }
</script>

<!-- Login Modal-->
<Modal title="Accedi" yes="Accedi" classes="bg-primary border-dark" theme="btn-outline-primary" bind:this={loginModal}>
    <div class="modal-body p-4">
        <div class="col-md-12">
            <label for="validationServer01" class="form-label">Email</label>
            <div class="input-group has-validation">
                <span class="input-group-text border-dark" id="inputGroupPrepend1"><i class="bi bi-type"></i></span>
                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend1" bind:value={userLogin.email} required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                    Inserisci un'email valida
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <label for="login_password" class="form-label">Password</label>
            <div class="input-group has-validation">
                <span class="input-group-text border-dark" id="inputGroupPrepend3">#</span>
                <input type="password" class="form-control" id="login_password" bind:value={userLogin.password}>
                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                    Inserisci una password valida
                </div>
            </div>
        </div>
    </div>
</Modal>

<!-- Register Modal-->
<Modal title="Registrati" yes="Registrati" classes="bg-success border-dark" theme="btn-outline-success" xlarge bind:this={registerModal}>
    <form class="row g-3 was-validated">
        <h4 class="fs-1" id="dati_personali">Dati personali</h4>
        
        <!-- Name -->
        <div class="col-md-3">
            <label for="validationServer01" class="form-label">Nome</label>
            <div class="input-group has-validation">
                <span class="input-group-text border-dark" id="inputGroupPrepend1"><i class="bi bi-type"></i></span>
                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend1" bind:value={userRegister.name} required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                    Inserisci un nome valido
                </div>
            </div>
        </div>
        
        <!-- Surname -->
        <div class="col-md-3">
            <label for="validationServer02" class="form-label">Cognome</label>
            <div class="input-group has-validation">
                <span class="input-group-text border-dark" id="inputGroupPrepend2"><i class="bi bi-type"></i></span>
                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend2" bind:value={userRegister.surname} required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                    Inserisci un cognome valido
                </div>
            </div>
        </div>
        
        <!-- email -->
        <div class="col-md-6">
            <label for="validationServer02" class="form-label">e-mail</label>
            <div class="input-group has-validation">
                <span class="input-group-text border-dark" id="inputGroupPrepend2"><i class="bi bi-at"></i></span>
                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend2" bind:value={userRegister.email} required>
                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                    Inserisci un cognome valido
                </div>
            </div>
        </div>
        
        <div class="col-md-4">
            <label for="validationServer03" class="form-label">Stato</label>
            <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer04Feedback" bind:value={userRegister.country} required>
            <div id="validationServer04Feedback" class="invalid-feedback">
                Inserisci uno stato valido
            </div>
        </div>
        <div class="col-md-4">
            <label for="validationServer04" class="form-label">Regione</label>
            <input type="text" class="form-control is-invalid" id="validationServer04" aria-describedby="validationServer03Feedback" bind:value={userRegister.region} required>
            <div id="validationServer03Feedback" class="invalid-feedback">
                Inserisci una città valida
            </div>
        </div>
        <div class="col-md-4">
            <label for="validationServer05" class="form-label">Città</label>
            <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer03Feedback" bind:value={userRegister.city} required>
            <div id="validationServer03Feedback" class="invalid-feedback">
                Inserisci una città valida
            </div>
        </div>
        
        <h4 class="fs-1" id="dati_accademici">Dati accademici</h4>
        
        <div class="col-md-6">
            <label for="validationServer06" class="form-label">Città universitaria</label>
            <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer06Feedback" bind:value={userRegister.university_city} required>
            <div id="validationServer06Feedback" class="invalid-feedback">
                Inserisci una città valida
            </div>
        </div>
        <div class="col-md-6">
            <label for="validationServer07" class="form-label">Facoltà</label>
            <input type="text" class="form-control is-invalid" id="validationServer04" aria-describedby="validationServer07Feedback" bind:value={userRegister.faculty} required>
            <div id="validationServer07Feedback" class="invalid-feedback">
                Scegli un'opzione
            </div>
        </div>
        <div class="col-md-6">
            <label for="validationServer08" class="form-label">Tipologia di Laurea</label>
            <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer08Feedback" bind:value={userRegister.degree_type} required>
            <div id="validationServer08Feedback" class="invalid-feedback">
                Scegli un'opzione
            </div>
        </div>
        
        <!-- Password -->
        <div class="col-md-6">
            <label for="login_password" class="form-label">Password</label>
            <div class="input-group has-validation">
                <span class="input-group-text border-dark" id="inputGroupPrepend3">#</span>
                <input type="password" class="form-control" id="login_password" bind:value={userRegister.password}>
                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                    Inserisci una password valida
                </div>
            </div>
        </div>
    </form>
</Modal>

{#if $page.route.id == '/'}
    <div class="d-flex">
        <nav class="navbar navbar-expand-lg bg-light w-100">
            <div class="d-flex w-100 justify-content-center align-items-center">
                <!-- Sapiens Logo -->
                <img style="width: 20rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
            </div>
        </nav>
    </div>
{:else}
    <div class="d-flex sticky-top">
        <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom border-dark">
            <div class="d-flex w-100 justify-content-between align-items-center">
                <!-- Sapiens Logo -->
                <a href="/">
                    <img class="ms-3" style="width: 12rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
                </a>
                
                <div class="d-flex me-3 align-items-center">
                    <!-- Site navigation -->
                    {#if data.user.role == 'admin'}
                        <a class="navbar-item display-6 rounded-4 py-2 px-4 text-decoration-none" class:active={$page.route.id == "/test"} href="/test">Test</a>
                        <a class="navbar-item display-6 rounded-4 py-2 px-4 text-decoration-none" class:active={$page.route?.id?.startsWith("/admin")} href="/admin/courses">Admin</a>
                    {/if}
                    <a class="navbar-item display-6 rounded-4 py-2 px-4 text-decoration-none" class:active={$page.route.id == "/(app)/esplora_corsi"} href="/esplora_corsi">Esplora Corsi</a>
                    <a class="navbar-item display-6 rounded-4 py-2 px-4 text-decoration-none" class:active={$page.route.id == "/(app)/aula_studio"} href="/aula_studio">Aula Studio</a>
                    <a class="navbar-item display-6 rounded-4 py-2 px-4 text-decoration-none" class:active={$page.route.id == "/(app)/area_personale"} href="/area_personale">Area personale</a>
            
                    <!-- credit -->
                    <button type="button" class="navbar-item dna-btn rounded-4 py-2" on:click={openDnaModal}>
                        <span class="display-6 ps-2 align-middle text-dark">{user.balance || 0}</span>
                        <img class="dna-icon" src="/src/style/DNA.svg" alt="DNA">
                    </button>
                </div>
            </div>
        </nav>
    </div>
{/if}

<slot></slot>

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
                <a href="" class="me-4"><i class="icon footer-element bi bi-whatsapp"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-discord"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-instagram"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-facebook"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-twitter"></i></a>
                <a href="" class="me-4"><i class="icon footer-element bi bi-linkedin"></i></a>
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

    .navbar-item {
        position: relative;
        margin: .5rem .5rem .9rem .5rem !important;
        border: 1px solid $dark;
        overflow: hidden;
    }

    .navbar-item.active {
        color: $secondary;
        margin-bottom: .1rem !important;
    }
    
    .navbar-item:not(.active) {
        color: $dark;
        box-shadow: 0rem .4rem rgba($dark, 0.6);
    }
    
    .navbar-item:not(.active):hover {
        opacity: 1;
        transition: .15s;
        background: rgba($secondary, 0.25);
        margin-bottom: .5rem !important;
        box-shadow: 0rem .2rem rgba($dark, 0.6);
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

    .dna-icon {
        height: 2rem;
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
        border-top: 1px solid $dark;
    }
    
    .footer-logo {
        width: 12rem;
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
    