<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Svelecte from 'svelecte'
    import { page } from '$app/stores';

    export let data;
    let account = {...data.user}

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

    function save_changes() {
        for (let key in account) {
            if (data.user[key] != account[key]) {
                data.user[key] = account[key];
            }
        }
    }

    function check_changes() {
        for (let key in account) {
            if (data.user[key] != account[key]) {
                return true;
            }
        }
        return false;
    }

    let changes = false;
    $: {
        changes = check_changes();
    }

    let subpage = "account_data";
</script>

<div>
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id == "/(app)/area_personale/dati_account" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/area_personale/dati_account" ? '-fill' : ''}
        class={"me-3"}
        text={"Dati account"}
        icon={"bi-person"}
        href={"/area_personale/dati_account"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/area_personale/impostazioni" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/area_personale/impostazioni" ? '-fill' : ''}
        class={"me-3"}
        text={"Impostazioni"}
        icon={"bi-gear"}
        href={"/area_personale/impostazioni"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/area_personale/informazioni_pagamento" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/area_personale/informazioni_pagamento" ? '-fill' : ''}
        class={"me-3"}
        text={"Informazioni pagamento"}
        icon={"bi-credit-card"}
        href={"/area_personale/informazioni_pagamento"}
        />
    </div>

    <div class="scrollspy-example-2" data-bs-spy="scroll" data-bs-target="#personal_area_scrollspy" data-bs-smooth-scroll="true">
        <form class="row g-3 needs-validation">
            <h4 class="display-4 mb-3" id="dati_personali">Dati personali</h4>

            <div class="col-md-6">
                <label for="userFirstName" class="form-label">Nome</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-type"></i></span>
                    <input class="form-control" bind:value={account.name} required>
                </div>
            </div>
            <div class="col-md-6">
                <label for="userLastName" class="form-label">Cognome</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-type"></i></span>
                    <input class="form-control" bind:value={account.surname} required>
                </div>
            </div>

            <div class="col-md-6">
                <label for="userEmail" class="form-label">e-mail</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-at"></i></span>
                    <input class="form-control" bind:value={account.email} required>
                </div>
            </div>
            <div class="col-md-6">
                <label for="userPassword" class="form-label">Password</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-shield-lock-fill"></i></span>
                    <input type="password" class="form-control" bind:value={account.password} required>
                </div>
            </div>

            <div class="col-md-4">
                <label for="userBirthCountry" class="form-label">Stato</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona stato"
                    options={countries}
                    labelAsValue
                    autocomplete="off"
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.country}
                    />
                </div>
            </div>
            <div class="col-md-4">
                <label for="userBirthRegion" class="form-label">Regione</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona regione"
                    options={regions}
                    labelAsValue
                    autocomplete="off"
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.region}
                    />
                </div>
            </div>
            <div class="col-md-4">
                <label for="userBirthCity" class="form-label">Provincia</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona provincia"
                    options={cities}
                    labelAsValue
                    autocomplete="off"
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.city}
                    />
                </div>
            </div>
        
            <h4 class="display-4 mt-5 mb-3" id="dati_accademici">Dati accademici</h4>

            <div class="col-md-3">
                <label for="universityRegion" class="form-label">Regione</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona regione"
                    options={university_regions}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.university_region}
                    />
                </div>
            </div>
            <div class="col-md-4">
                <label for="universityCity" class="form-label">Città universitaria</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona città"
                    options={university_cities}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.university_city}
                    />
                </div>
            </div>
            <div class="col-md-5">
                <label for="universityName" class="form-label">Nome università</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona Università"
                    options={university_names}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.university_name}
                    />
                </div>
            </div>

            <div class="col-md-5">
                <label for="facultyName" class="form-label">Nome Facoltà</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona facoltà"
                    options={faculties_names}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.faculty_name}
                    />
                </div>
            </div>
            <div class="col-md-4">
                <label for="degreeType" class="form-label">Tipologia di Laurea</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <Svelecte
                    placeholder="Scegli tipologia"
                    options={["Triennale", "Magistrale", "A ciclo unico"]}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.faculty_type}
                    />
                </div>
            </div>
            <div class="col-md-3">
                <label for="facultyCode" class="form-label">Codice facoltà</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <input class="form-control" bind:value={account.faculty_code} required>
                </div>
            </div>

            <div class="col-md-2">
                <label for="studentID" class="form-label">Matricola</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-person-badge"></i></span>
                    <input class="form-control" bind:value={account.student_id} required>
                </div>
            </div>
            <div class="col-md-5">
                <label for="year" class="form-label">Anno</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-person-badge"></i></span>
                    <Svelecte
                    placeholder="Scegli anno"
                    options={["Primo", "Secondo", "Terzo"]}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.year}
                    />
                </div>
            </div>
            <div class="col-md-5">
                <label for="semester" class="form-label">Semestre</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-person-badge"></i></span>
                    <Svelecte
                    placeholder="Scegli anno"
                    options={["Primo", "Secondo"]}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.semester}
                    />
                </div>
            </div>

            <div class="d-flex flex-row justify-content-end">
                <NormalButton class={"mt-5"} style={"margin-left: calc(var(--bs-gutter-x) * .5);"}>
                    <div slot="name" class="page-btn">
                        <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" disabled={!changes} on:click={save_changes}>
                            Salva modifiche
                        </a>
                    </div>
                </NormalButton>
            </div>
        </form>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

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
</style>