<script>
    import { onMount } from "svelte";
    import '$css/global.scss';

    let bootstrap;
    onMount(async () => {
        bootstrap = await import('bootstrap')
    })

    let account = {
        name: "Alessandro",
        surname: "Longo",
        email: "alessandro.longo@stud.unifi.it",
        student_ID: 7073783,
        country: "Italia",
        region: "Toscana",
        city: "Grosseto",
        cap: 58100,
        university_region: "Toscana",
        university_city: "Firenze",
        faculty: "Ingegneria Informatica",
        degree_type: "Triennale"
    }
</script>

<div>
    <div class="d-flex sticky-top">
        <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom border-dark">
            <div class="d-flex w-100 justify-content-between align-items-center">
                <!-- Sapiens Logo -->
                <img class="ms-3" style="width: 18rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">

                <!-- login and register -->
                <div class="d-flex me-5">
                    <!-- login -->
                    <button type="button" class="btn btn-outline-primary border-dark text-dark px-4 py-2 ms-4 fs-1 rounded-pill" data-bs-toggle="modal" data-bs-target="#loginModal">
                        <span style="right: 2px; top: 8px;">Accedi</span>
                    </button>
                    <!-- register -->
                    <button type="button" class="btn btn-outline-secondary border-dark text-dark px-4 py-2 ms-4 fs-1 rounded-pill" data-bs-toggle="modal" data-bs-target="#registerModal">
                        <span style="right: 2px; top: 8px;">Registrati</span>
                    </button>
                </div>
            </div>
        </nav>
    </div>

    <div class="full_height d-flex justify-content-evenly align-items-center">
        <div class="d-flex flex-column">
            <h1 class="display-1 text-dark">Lorem ipsum</h1>
            <h2 class="display-5">Aut necessitatibus incidunt et enim voluptate vel consequatur debitis At alias animi.</h2>
        </div>
        <img src="/src/style/landing page.png" alt="" class="landing_page_image">
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

    <!-- Login -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content border-dark">
                <div class="modal-header bg-primary border-dark">
                    <h1 class="modal-title display-6 ms-2 text-dark" id="loginModalLabel">Accedi</h1>
                </div>
                <div class="modal-body p-4">
                    <form>
                        <div class="mb-3">
                            <label for="login_name" class="form-label">Username o email</label>
                            <input type="username" class="form-control" id="login_name">
                        </div>
                        <div class="mb-3">
                            <label for="login_password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="login_password">
                        </div>
                    </form>
                </div>
                <div class="modal-footer d-flex border-dark">
                    <a type="button" href="/esplora_corsi" class="btn btn-outline-primary text-dark fs-3 px-4 py-2 border-dark rounded-pill" onclick="$('#loginModal').modal('hide')">Accedi</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Register -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content border-dark">
                <div class="modal-header bg-secondary border-dark">
                    <h1 class="modal-title display-6 ms-2 text-dark" id="registerModalLabel">Registrati</h1>
                </div>
                <div class="modal-body p-4">
                    <form class="row g-3 was-validated">
                        <h4 class="fs-1" id="dati_personali">Dati personali</h4>
            
                        <!-- Name -->
                        <div class="col-md-3">
                            <label for="validationServer01" class="form-label">Nome</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text border-dark" id="inputGroupPrepend1"><i class="bi bi-type"></i></span>
                                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend1" value={account.name} required>
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
                                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend2" value={account.surname} required>
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
                                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend2" value={account.email} required>
                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                    Inserisci un cognome valido
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label for="validationServer03" class="form-label">Stato</label>
                            <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer04Feedback" value={account.country} required>
                            <div id="validationServer04Feedback" class="invalid-feedback">
                                Inserisci uno stato valido
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="validationServer04" class="form-label">Regione</label>
                            <input type="text" class="form-control is-invalid" id="validationServer04" aria-describedby="validationServer03Feedback" value={account.region} required>
                            <div id="validationServer03Feedback" class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="validationServer05" class="form-label">Città</label>
                            <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer03Feedback" value={account.city} required>
                            <div id="validationServer03Feedback" class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                       
                        <h4 class="fs-1" id="dati_accademici">Dati accademici</h4>
            
                        <div class="col-md-6">
                            <label for="validationServer06" class="form-label">Città universitaria</label>
                            <input type="text" class="form-control is-invalid" id="validationServer03" aria-describedby="validationServer06Feedback" value={account.university_city} required>
                            <div id="validationServer06Feedback" class="invalid-feedback">
                                Inserisci una città valida
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="validationServer07" class="form-label">Facoltà</label>
                            <input type="text" class="form-control is-invalid" id="validationServer04" aria-describedby="validationServer07Feedback" value={account.faculty} required>
                            <div id="validationServer07Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="validationServer08" class="form-label">Tipologia di Laurea</label>
                            <input type="text" class="form-control is-invalid" id="validationServer05" aria-describedby="validationServer08Feedback" value={account.degree_type} required>
                            <div id="validationServer08Feedback" class="invalid-feedback">
                                Scegli un'opzione
                            </div>
                        </div>

                        <!-- University Code -->
                        <div class="col-md-6">
                            <label for="validationServerUsername" class="form-label">Matricola</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text border-dark" id="inputGroupPrepend3">#</span>
                                <input type="text" class="form-control is-invalid" id="validationServerUsername" aria-describedby="inputGroupPrepend3" value={account.student_ID} required>
                                <div id="validationServerUsernameFeedback" class="invalid-feedback">
                                    Inserisci un numero di matricola valido
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer d-flex border-dark">
                    <a type="button" href="/esplora_corsi" class="btn btn-outline-secondary text-dark fs-3 px-4 py-2 border-dark rounded-pill" onclick="$('#registerModal').modal('hide')">Registrati</a>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .full_height {
        height: 73vh;
        margin: 0rem 5rem;
    }

    .icon {
      font-size: 20px;
    }

    .landing_page_image {
        width: 50%;
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