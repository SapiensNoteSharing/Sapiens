<script>
    import { goto } from '$app/navigation';

    let accessMode = "login";
    let userLogin = {}
    let userRegister = {}

    async function loginUser() {
        const resp = await fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        })

        if (resp.ok) {
            goto('/corsi');
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
            goto('/corsi');
        }
    }
</script>

<div>
    <div class="full-height d-flex justify-content-evenly align-items-center">
        {#if accessMode == "login"}
            <div class="login-box d-flex flex-column px-5 py-4 floating">
                <p class="display-2 text-dark">Accedi</p>
                <span class="display-6 text-dark">Non hai un account? <span class="text-decoration-underline text-dark cursor-pointer" on:click={() => accessMode = "registration"}>Registrati</span></span>

                <div class="col-md-12">
                    <label for="validationServer01" class="form-label"></label>
                    <div class="input-group has-validation floating">
                        <span class="bi-icon input-group-text border-dark bg-primary" id="inputGroupPrepend1"><i class="bi bi-at"></i></span>
                        <input type="text" placeholder="E-mail" class="fs-2 form-control border-dark" id="validationServerUsername" aria-describedby="inputGroupPrepend1" bind:value={userLogin.email} required>
                        <div id="validationServerUsernameFeedback" class="invalid-feedback">
                            Inserisci un'email valida
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mb-3">
                    <label for="login_password" class="form-label"></label>
                    <div class="input-group has-validation floating">
                        <span class="bi-icon input-group-text border-dark bg-primary" id="inputGroupPrepend3"><i class="bi bi-shield-lock-fill"></i></span>
                        <input type="password" placeholder="Password" class="fs-2 form-control border-dark" id="login_password" bind:value={userLogin.password} required>
                        <div id="validationServerUsernameFeedback" class="invalid-feedback">
                            Inserisci una password valida
                        </div>
                    </div>
                </div>
                <p class="display-6 text-dark">Hai dimenticato la password? <a href="" class="text-dark">Recuperala</a></p>

                <!-- login -->
                <button type="button" style="width: 100%;" class="btn btn-outline-primary border-dark text-dark fs-2 py-2 my-4 rounded-2 floating" on:click={loginUser}>
                    Accedi
                </button>

                <div class="hr-box">
                    <span class="hr-text px-2 bg-light display-6 text-dark">
                        oppure accedi con
                    </span>
                </div>

                <div class="d-flex flex-row justify-content-evenly align-items-center my-2">
                    <!-- google -->
                    <button type="button" id="google-btn" class="btn border-dark text-dark fs-2 m-4 rounded-2 floating" on:click={loginUser}>
                        <img style="height: 1.25rem;" class="ms-1 me-2" src="/src/style/google.png" alt="">
                        <span class="align-middle">Google</span>
                    </button>
                    
                    <!-- facebook -->
                    <button type="button" id="facebook-btn" class="btn border-dark text-dark fs-2 py-2 m-4 rounded-2 floating" on:click={loginUser}>
                        <img style="height: 1.4rem;" class="ms-1 me-2" src="/src/style/facebook.png" alt="">
                        <span class="align-middle">Facebook</span>
                    </button>   
                </div>
            </div>
        {:else}
            <div class="d-flex justify-content-evenly align-items-center flex-column">
                <!-- register -->
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
            </div>
        {/if}

        <img src="/src/style/Sapiens Logo Cartoon.png" alt="" class="landing-page-image">
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

    .bi-icon {
        font-size: 1.5rem;
    }

    .login-box {
        padding: 2rem;
        width: 50%;
        height: 90%;
        border: 1px solid $dark;
        border-radius: 1rem;
    }

    .input-group {
        border-radius: .4rem;
    }

    .floating {
        box-shadow: .0rem .4rem rgba($dark, 0.5); 
        transition: .1s;
    }

    .floating:not(.login-box):hover  {
        box-shadow: .0rem .2rem rgba($dark, 0.5);
        transform: translate(0rem, .2rem);
    }

    .form-control::placeholder {
        color: $dark;
        opacity: .5;
    }
    
    .full-height {
        height: 80vh;
        margin: 0rem 2rem 2rem 2rem;
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
    
    .landing-page-image {
        max-width: 25%;
    }
    
    .footer {
        border-top: 1px solid $dark;
    }
    
    #google-btn {
        border: solid 1px hsl(5, 82%, 56%) !important;
        box-shadow: .0rem .4rem rgba(hsl(5, 82%, 10%), 0.5);
    }

    #google-btn:hover {
        box-shadow: .0rem .2rem rgba(hsl(5, 82%, 10%), 0.5);
    }

    #facebook-btn {
        border: solid 1px hsl(217, 100%, 52%) !important;
        box-shadow: .0rem .4rem rgba(hsl(217, 100%, 10%), 0.5);
    }

    #facebook-btn:hover {
        box-shadow: .0rem .2rem rgba(hsl(217, 100%, 10%), 0.5);
    }
</style>