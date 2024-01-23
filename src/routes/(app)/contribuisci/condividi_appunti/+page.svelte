<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { onMount } from 'svelte';
    import Svelecte from 'svelecte'
    import { page } from '$app/stores';

    export let data;
    let account = {...data.user}

    let new_course = {
        ...data.user,
        number_CFU: 0
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

        document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
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
            dropZoneElement.classList.add("drop-zone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();

            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files;
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            }

            dropZoneElement.classList.remove("drop-zone--over");
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
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

        // First time - remove the prompt
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
            dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }

        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone__thumb");
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
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuisci/condividi_appunti" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuisci/condividi_appunti" ? '-fill' : ''}
        class={"me-3"}
        text={"Condividi i tuoi appunti"}
        icon={"bi-file-earmark-plus"}
        href={"/contribuisci/condividi_appunti"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuisci/suggerisci_correzione" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuisci/suggerisci_correzione" ? '-fill' : ''}
        class={"me-3"}
        text={"Suggerisci correzione"}
        icon={"bi-exclamation-triangle"}
        href={"/contribuisci/suggerisci_correzione"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/contribuisci/consigli_e_commenti" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/contribuisci/consigli_e_commenti" ? '-fill' : ''}
        class={"me-3"}
        text={"Consigli e commenti"}
        icon={"bi-chat-dots"}
        href={"/contribuisci/consigli_e_commenti"}
        />
    </div>

    <p class="m-0">* Campi obbligatori</p>
    <div class="scrollspy-example-2" data-bs-spy="scroll" data-bs-target="#personal_area_scrollspy" data-bs-smooth-scroll="true">
        <form class="row g-3 needs-validation m-0" novalidate>
            <div class="col-md-3 ps-0">
                <label for="accountRegion" class="form-label">Regione *</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                    <input class="form-control" bind:value={new_course.university_region} required>
                </div>
            </div>
            <div class="col-md-3">
                <label for="accountUniversityCity" class="form-label">Città universitaria *</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-geo-alt-fill"></i></span>
                    <input class="form-control" bind:value={new_course.university_city} required>
                </div>
            </div>
            <div class="col-md-6 pe-0">
                <label for="accountUniversityName" class="form-label">Nome università *</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <input class="form-control" bind:value={new_course.university_name} required>
                </div>
            </div>

            <div class="col-md-6 ps-0">
                <label for="account_faculty_name" class="form-label">Nome facoltà *</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <input class="form-control" bind:value={new_course.faculty_name} required>
                </div>
            </div>
            <div class="col-md-3">
                <label for="account_degree_type" class="form-label">Tipo di laurea *</label>
                <div class="d-flex has-validation svelecte-custom-selection">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <Svelecte
                    placeholder="Tipo di laurea"
                    options={["Triennale", "Magistrale", "A ciclo unico"]}
                    labelAsValue
                    class="svelecte-control text-center selection-input m-0"
                    bind:value={new_course.faculty_type}
                    />
                </div>
            </div>
            <div class="col-md-3 pe-0">
                <label for="faculty_code" class="form-label">Codice facoltà</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text"><i class="bi bi-mortarboard-fill"></i></span>
                    <input class="form-control" bind:value={new_course.faculty_code} required>
                </div>
            </div>

            <div class="d-flex flex-row">
                <div class="row g-3 me-3" style="width: 75%">
                    <div class="col-md-5 ps-0">
                        <label for="course_name" class="form-label">Nome corso *</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-book-fill"></i></span>
                            <input class="form-control"  bind:value={new_course.course_name} required>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label for="course_code" class="form-label">Codice corso *</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-book-fill"></i></span>
                            <input class="form-control" bind:value={new_course.course_code} required>
                        </div>
                    </div>
                    <div class="col-md-3 pe-0">
                        <label for="number_CFU" class="form-label">Numero CFU *</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-book-fill"></i></span>
                            <input type="number" class="form-control" bind:value={new_course.number_CFU} min="0" required>
                        </div>
                    </div>

                    <div class="col-md-6 ps-0">
                        <label for="professors" class="form-label">Docenti (separare con una virgola) *</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-people-fill"></i></span>
                            <input class="form-control" bind:value={new_course.professors} required>
                        </div>
                    </div>
                    <div class="col-md-3">
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
                    <div class="col-md-3 pe-0">
                        <label for="period" class="form-label">Periodo *</label>
                        <div class="d-flex has-validation svelecte-custom-selection">
                            <span class="input-icon-label input-group-text"><i class="bi bi-clock-fill"></i></span>
                            <Svelecte
                            placeholder="Periodo"
                            options={["Primo semestre", "Secondo semestre", "Annuale"]}
                            labelAsValue
                            class="svelecte-control text-center selection-input m-0"
                            bind:value={new_course.period}
                            />
                        </div>
                    </div>

                    <div class="col-md-6 ps-0">
                        <label for="curriculum_name" class="form-label">Nome curriculum</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-info-lg"></i></span>
                            <input class="form-control" bind:value={new_course.curriculum_name}>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label for="curriculum_code" class="form-label">Codice curriculum</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-info-lg"></i></span>
                            <input class="form-control" bind:value={new_course.curriculum_code}>
                        </div>
                    </div>
                    <div class="col-md-3 pe-0">
                        <label for="sector_code" class="form-label">Codice settore</label>
                        <div class="input-group has-validation">
                            <span class="input-icon-label input-group-text"><i class="bi bi-info-lg"></i></span>
                            <input class="form-control" bind:value={new_course.sector_code}>
                        </div>
                    </div>
                </div>

                <div class="file-input p-0 m-0" style="width: 35%">
                    <label for="file" class="form-label">File</label>
                    <div class="drop-zone">
                    <span class="display-6 drop-zone__prompt">Scegli un file o trascinalo qui</span>
                        <input type="file" name="myFile" class="drop-zone__input">
                    </div>
                </div>
            </div>

            <div class="d-flex flex-row justify-content-between align-items-center">
                <div class="form-check ps-3">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                    <label class="form-check-label" for="invalidCheck">
                        Accetta Termini e condizioni
                    </label>
                </div>
                
                <button class="submit-btn display-4 text-dark fs-3 px-4 py-2" type="submit">Invia i tuoi appunti</button>
            </div>
        </form>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .main-content {
        width: 70%;
        height: 100%;
        box-sizing: border-box;
    }

    .side-content {
        width: 30%;
        height: 100%;
        box-sizing: border-box;
    }

    .box {
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }

    .submit-btn {
        background: $primary;
        // border: 1px solid rgba($dark, 0.25);
        border: 0px;
        border-radius: 1rem;
        transition: .15s;

        &:hover {
            background: darken($primary, 10%);
        }
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

    .form-control, .form-select {
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

    .drop-zone--over {
        border-style: solid;    
    }

    .drop-zone__input {
        display: none;
    }

    .drop-zone__thumb {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        overflow: hidden;
        background-color: $light;
        background-size: cover;
        position: relative;
    }

    .drop-zone__thumb::after {
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