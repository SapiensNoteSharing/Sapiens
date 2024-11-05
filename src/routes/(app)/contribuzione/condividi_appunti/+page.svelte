<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import { onMount } from 'svelte';
    import Svelecte from 'svelecte'
    import { user } from '$lib/stores'

    export let data;

    let account = {...$user}

    let new_course = {
        university: $user?.university || {},
        degree: $user?.degree || {},
        year: $user?.year,
        semester: $user?.semester,
        cfu: 0
    }

    async function becomeContributor() {
        if (account.paypal_email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            $user.role = 'contributor'
            $user.paypal_email = account.paypal_email
        }
    }

	onMount(() => {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		const forms = document.querySelectorAll('.needs-validation');

		// Loop over them and prevent submission
		Array.from(forms).forEach(form => {
			form.addEventListener('submit', event => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add('was-validated');
			}, false);
		});

        document.querySelectorAll(".drop-zone-input").forEach((inputElement) => {
        const dropZoneElement = inputElement.closest(".drop-zone");

        dropZoneElement.addEventListener("click", (e) => {
            inputElement.click();
        });

        inputElement.addEventListener("change", (e) => {
            if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
            }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("drop-zone-over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone-over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();

            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            }

            dropZoneElement.classList.remove("drop-zone-over");
        });
    });
	});

    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */
    
    function updateThumbnail(dropZoneElement, file) {
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone-thumb");

        // First time - remove the prompt
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
            dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }

        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone-thumb");
            dropZoneElement.appendChild(thumbnailElement);
        }

        thumbnailElement.dataset.label = file.name;

        // Show thumbnail for image files
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            };
        } else {
            thumbnailElement.style.backgroundImage = null;
        }
    }
</script>

