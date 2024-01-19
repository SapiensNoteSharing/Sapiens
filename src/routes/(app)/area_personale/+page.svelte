<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';

    export let data;
    let account = {...data.user}

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
        <ActiveButton active={subpage == "account_data" ? 'active' : 'not-active'} classes={"me-3"}>
            <div slot="name" class="navbar-item outlined display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "account_data"}><i class="me-3 display-5 bi bi-person{subpage == "account_data" ? '-fill' : ''}"></i>Dati account</a>
            </div>
        </ActiveButton>

        <ActiveButton active={subpage == "preferences" ? 'active' : 'not-active'} classes={"me-3"}>
            <div slot="name" class="navbar-item outlined display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "preferences"}><i class="me-3 display-5 bi bi-palette{subpage == "preferences" ? '-fill' : ''}"></i>Modifica aspetto</a>
            </div>
        </ActiveButton>

        <ActiveButton active={subpage == "payment_info" ? 'active' : 'not-active'} classes={"me-3"}>
            <div slot="name" class="navbar-item outlined display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "payment_info"}><i class="me-3 display-5 bi bi-credit-card{subpage == "payment_info" ? '-fill' : ''}"></i>Informazioni di pagamento</a>
            </div>
        </ActiveButton>
    </div>

    {#if subpage == "account_data"}
        <div class="scrollspy-example-2" data-bs-spy="scroll" data-bs-target="#personal_area_scrollspy" data-bs-smooth-scroll="true">
            <form class="row g-3 needs-validation">
                <h4 class="display-4 mb-3" id="dati_personali">Dati personali</h4>

                <div class="col-md-6">
                    <label for="userFirstName" class="form-label">Nome</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <input class="form-control" bind:value={account.name} required>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userLastName" class="form-label">Cognome</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text"><i class="bi bi-type"></i></span>
                        <input class="form-control" bind:value={account.surname} required>
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="userEmail" class="form-label">e-mail</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text"><i class="bi bi-at"></i></span>
                        <input class="form-control" bind:value={account.email} required>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="userPassword" class="form-label">Password</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text"><i class="bi bi-at"></i></span>
                        <input type="password" class="form-control" required>
                    </div>
                </div>

                <div class="col-md-4">
                    <label for="userBirthCountry" class="form-label">Stato</label>
                    <input class="form-control"bind:value={account.country} required>
                </div>
                <div class="col-md-4">
                    <label for="userBirthRegion" class="form-label">Regione</label>
                    <input class="form-control" bind:value={account.region} required>
                </div>
                <div class="col-md-4">
                    <label for="userBirthCity" class="form-label">Città</label>
                    <input class="form-control" bind:value={account.city} required>
                </div>
            
                <h4 class="display-4 mt-5 mb-3" id="dati_accademici">Dati accademici</h4>

                <div class="col-md-3">
                    <label for="universityRegion" class="form-label">Regione</label>
                    <input class="form-control" bind:value={account.university_region} required>
                </div>
                <div class="col-md-4">
                    <label for="universityCity" class="form-label">Città universitaria</label>
                    <input class="form-control" bind:value={account.university_city} required>
                </div>
                <div class="col-md-5">
                    <label for="universityName" class="form-label">Nome università</label>
                    <input class="form-control" bind:value={account.university_name} required>
                </div>

                <div class="col-md-5">
                    <label for="facultyName" class="form-label">Nome Facoltà</label>
                    <input class="form-control" bind:value={account.faculty_name} required>
                </div>
                <div class="col-md-4">
                    <label for="degreeType" class="form-label">Tipologia di Laurea</label>
                    <select class="form-select" bind:value={account.degree_type} required>
                        <option>Triennale</option>
                        <option>Magistrale</option>
                        <option>A ciclo unico</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="facultyCode" class="form-label">Codice facoltà</label>
                    <input class="form-control" bind:value={account.faculty_code} required>
                </div>

                <div class="col-md-2">
                    <label for="studentID" class="form-label">Matricola</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text">#</span>
                        <input class="form-control" bind:value={account.student_id} required>
                    </div>
                </div>
                <div class="col-md-5">
                    <label for="year" class="form-label">Anno</label>
                    <select class="form-select" bind:value={account.year} required>
                        <option>Primo</option>
                        <option>Secondo</option>
                        <option>Terzo</option>
                    </select>
                </div>
                <div class="col-md-5">
                    <label for="semester" class="form-label">Semestre</label>
                    <select class="form-select" bind:value={account.semester} required>
                        <option>Primo</option>
                        <option>Secondo</option>
                    </select>
                </div>

                {#if !changes}
                    <div class="d-flex flex-row justify-content-end">
                        <NormalButton classes={"bg-primary mt-5"} style={"margin-left: calc(var(--bs-gutter-x) * .5);"} disabled>
                            <div slot="name" class="navbar-item">
                                <a type="button" class="btn text-center w-100 text-dark fs-2">
                                    Salva modifiche
                                </a>
                            </div>
                        </NormalButton>
                    </div>
                {:else}
                    <div class="d-flex flex-row justify-content-end">
                        <NormalButton classes={"bg-primary mt-5"} style={"margin-left: calc(var(--bs-gutter-x) * .5);"}>
                            <div slot="name" class="navbar-item">
                                <a type="button" class="btn text-center w-100 text-dark fs-2" on:click={save_changes}>
                                    Salva modifiche
                                </a>
                            </div>
                        </NormalButton>
                    </div>
                {/if}
            </form>
        </div>
    {:else if subpage == "preferences"}

    {:else if subpage == "payment_info"}


    {/if}
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .input-group {
        border-radius: .4rem;
    }

    .input-group-text, .form-control, .form-select {
        border: 1px solid rgba($dark, 0.25) !important;
    }
</style>