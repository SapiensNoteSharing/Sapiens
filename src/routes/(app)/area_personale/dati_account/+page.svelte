<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import Svelecte from 'svelecte'
    import { page } from '$app/stores';
    import { user } from '$lib/stores';

    export let data;

    let account = {...$user}
    if (!account.university) account.university = {}
    if (!account.degree) account.degree = {}

    async function save_changes() {
        if (checkValidity()) {
            const resp = await fetch(`/api/user/${$user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            })
            if(!account.degree) account.degree = {}
            $user = account
        }
    }

    function checkValidity() {
        return true
    }

    function check_changes() {
        for (let key in account) {
            if ($user[key] != account[key]) {
                return true;
            }
        }
        return false;
    }
    let changes = false;
    $: {
        changes = check_changes();
    }
</script>

<div>
    <div class="scrollspy-example-2" data-bs-spy="scroll" data-bs-target="#personal_area_scrollspy" data-bs-smooth-scroll="true">
        <form class="row g-3 needs-validation">
            <h4 class="display-4 mb-3" id="dati_personali">Dati personali</h4>

            <div class="d-flex flex-row align-items-center p-0">
                <div class="d-flex flex-column justify-content-end align-items-start h-100" style="width: 11rem; margin-left: calc(var(--bs-gutter-x) * .5);">
                    <label for="userProfilePicture" class="form-label">Immagine profilo</label>
                    <ActiveButton active={$page.route.id == "/(app)/area_personale/dati_account" ? 'active' : 'not-active'} class={"mt-1"}>
                        <div slot="name" class="display-6 rounded-4">
                            <a href="/area_personale/dati_account"><img class="d-block user-icon" src="/user.jpg" alt="account"></a>
                        </div>
                    </ActiveButton>
                </div>

                <div  class="row g-3 p-0 m-0" style="width: calc(100% - 11rem)">
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
                        <label for="userUsername" class="form-label">Username</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-person-fill"></i></span>
                            <input class="form-control" bind:value={account.username} required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="userEmail" class="form-label">e-mail</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-at"></i></span>
                            <input class="form-control" bind:value={account.email} required>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <label for="userBirthCountry" class="form-label">Stato</label>
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
                    disabled={!account.country}
                    fetch="/api/regions?s={account.country?._id}"
                    minQuery={1}
                    valueAsObject
                    valueField="_id"
                    labelField="name"
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
                    disabled={!account.region}
                    minQuery={1}
                    fetch="/api/provinces?s={account.country?._id}&r={account.region?._id}"
                    valueAsObject
                    valueField="_id"
                    labelField="name"
                    autocomplete="off"
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.province}
                    />
                </div>
            </div>
        
            <h4 class="display-4 mt-5 mb-3" id="dati_accademici">Dati accademici</h4>

            <div class="col-md-4">
                <label for="universityName" class="form-label">Nome università</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona Università"
                    fetch="/api/universities"
                    valueAsObject
                    valueField="_id"
                    labelField="name"
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.university}
                    />
                </div>
            </div>
            <div class="col-md-4">
                <label for="facultyName" class="form-label">Nome Facoltà</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <Svelecte
                    placeholder="Seleziona facoltà"
                    options={[...new Set(data.degrees)]}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.degree.name}
                    />
                </div>
            </div>
            <div class="col-md-4">
                <label for="degreeType" class="form-label">Tipologia di Laurea</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <Svelecte
                    placeholder="Scegli tipologia"
                    options={['Triennale', 'Magistrale', 'A Ciclo Unico']}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={account.degree.type}
                    />
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
            <div class="col-md-2">
                <label for="studentID" class="form-label">Matricola</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-person-badge"></i></span>
                    <input class="form-control" bind:value={account.student_id} required>
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

    .form-control {
		border: 1px solid $dark;

		&::placeholder {
			color: $dark;
        	opacity: .5;
		}
	}

    .user-icon {
        width: 8.25rem;
        border: 1px solid $dark;
        border-radius: 5rem;
        transition: .15s;
    }
</style>