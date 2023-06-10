<script>
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
    <!-- Account Info -->
    <div class="px-5 pt-5 scrollspy-example-2" data-bs-spy="scroll" data-bs-target="#personal_area_scrollspy" data-bs-smooth-scroll="true">
        <h2 class="display-6" id="account">Account</h2>
        
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
                    Inserisci una regione valida
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

            <!-- Save button -->
            <div class="col-12 mr-auto mt-5">
                <button class="btn btn-outline-primary text-dark fs-3 px-4 py-2 border-dark rounded-pill" type="submit">Salva modifiche</button>
            </div>
        </form>

        <div px-5 pt-5>
        </div>
    </div>

    <!-- Preferences -->
    <div class="px-5 pt-5">
        <h2 class="display-6" id="preference">Preferenze</h2>
    </div>
</div>

<style>
    
</style>