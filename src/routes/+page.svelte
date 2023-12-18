<script>
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let accessMode = "login";
    let userLogin = {}
    let userRegister = {}

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

    let step = 1;
    let first_progress_bar = 0;
    let second_progress_bar = 0;

    function second_step() {
        step = 2;
        first_progress_bar = 100;
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
                    <label for="validationLoginEmail" class="form-label"></label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text" id="inputGroupPrepend1"><i class="bi bi-at"></i></span>
                        <input type="text" placeholder="E-mail" class="fs-2 form-control border-dark" id="validationLoginEmail" aria-describedby="inputGroupPrepend1" bind:value={userLogin.email} required>
                        <div id="validationLoginEmailFeedback" class="invalid-feedback">
                            Inserisci un'email valida
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-3">
                    <label for="validationLoginPassword" class="form-label"></label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text" id="inputGroupPrepend2"><i class="bi bi-shield-lock-fill"></i></span>
                        <input type="password" placeholder="Password" class="fs-2 form-control border-dark" id="validationLoginPassword" bind:value={userLogin.password} required>
                        <div id="validationLoginPasswordFeedback" class="invalid-feedback">
                            Inserisci una password valida
                        </div>
                    </div>
                </div>
                <p class="display-6 text-dark">Hai dimenticato la password? <a href="" class="text-dark">Recuperala</a></p>

                <button type="button" class="fs-2 login-btn btn text-dark px-4 py-2 my-4" on:click={loginUser}>
                    Accedi
                </button>

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
                        
                        <div class="field col-md-6 ps-0">
                            <label for="validationRegistrationName" class="form-label">Nome</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text" id="inputGroupPrepend3"><i class="bi bi-type"></i></span>
                                <input type="text" class="form-control" id="validationRegistrationName" aria-describedby="inputGroupPrepend3" bind:value={userRegister.name} required>
                                <div class="invalid-feedback">
                                    Inserisci un nome
                                </div>
                            </div>
                        </div>
                        <div class="field col-md-6 pe-0">
                            <label for="validationRegistrationLastName" class="form-label">Cognome</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text" id="inputGroupPrepend4"><i class="bi bi-type"></i></span>
                                <input type="text" class="form-control" id="validationRegistrationLastName" aria-describedby="inputGroupPrepend4" bind:value={userRegister.surname} required>
                                <div class="invalid-feedback">
                                    Inserisci un cognome
                                </div>
                            </div>
                        </div>
                        
                        <div class="field col-md-6 ps-0">
                            <label for="validationRegistrationEmail" class="form-label">e-mail</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text" id="inputGroupPrepend5"><i class="bi bi-at"></i></span>
                                <input type="text" class="form-control" id="validationRegistrationEmail" aria-describedby="inputGroupPrepend5" bind:value={userRegister.email} required>
                                <div class="invalid-feedback">
                                    Inserisci la tua email
                                </div>
                                <div class="valid-feedback">
                                    email valida
                                </div>
                            </div>
                        </div>
                        <div class="field col-md-6 pe-0">
                            <label for="validationRegistrationPassword" class="form-label">Password</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text" id="inputGroupPrepend6">#</span>
                                <input type="password" class="form-control" id="validationRegistrationPassword" aria-describedby="inputGroupPrepend6" bind:value={userRegister.password} required>
                                <div class="invalid-feedback">
                                    Inserisci una password valida
                                </div>
                            </div>
                        </div>
                        
                        <div class="field col-md-3 ps-0">
                            <label for="validationServer03" class="form-label">Stato</label>
                            <input type="text" class="form-control" id="validationServer03" aria-describedby="validationServer04Feedback" bind:value={userRegister.country} required>
                            <div class="invalid-feedback">
                                Inserisci uno stato valido
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="validationServer04" class="form-label">Regione</label>
                            <input type="text" class="form-control" id="validationServer04" aria-describedby="validationServer03Feedback" bind:value={userRegister.region} required>
                            <div class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="validationServer05" class="form-label">Città</label>
                            <input type="text" class="form-control" id="validationServer05" aria-describedby="validationServer03Feedback" bind:value={userRegister.city} required>
                            <div class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                        <button class="submit-btn col-md-1 pe-0" on:click={second_step} type="submit">
                            <i style="font-size: 2.3rem; position: relative; top: -2px;" class="bi bi-arrow-right-square next-step-icon"></i>
                        </button>
					</form>
				{:else if step == 2}
					<form class="row g-3 needs-validation m-0 align-items-center" novalidate>
                        <h2 class="display-3 my-4 ps-0" id="dati_accademici">Dati accademici</h2>
                        
                        <div class="field col-md-3 ps-0">
                            <label for="validationServer06" class="form-label">Regione</label>
                            <input type="text" class="form-control" id="validationServer06" aria-describedby="validationServer06Feedback" bind:value={userRegister.university_region} required>
                            <div id="validationServer06Feedback" class="invalid-feedback">
                                Inserisci una regione valida
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="validationServer07" class="form-label">Città universitaria</label>
                            <input type="text" class="form-control" id="validationServer07" aria-describedby="validationServer07Feedback" bind:value={userRegister.university_city} required>
                            <div id="validationServer07Feedback" class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                        <div class="field col-md-5 pe-0">
                            <label for="validationServer08" class="form-label">Nome Università</label>
                            <input type="text" class="form-control" id="validationServer08" aria-describedby="validationServer08Feedback" bind:value={userRegister.university_name} required>
                            <div id="validationServer08Feedback" class="invalid-feedback">
                                Inserisci un'Università valida
                            </div>
                        </div>

                        <div class="field col-md-5 ps-0">
                            <label for="validationServer09" class="form-label">Nome facoltà</label>
                            <input type="text" class="form-control" id="validationServer09" aria-describedby="validationServer09Feedback" bind:value={userRegister.faculty} required>
                            <div id="validationServer09Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="validationServer10" class="form-label">Tipologia di Laurea</label>
                            <input type="text" class="form-control" id="validationServer10" aria-describedby="validationServer10Feedback" bind:value={userRegister.degree_type} required>
                            <div id="validationServer10Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>
                        <div class="field col-md-3 pe-0">
                            <label for="validationServer11" class="form-label">Codice facoltà</label>
                            <input type="text" class="form-control" id="validationServer11" aria-describedby="validationServer11Feedback" bind:value={userRegister.faculty_code} required>
                            <div id="validationServer11Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>
                        <button class="submit-btn col-md-1 pe-0" on:click={first_step}>
                            <i style="font-size: 2.3rem; position: relative; top: 2px;" class="bi bi-arrow-left-square next-step-icon"></i>
                        </button>

						<button class="submit-btn col-md-1 pe-0" type="submit" on:click={userRegister}>
                            <i style="font-size: 2.3rem; position: relative; top: 2px;" class="bi bi-arrow-right-square next-step-icon"></i>
                        </button>
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
        font-size: 1rem;
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
		cursor: pointer;
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
        transition: .15s;

        &:hover {
            color: $primary;
        }
    }

    .btn {
        border-radius: 1rem;
    }

    .login-btn {
        width: 100%;
        background: $primary;
        transition: .15s;
        
        &:hover {
            background: darken($primary, 10%);
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