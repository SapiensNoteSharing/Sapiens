<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let accessMode = "login";
    let userLogin = {}
    let userRegister = {}
    let validated = false;

	onMount(() => {
		const forms = document.querySelectorAll('.needs-validation');

		Array.from(forms).forEach(form => {
			form.addEventListener('submit', event => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

                second_step()
                form.classList.add('was-validated');
			}, false);
		});
	});

    async function loginUser() {
        const resp = await fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        })

        if (resp.ok) {
            goto('/home');
        }
    }

    async function registerUser() {
        if (checkValidity) {
            const resp = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRegister)
            });

            if (resp.ok) {
                goto('/home');
            }
        }
    }

    function checkValidity() {
        validated = true;

        if (
            checkNameValidity(userRegister.name) &&
            checkLastNameValidity(userRegister.surname) &&
            checkEmailValidity(userRegister.email) &&
            checkPasswordValidity(userRegister.password) == 1
        ) 
            return true;
        else
            return false;
    }

    function checkNameValidity(name) {
        if (name?.match(/^[a-zA-Z]+$/))
            return true;
        else
            return false;
    }

    function checkLastNameValidity(surname) {
        if (surname?.match(/^[a-zA-Z]+$/))
            return true;
        else
            return false;
    }

    function checkEmailValidity(email) {
        if (email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
            return true;
        else
            return false;
    }

    function checkPasswordValidity(password) {
        if (password?.match(/^.{8,32}$/g))
            return 1;
        else if (password?.length > 32)
            return -2;
        else
            return -1;
    }

    let step = 1;
    let first_progress_bar = 0;
    let second_progress_bar = 0;

    function second_step() {
        if (checkValidity()) {
            step = 2;
            first_progress_bar = 100;
        }
    }

    function first_step() {
        step = 1;
        first_progress_bar = 0;
    }
</script>

<div class="base-layer mt-3">
    <div class="full-height d-flex justify-content-evenly align-items-center">
        {#if accessMode == "login"}
            <div class="login-box d-flex flex-column p-5">
                <h2 class="display-2 text-dark m-0 mb-2">Accedi</h2>
                <span class="display-6 text-dark m-0">Non hai un account? <span class="text-decoration-underline text-dark register-link" on:click={() => accessMode = "registration"}>Registrati</span></span>

                <div class="col-md-12">
                    <label for="LoginEmail" class="form-label"></label>
                    <div class="input-group has-validation" id="show_hide_password">
                        <span class="input-icon-label input-group-text"><i class="bi bi-at"></i></span>
                        <input placeholder="E-mail" class="fs-2 form-control border-dark" bind:value={userLogin.email} required>
                        <div id="validationLoginEmailFeedback" class="invalid-feedback">
                            Inserisci un'email valida
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-3">
                    <label for="LoginPassword" class="form-label"></label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text"><i class="bi bi-shield-lock-fill"></i></span>
                        <input type="password" placeholder="Password" class="fs-2 form-control border-dark" bind:value={userLogin.password} required>
                        <div class="input-group-addon">
                            <i class="bi bi-eye-slash text-dark display-3" aria-hidden="true"></i>
                        </div>
                        <div id="validationLoginPasswordFeedback" class="invalid-feedback">
                            Inserisci una password valida
                        </div>
                    </div>
                </div>
                <p class="display-6 text-dark">Hai dimenticato la password? <a href="" class="text-dark">Recuperala</a></p>

                <NormalButton classes={"my-4 text-center w-100"}>
                    <div slot="name">
                        <button type="button" class="btn bg-primary w-100 text-dark fs-2 rounded-3" on:click={loginUser}>
                            Accedi
                        </button>
                    </div>
                </NormalButton>

                <div class="hr-box">
                    <span class="hr-text px-2 bg-light display-6 text-dark">
                        oppure accedi con
                    </span>
                </div>

                <div class="d-flex flex-row justify-content-between align-items-center">
                    <button type="button" id="google-btn" class="btn d-flex flex-row justify-content-center align-items-center text-dark fs-2 px-4 py-2 mt-5" on:click={loginUser}>
                        <i id="google-icon" class="bi bi-google me-3"></i>
                        <span class="align-middle">Google</span>
                    </button>
                    
                    <button type="button" id="facebook-btn" class="btn d-flex flex-row justify-content-center align-items-center text-dark fs-2 px-4 py-2 mt-5" on:click={loginUser}>
                        <i id="facebook-icon" class="bi bi-facebook me-3"></i>
                        <span class="align-middle">Facebook</span>
                    </button>   
                </div>
            </div>
        {:else}
            <div class="registration-box d-flex flex-column p-5">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <h2 class="display-2 text-dark m-0 mb-2">Registrati</h2>

                    <div class="d-flex flex-row">
                        <div class="progress-bar me-3">
                            <div style="--first_progress_bar:{first_progress_bar}" class="first-step bg-primary"></div>
                        </div>
                        <div class="progress-bar">
                            <div style="--second_progress_bar:{second_progress_bar}" class="second-step bg-primary"></div>
                        </div>
                    </div>
                </div>
                <span class="display-6 text-dark m-0">Hai già un account? <span class="text-decoration-underline text-dark login-link" on:click={() => accessMode = "login"}>Effettua il login</span></span>
                
				{#if step == 1}
                	<form class="row g-3 needs-validation m-0 align-items-center" novalidate>
                        <h2 class="display-3 my-4 ps-0" id="dati_personali">Dati personali</h2>
                        
                        <div class="field col-md-6 ps-0" style="margin-bottom: {validated ? (checkNameValidity(userRegister.name) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationName" class="form-label">Nome *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-type"></i></span>
                                <input class="form-control {validated ? (checkNameValidity(userRegister.name) ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.name} required>
                                <div class="invalid-feedback">
                                    Campo obbligatorio
                                </div>
                            </div>
                        </div>
                        <div class="field col-md-6 pe-0" style="margin-bottom: {validated ? (checkLastNameValidity(userRegister.surname) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationLastName" class="form-label">Cognome *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-type"></i></span>
                                <input class="form-control {validated ? (checkLastNameValidity(userRegister.surname) ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.surname} required>
                                <div class="invalid-feedback">
                                    Campo obbligatorio
                                </div>
                            </div>
                        </div>
                        
                        <div class="field col-md-6 ps-0" style="margin-bottom: {validated ? (checkEmailValidity(userRegister.email) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationEmail" class="form-label">e-mail *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-at"></i></span>
                                <input class="form-control {validated ? (checkEmailValidity(userRegister.email) ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.email} required>
                                <div class="invalid-feedback">
                                    Email non valida
                                </div>
                            </div>
                        </div>
                        <div class="field col-md-6 pe-0" style="margin-bottom: {validated ? (checkPasswordValidity(userRegister.password) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationPassword" class="form-label">Password *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text">#</span>
                                <input type="password" class="form-control {validated ? (checkPasswordValidity(userRegister.password) == 1 ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.password} required>
                                <div class="invalid-feedback">
                                    {#if checkPasswordValidity(userRegister.password) == -1}
                                        La password deve contenere almeno 8 caratteri
                                    {:else if checkPasswordValidity(userRegister.password) == -2}
                                        La password deve contenere al massimo 32 caratteri
                                    {/if}
                                </div>
                            </div>
                        </div>
                        
                        <div class="field col-md-3 ps-0">
                            <label for="RegistrationBirthCountry" class="form-label">Stato</label>
                            <input class="form-control" bind:value={userRegister.country}>
                            <div class="invalid-feedback">
                                Inserisci uno stato valido
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="RegistrationBirthRegion" class="form-label">Regione</label>
                            <input class="form-control" bind:value={userRegister.region}>
                            <div class="invalid-feedback">
                                Inserisci una regione valida
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="RegistrationBirthCity" class="form-label">Città</label>
                            <input class="form-control" bind:value={userRegister.city}>
                            <div class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                        <button class="submit-btn col-md-1 pe-0" on:click={second_step} type="submit">
                            <i style="font-size: 2.3rem; position: relative; top: -2px;" class="bi bi-arrow-right-square next-step-icon"></i>
                        </button>
					</form>
                    <p class="m-0 mt-3">* Campi obbligatori</p>
				{:else if step == 2}
					<form class="row g-3 needs-validation m-0 align-items-center" novalidate>
                        <h2 class="display-3 mt-4 mb-2 ps-0" id="dati_accademici">Dati accademici</h2>
                        <p class="p-0 m-0 mb-5">Questi dati non sono obbligatori, ma ci aiutano a suggerirti corsi relativi al tuo percorso di studi.</p>
                        
                        <div class="field col-md-3 ps-0">
                            <label for="registrationUniversityRegion" class="form-label">Regione</label>
                            <input class="form-control" bind:value={userRegister.university_region}>
                            <div id="validationServer06Feedback" class="invalid-feedback">
                                Inserisci una regione valida
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="registrationUniversityCity" class="form-label">Città universitaria</label>
                            <input class="form-control" bind:value={userRegister.university_city}>
                            <div id="validationServer07Feedback" class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                        <div class="field col-md-5 pe-0">
                            <label for="registrationUniversityName" class="form-label">Nome Università</label>
                            <input class="form-control" bind:value={userRegister.university_name}>
                            <div id="validationServer08Feedback" class="invalid-feedback">
                                Inserisci un'Università valida
                            </div>
                        </div>

                        <div class="field col-md-5 ps-0">
                            <label for="registrationFacultyName" class="form-label">Nome facoltà</label>
                            <input class="form-control" bind:value={userRegister.faculty_name}>
                            <div id="validationServer09Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="registrationFacultyType" class="form-label">Tipologia di Laurea</label>
                            <input class="form-control" bind:value={userRegister.faculty_type}>
                            <div id="validationServer10Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>
                        <div class="field col-md-3 pe-0">
                            <label for="registrationFacultyCode" class="form-label">Codice facoltà</label>
                            <input class="form-control" bind:value={userRegister.faculty_code}>
                            <div id="validationServer11Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>

                        <div class="d-flex d-row justify-content-between align-items-center">
                            <button class="submit-btn p-0 m-0" on:click={first_step}>
                                <i style="font-size: 2.3rem;" class="bi bi-arrow-left-square next-step-icon"></i>
                            </button>
                            
                            <NormalButton classes={"my-4 text-center p-0 m-0"}>
                                <div slot="name">
                                    <button type="button" class="btn bg-secondary w-100 text-dark fs-2 rounded-3 m-0" on:click={registerUser}>
                                        Registrati
                                    </button>
                                </div>
                            </NormalButton>

                            <button class="submit-btn p-0 m-0 text-light no-cursor" style="cursor: default !important;">
                                <i style="font-size: 2.3rem;" class="bi bi-arrow-left-square"></i>
                            </button>
                        </div>
					</form>
				{/if}
            </div>
        {/if}

        <!-- <img src="/src/style/Sapiens Logo Cartoon.png" alt="" class="landing-page-image m-5"> -->
    </div>

    <div class="presentation-item d-flex justify-content-evenly align-items-center bg-primary">
        <div class="d-flex flex-column">
            <h1 class="title text-dark">Studia</h1>
            <h1 class="subtitle text-dark">Sfoglia tra decine di corsi universitari messi a disposizione dai tuoi colleghi</h1>
        </div>
        <img src="/src/style/landing page.png" alt="" class="presentation-image">
    </div>
    
    <div class="presentation-item d-flex justify-content-evenly align-items-center bg-light">
        <img src="/src/style/landing page.png" alt="" class="presentation-image">
        <div class="d-flex flex-column">
            <h1 class="title text-dark">Contribuisci</h1>
            <h1 class="subtitle text-dark">Aiutaci a migliorare Sapiens condividendo i tuoi appunti e ricevendo in cambio grandi ricompense!</h1>
        </div>
    </div>
    
    <div class="presentation-item d-flex justify-content-evenly align-items-center bg-secondary">
        <div class="d-flex flex-column">
            <h1 class="title text-dark">Valuta</h1>
            <h1 class="subtitle text-dark">Recensisci i contenuti proposti: vogliamo sapereno cosa ne pensi!</h1>
        </div>
        <img src="/src/style/landing page.png" alt="" class="presentation-image">
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .base-layer {
        background: $light;
    }

    .full-height {
        // height: 80vh;
        margin: 0rem 2rem 2rem 2rem;
    }

    .input-icon-label {
        font-size: 1.25rem;
        background: rgba($dark, .15);
        border: 1px solid $dark;
    }

    .login-box, .registration-box {
        padding: 2rem;
        border: 1px solid rgba($dark, .25);
        border-radius: 1rem;
    }

    .login-box {
        min-width: 40%;
        width: 40%;
    }

    .registration-box {
        min-width: 60%;
        width: 60%;
    }

    .register-link, .login-link {
        cursor: pointer;
    }

    .input-group {
        border-radius: .4rem;
    }

    .field {
        margin: 0px;
        margin-bottom: 1rem;
    }

	.form-control {
		border: 1px solid $dark;

		&::placeholder {
			color: $dark;
        	opacity: .5;
		}
	}

    .presentation-item {
        height: 80vh;
        border: 1px solid $dark;
        padding: 0rem 5rem;
    }

    .presentation-image {
        width: 50%;
    }

    .hr-box {
        width: 100%; 
        border-bottom: 1px solid $dark; 
        text-align: center;
    }

    .hr-text {
        font-size: 1rem;
        position: relative;
        top: .6rem;
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

	.submit-btn {
		display: inline-block;
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		outline: inherit;
	}
    
    .landing-page-image {
        max-width: 25%;
    }
    
    .footer {
        border-top: 1px solid $dark;
    }

    .progress-bar {
        width: 10rem;
        border: 1px solid $dark;
        border-radius: 1rem;
        background: $light;
        height: 1rem;
    }

    .first-step, .second-step {
        border: 0px;
        border-radius: 1rem;
        background: $primary;
        height: 1rem;
        transition: .3s;
    }

    .first-step {
        width: calc(var(--first_progress_bar) * 1%);
    }

    .second-step {
        width: calc(var(--second_progress_bar) * 1%);
    }

    .next-step-icon {
		cursor: pointer;
        transition: .15s;

        &:hover {
            color: $primary;
        }
    }

    #google-btn, #facebook-btn {
        width: 40%;
    }
    
    #google-btn {
        border: solid 1px hsl(5, 82%, 56%) !important;
        
        &:hover {
            background: hsl(5, 82%, 90%);
        }
    }

    #facebook-btn {
        border: solid 1px hsl(217, 100%, 52%) !important;
        
        &:hover {
            background: hsl(217, 100%, 90%);
        }
    }

    #google-icon {
        color: hsl(5, 82%, 56%)
    }

    #facebook-icon {
        color: hsl(217, 100%, 52%)
    }
</style>