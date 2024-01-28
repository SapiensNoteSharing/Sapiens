<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Svelecte from 'svelecte'

    let accessMode = "login";
    let userLogin = {}
    let userRegister = {}
    let validated = false;

    let countries = [
        "Italia",
        "Francia",
        "Germania"
    ]
    
    let regions = [
        "Toscana",
        "Puglia"
    ]

    let university_regions = [...regions];

    let cities = [
        "Grosseto",
        "Firenze",
        "Livorno",
        "Arezzo"
    ]

    let university_cities = [...cities];
    let university_names = ["Università degli Studi di Firenze"]
    let faculties_names = [
        "Ingegneria informatica",
        "Ingegneria gestionale",
        "Ingegneria elettronica",
        "Ingegneria civile",
    ]

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
            goto('/home')
        }
    }

    async function registerUser() {
        if (checkValidity()) {
            const resp = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRegister)
            });
            if (resp.ok) {
                goto('/home')
            }
        }
    }

    function checkValidity() {
        validated = true;

        if (
            checkNameValidity(userRegister.name) &&
            checkLastNameValidity(userRegister.surname) &&
            checkUsernameValidity(userRegister.username) == 1 &&
            checkEmailValidity(userRegister.email) == 1 &&
            checkPasswordValidity(userRegister.password) == 1
        ) 
            return true;
        else
            return false;
    }

    function checkNameValidity(name) {
        return name?.match(/^[a-zA-Z]+$/)
    }

    function checkLastNameValidity(surname) {
        return surname?.match(/^[a-zA-Z]+$/)
    }

    function checkUsernameValidity(username) {
        // se l'username è già stato preso restituire -1
        if (username?.match(/^[a-zA-Z0-9]+$/))
            return 1;
        else
            return -2;
    }

    function checkEmailValidity(email) {
        if (email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
            return 1;
        else if (email?.length > 0)
            return -1;
        else 
            return -2;
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

<div class="base-layer">
    <nav class="navbar navbar-expand-lg bg-light w-100">
        <div class="d-flex w-100 justify-content-center align-items-center">
            <img style="width: 14rem;" src="/src/style/sapiens_logo.svg" alt="Sapiens-Title">
        </div>
    </nav>

    <div class="full-height d-flex justify-content-evenly align-items-center mt-3">
        {#if accessMode == "login"}
            <div class="login-box d-flex flex-column p-5">
                <h2 class="display-2 text-dark m-0 mb-2">Accedi</h2>
                <span class="display-6 text-dark m-0">Non hai un account? <span class="text-decoration-underline text-dark register-link" on:click={() => accessMode = "registration"}>Registrati</span></span>

                <div class="col-md-12">
                    <label for="LoginEmail" class="form-label"></label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text"><i class="bi bi-at"></i></span>
                        <input placeholder="E-mail o username" class="form-control border-dark" bind:value={userLogin.email} required>
                        <div id="validationLoginEmailFeedback" class="invalid-feedback">
                            Non esiste nessun account collegato a questa Email. Riprova o vai alla registrazione
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-3">
                    <label for="LoginPassword" class="form-label"></label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text"><i class="bi bi-shield-lock-fill"></i></span>
                        <input type="password" placeholder="Password" class="form-control border-dark" style="border-radius: 0rem 0.4rem 0.4rem 0rem; z-index: 1;" bind:value={userLogin.password} required>
                        <i class="bi bi-eye-slash text-dark display-3 password-show-btn"></i>
                        <div id="validationLoginPasswordFeedback" class="invalid-feedback">
                            La password non è corretta. Riprova
                        </div>
                    </div>
                </div>
                <p class="display-6 text-dark">Hai dimenticato la password? <a href="" class="text-dark">Recuperala</a></p>

                <NormalButton class={"my-4 text-center w-100"}>
                    <div slot="name">
                        <button type="button" class="btn btn-primary w-100 text-dark fs-2 rounded-3" on:click={loginUser}>
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
                                <input class="form-control {validated ? (checkNameValidity(userRegister.name) ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.name}>
                                <div class="invalid-feedback">
                                    Campo obbligatorio
                                </div>
                            </div>
                        </div>
                        <div class="field col-md-6 pe-0" style="margin-bottom: {validated ? (checkLastNameValidity(userRegister.surname) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationLastName" class="form-label">Cognome *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-type"></i></span>
                                <input class="form-control {validated ? (checkLastNameValidity(userRegister.surname) ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.surname}>
                                <div class="invalid-feedback">
                                    Campo obbligatorio
                                </div>
                            </div>
                        </div>
                        
                        <div class="field col-md-4 ps-0" style="margin-bottom: {validated ? (checkUsernameValidity(userRegister.username) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationUsername" class="form-label">Username *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-person-fill"></i></span>
                                <input class="form-control {validated ? (checkUsernameValidity(userRegister.username) == 1 ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.username}>
                                <div class="invalid-feedback">
                                    {#if checkUsernameValidity(userRegister.username) == -1}
                                        Nome utente già esistente
                                    {:else if checkUsernameValidity(userRegister.username) == -2}
                                        Campo obbligatorio
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="field col-md-4" style="margin-bottom: {validated ? (checkEmailValidity(userRegister.email) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationEmail" class="form-label">e-mail *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-at"></i></span>
                                <input class="form-control {validated ? (checkEmailValidity(userRegister.email) == 1 ? "is-valid" : "is-invalid") : ""}" bind:value={userRegister.email}>
                                <div class="invalid-feedback">
                                    {#if checkEmailValidity(userRegister.email) == -1}
                                        Email non valida
                                    {:else if checkEmailValidity(userRegister.email) == -2}
                                        Campo obbligatorio
                                    {/if}
                                </div>
                            </div>
                        </div>
                        <div class="field col-md-4 pe-0" style="margin-bottom: {validated ? (checkPasswordValidity(userRegister.password) == 1 ? "2.55" : "1") : "2.55"}rem;">
                            <label for="RegistrationPassword" class="form-label">Password *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-shield-lock-fill"></i></span>
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
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                                <Svelecte
                                placeholder="Seleziona stato"
                                fetch="/api/states"
                                valueAsObject
                                valueField="_id"
                                labelField="name"
                                autocomplete="off"
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.country}
                                />
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="RegistrationBirthRegion" class="form-label">Regione</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                                <Svelecte
                                placeholder="Seleziona regione"
                                fetch="/api/regions?s={userRegister.country?._id}"
                                valueAsObject
                                valueField="_id"
                                labelField="name"
                                autocomplete="off"
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.region}
                                />
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="RegistrationBirthCity" class="form-label">Città</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                                <Svelecte
                                placeholder="Seleziona provincia"
                                fetch="/api/provinces?s={userRegister.country?._id}&r={userRegister.region?._id}"
                                valueAsObject
                                valueField="_id"
                                labelField="name"
                                autocomplete="off"
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.city}
                                />
                            </div>
                        </div>

                        <button class="submit-btn col-md-1 pe-0" style="width: fit-content" on:click={second_step} type="submit">
                            <i style="font-size: 2.6rem; position: relative; top: -2px;" class="bi bi-arrow-right-square next-step-icon"></i>
                        </button>
					</form>
                    <p class="m-0 mt-3">* Campi obbligatori</p>
				{:else if step == 2}
					<form class="row g-3 needs-validation m-0 align-items-center" novalidate>
                        <h2 class="display-3 mt-4 mb-2 ps-0" id="dati_accademici">Dati accademici</h2>
                        <p class="p-0 m-0 mb-5">Puoi inserire questi dati anche in seguito: ci aiuteranno a suggerirti corsi relativi al tuo percorso di studi.</p>
                        
                        <div class="field col-md-4 ps-0">
                            <label for="registrationUniversityName" class="form-label">Nome Università</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                                <Svelecte
                                placeholder="Seleziona Università"
                                options={university_names}
                                labelAsValue
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.university_name}
                                />
                            </div>
                        </div>
                        <div class="field col-md-4">
                            <label for="registrationFacultyName" class="form-label">Nome facoltà</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                                <Svelecte
                                placeholder="Seleziona facoltà"
                                options={faculties_names}
                                labelAsValue
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.faculty_name}
                                />
                            </div>
                        </div>
                        <div class="field col-md-4 pe-0">
                            <label for="registrationFacultyType" class="form-label">Tipologia di Laurea</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                                <Svelecte
                                placeholder="Scegli tipologia"
                                options={["Triennale", "Magistrale", "A ciclo unico"]}
                                labelAsValue
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.faculty_type}
                                />
                            </div>
                        </div>

                        <div class="field col-md-5 ps-0">
                            <label for="year" class="form-label">Anno</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-person-badge"></i></span>
                                <Svelecte
                                placeholder="Scegli anno"
                                options={["Primo", "Secondo", "Terzo"]}
                                labelAsValue
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.year}
                                />
                            </div>
                        </div>
                        <div class="field col-md-5">
                            <label for="semester" class="form-label">Semestre</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-person-badge"></i></span>
                                <Svelecte
                                placeholder="Scegli semestre"
                                options={["Primo", "Secondo"]}
                                labelAsValue
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={userRegister.semester}
                                />
                            </div>
                        </div>
                        <div class="field col-md-2 pe-0">
                            <label for="studentID" class="form-label">Matricola</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-person-badge"></i></span>
                                <input class="form-control" bind:value={userRegister.student_id}>
                                <div class="invalid-feedback">
                                    Scegli un'opzione
                                </div>
                            </div>
                        </div>

                        <div class="d-flex d-row justify-content-between align-items-center p-0">
                            <button class="submit-btn p-0 m-0" on:click={first_step}>
                                <i style="font-size: 2.6rem; position: relative; bottom: 2px;" class="bi bi-arrow-left-square next-step-icon"></i>
                            </button>
                            
                            <NormalButton class={"text-center p-0 m-0"}>
                                <div slot="name">
                                    <button type="button" class="btn btn-secondary w-100 text-dark fs-2 rounded-3 m-0" on:click={registerUser}>
                                        Registrati
                                    </button>
                                </div>
                            </NormalButton>

                            <button class="submit-btn p-0 m-0 text-light no-cursor" style="cursor: default !important;">
                                <i style="font-size: 2.6rem;" class="bi bi-arrow-left-square"></i>
                            </button>
                        </div>
					</form>
				{/if}
            </div>
        {/if}

        <!-- <img src="/src/style/sapiens_logo_cartoon.png" alt="" class="landing-page-image m-5"> -->
    </div>

    <div class="presentation-item d-flex justify-content-evenly align-items-center bg-primary">
        <div class="d-flex flex-column">
            <h1 class="title text-dark">Studia</h1>
            <h1 class="subtitle text-dark">Sfoglia tra decine di corsi universitari messi a disposizione dai tuoi colleghi</h1>
        </div>
        <img src="/src/style/landing_page.png" alt="" class="presentation-image">
    </div>
    
    <div class="presentation-item d-flex justify-content-evenly align-items-center bg-light">
        <img src="/src/style/landing_page.png" alt="" class="presentation-image">
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
        <img src="/src/style/landing_page.png" alt="" class="presentation-image">
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
        min-width: 75%;
        width: 75%;
    }

    .password-show-btn {
        position: absolute;
        right: 1rem;
        margin-top: 5px;
        z-index: 2;
        cursor: pointer;
    }

    .register-link, .login-link {
        cursor: pointer;
    }
    
    
    .input-group {
        border-radius: .4rem;
    }

    .input-icon-label {
        font-size: 1.25rem;
        background: rgba($dark, .15);
        border: 1px solid $dark;
        border-radius: .4rem 0rem 0rem .4rem;
    }

    .form-control, .form-select {
		border: 1px solid $dark;

		&::placeholder {
			color: $dark;
        	opacity: .5;
		}
	}

    .field {
        margin: 0px;
        margin-bottom: 1rem;
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