<div class="d-flex flex-column">
    {#if $user.role == "contributor" || $user.role == "admin"}
        <h2 class="display-4 mb-3">Dati del corso</h2>
        <p class="mb-3">* Campi obbligatori</p>
        <div class="scrollspy-example-2" data-bs-spy="scroll" data-bs-target="#personal_area_scrollspy" data-bs-smooth-scroll="true">
            <form class="row g-3 needs-validation m-0" novalidate>
                <div class="col-md-5 ps-0" style="margin-bottom: 2.55rem">
                    <label for="accountUniversityName" class="form-label">Nome università *</label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                        <input class="form-control" bind:value={new_course.university.name} required>
                    </div>
                </div>
                <div class="col-md-4" style="margin-bottom: 2.55rem">
                    <label for="account_faculty_name" class="form-label">Nome facoltà *</label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                        <input class="form-control" bind:value={new_course.degree.name} required>
                    </div>
                </div>
                <div class="col-md-3 pe-0" style="margin-bottom: 2.55rem">
                    <label for="account_degree_type" class="form-label">Tipo di laurea *</label>
                    <div class="d-flex has-validation svelecte-custom-selection">
                        <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                        <Svelecte
                        placeholder="Tipo di laurea"
                        options={["Triennale", "Magistrale", "A ciclo unico"]}
                        labelAsValue
                        class="svelecte-control text-center selection-input m-0"
                        bind:value={new_course.degree.type}
                        />
                    </div>
                </div>

                <div class="d-flex flex-row">
                    <div class="row g-3 me-3" style="width: 75%">
                        <div class="col-md-7 ps-0" style="margin-bottom: 2.55rem">
                            <label for="course_name" class="form-label">Nome corso *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-book-fill"></i></span>
                                <input class="form-control"  bind:value={new_course.name} required>
                            </div>
                        </div>
                        <div class="col-md-2" style="margin-bottom: 2.55rem">
                            <label for="number_CFU" class="form-label">Numero CFU *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-book-fill"></i></span>
                                <input type="number" class="form-control" bind:value={new_course.cfu} min="0" required>
                            </div>
                        </div>
                        <div class="col-md-3 pe-0" style="margin-bottom: 2.55rem">
                            <label for="course_code" class="form-label">Codice corso</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-book-fill"></i></span>
                                <input class="form-control" bind:value={new_course.code}>
                            </div>
                        </div>

                        <div class="col-md-5 ps-0" style="margin-bottom: 2.55rem">
                            <label for="professors" class="form-label">Docenti (separare con una virgola) *</label>
                            <div class="input-group has-validation">
                                <span class="input-icon-label input-group-text"><i class="bi bi-people-fill"></i></span>
                                <input class="form-control" bind:value={new_course.professors} required>
                            </div>
                        </div>
                        <div class="col-md-3" style="margin-bottom: 2.55rem">
                            <label for="year" class="form-label">Anno *</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-clock-fill"></i></span>
                                <Svelecte
                                placeholder="Anno"
                                options={["Primo", "Secondo", "Terzo"]}
                                labelAsValue
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={new_course.year}
                                />
                            </div>
                        </div>
                        <div class="col-md-4 pe-0" style="margin-bottom: 2.55rem">
                            <label for="period" class="form-label">Periodo *</label>
                            <div class="d-flex has-validation svelecte-custom-selection">
                                <span class="input-icon-label input-group-text"><i class="bi bi-clock-fill"></i></span>
                                <Svelecte
                                placeholder="Periodo"
                                options={["Primo semestre", "Secondo semestre", "Annuale"]}
                                labelAsValue
                                class="svelecte-control text-center selection-input m-0"
                                bind:value={new_course.semester}
                                />
                            </div>
                        </div>
                    </div>

                    <div class="file-input p-0 m-0" style="width: 35%">
                        <label for="file" class="form-label">File *</label>
                        <div class="drop-zone">
                        <span class="display-6 drop-zone__prompt">Scegli un file o trascinalo qui</span>
                            <input type="file" name="myFile" class="drop-zone-input">
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-row justify-content-between align-items-center">
                    <div class="form-check ps-3">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                        <label class="form-check-label" for="invalidCheck">
                            Accetta Termini e condizioni *
                        </label>
                    </div>

                    <NormalButton class={"ms-3"} style={""}>
                        <div slot="name" class="page-btn">
                            <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2">
                                Invia i tuoi appunti
                            </a>
                        </div>
                    </NormalButton>
                </div>
            </form>
        </div>
    {:else}
        <div class="d-flex flex-column">
            <div class="d-flex flex-column">
                <h2 class="display-3">Diventa un contributore!</h2>
                <h4 class="fs-3">Effettuando il passaggio del tuo account al <strong>ruolo di contributore</strong> potrai caricare i tuoi appunti su Sapiens e <strong>guadagnare</strong> su ogni vendita.</h4>
            </div>

            <div class="d-flex flex-row justify-content-between mt-4">
                <div class="d-flex flex-column">
                    <h2 class="display-4">Come funziona?</h2>
                    <h4 class="fs-3">1. Inserisci l'email del tuo <strong>account PayPal</strong>, così che possiamo <strong>inviarti il denaro</strong>.</h4>
                    <h4 class="fs-3">2. <strong>Raccogli tutti gli appunti</strong> relativi ad un corso che hai seguito e <strong>compila il form</strong> inserendone i dati.</h4>
                    <h4 class="fs-3">3. Attendi che qualcuno acquisti il corso con i tuoi appunti e <strong>guadagna!</strong></h4>
                </div>
            </div>

            <div class="d-flex flex-row justify-content-center align-items-end mt-5">
                <div class="col-md-4">
                    <label for="userUsername" class="form-label">PayPal e-mail</label>
                    <div class="input-group has-validation">
                        <span class="input-icon-label input-group-text"><i class="bi bi-paypal"></i></span>
                        <input class="form-control" bind:value={account.paypal_email}>
                    </div>
                </div>

                <NormalButton class={"ms-3"} style={""}>
                    <div slot="name" class="page-btn">
                        <a type="button" class="btn btn-primary text-center w-100 text-dark fs-2" on:click={becomeContributor}>
                            Diventa contributore
                        </a>
                    </div>
                </NormalButton>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .box {
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }

    .file-input {
        margin-top: var(--bs-gutter-y);
        padding-left: calc(var(--bs-gutter-x) * .5);
        padding-right: calc(var(--bs-gutter-x) * .5);
    }

    .input-group {
        border-radius: .4rem;
    }

    .input-icon-label {
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

    .drop-zone {
        padding: 2rem;
        height: 13rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        color: rgba($dark, .5);
        border: 1px dashed $dark;
        border-radius: 1rem;
    }

    .drop-zone-over {
        border-style: solid;    
    }

    .drop-zone-input {
        display: none;
    }

    .drop-zone-thumb {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        overflow: hidden;
        background-color: $light;
        background-size: cover;
        position: relative;
    }

    .drop-zone-thumb::after {
        content: attr(data-label);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 5px 0;
        color: $light;
        background: rgba(0, 0, 0, 0.75);
        font-size: 14px;
        text-align: center;
    }
</style>