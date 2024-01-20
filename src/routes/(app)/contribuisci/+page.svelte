<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import { onMount } from 'svelte';

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

    let subpage = "submit";

    

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
        <ActiveButton active={subpage == "submit" ? 'active' : 'not-active'} classes={"me-3"}>
            <div slot="name" class="navbar-item outlined display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "submit"}><i class="me-3 display-5 bi bi-file-earmark-plus{subpage == "submit" ? '-fill' : ''}"></i>Condividi i tuoi appunti</a>
            </div>
        </ActiveButton>

        <ActiveButton active={subpage == "correction" ? 'active' : 'not-active'} classes={"me-3"}>
            <div slot="name" class="navbar-item outlined display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "correction"}><i class="me-3 display-5 bi bi-exclamation-triangle{subpage == "correction" ? '-fill' : ''}"></i>Suggerisci correzione</a>
            </div>
        </ActiveButton>

        <ActiveButton active={subpage == "suggestion" ? 'active' : 'not-active'} classes={"me-3"}>
            <div slot="name" class="navbar-item outlined display-6 rounded-4">
                <a class="d-block display-5 px-3 py-2 text-decoration-none" on:click={() => subpage = "suggestion"}><i class="me-3 display-5 bi bi-chat-dots{subpage == "suggestion" ? '-fill' : ''}"></i>Consigli e commenti</a>
            </div>
        </ActiveButton>
    </div>

    {#if subpage == "submit"}
        <div class="scrollspy-example-2" data-bs-spy="scroll" data-bs-target="#personal_area_scrollspy" data-bs-smooth-scroll="true">
            <form class="row g-3 needs-validation m-0" novalidate>
                <div class="col-md-3">
                    <label for="validationCustom01" class="form-label">Regione</label>
                    <input type="text" class="form-control" id="validationCustom01" value="" required>
                </div>

                <div class="col-md-3">
                    <label for="validationCustom01" class="form-label">Città universitaria</label>
                    <input type="text" class="form-control" id="validationCustom01" value="" required>
                </div>

                <div class="col-md-6">
                    <label for="validationCustom01" class="form-label">Nome università</label>
                    <input type="text" class="form-control" id="validationCustom01" value="" required>
                </div>

                <div class="col-md-6">
                    <label for="validationCustom01" class="form-label">Nome facoltà</label>
                    <input type="text" class="form-control" id="validationCustom01" value="" required>
                </div>

                <div class="col-md-3">
                    <label for="validationCustom04" class="form-label">Tipo di laurea</label>
                    <select class="form-select" id="validationCustom04" required>
                        <option selected disabled value="">Seleziona</option>
                        <option>Triennale</option>
                        <option>Magistrale</option>
                        <option>A ciclo unico</option>
                    </select>
                </div>

                <div class="col-md-3">
                    <label for="validationCustom01" class="form-label">Codice facoltà</label>
                    <input type="text" class="form-control" id="validationCustom01" value="" required>
                </div>

                <div class="d-flex flex-row">
                    <div class="row g-3 me-3" style="width: 66%">
                        <div class="col-md-5">
                            <label for="validationCustom01" class="form-label">Nome corso</label>
                            <input type="text" class="form-control" id="validationCustom01" value="" required>
                        </div>
                        <div class="col-md-5">
                            <label for="validationCustom02" class="form-label">Codice corso</label>
                            <input type="text" class="form-control" id="validationCustom02" value="" required>
                        </div>

                        <div class="col-md-2">
                            <label for="validationCustom02" class="form-label">Numero CFU</label>
                            <input type="number" class="form-control" id="validationCustom02" min="0" value="0" required>
                        </div>

                        <div class="col-md-5">
                            <label for="validationCustom02" class="form-label">Docenti (separare con una virgola)</label>
                            <input type="text" class="form-control" id="validationCustom02" value="" required>
                        </div>

                        <div class="col-md-3">
                            <label for="validationCustom04" class="form-label">Anno</label>
                            <select class="form-select" id="validationCustom04" required>
                                <option selected disabled value="">Seleziona</option>
                                <option>Primo</option>
                                <option>Secondo</option>
                                <option>Terzo</option>
                            </select>
                        </div>

                        <div class="col-md-4">
                            <label for="validationCustom04" class="form-label">Periodo</label>
                            <select class="form-select" id="validationCustom04" required>
                                <option selected disabled value="">Seleziona</option>
                                <option>Primo semestre</option>
                                <option>Secondo semestre</option>
                                <option>Annuale</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label for="validationCustom04" class="form-label">Nome curriculum</label>
                            <input type="text" class="form-control" id="validationCustom02" value="">
                        </div>

                        <div class="col-md-3">
                            <label for="validationCustom04" class="form-label">Codice curriculum</label>
                            <input type="text" class="form-control" id="validationCustom02" value="">
                        </div>

                        <div class="col-md-3">
                            <label for="validationCustom04" class="form-label">Settore</label>
                            <input type="text" class="form-control" id="validationCustom02" value="">
                        </div>
                    </div>

                    <div class="file-input p-0 m-0" style="width: 34%">
                        <label for="validationCustom01" class="form-label">File</label>
                        <div class="drop-zone">
                        <span class="display-6 drop-zone__prompt">Scegli un file o trascinalo qui</span>
                            <input type="file" name="myFile" class="drop-zone__input">
                        </div>
                    </div>
                </div>

                <div class="d-flex flex-row justify-content-between align-items-center">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                        <label class="form-check-label" for="invalidCheck">
                            Accetta Termini e condizioni
                        </label>
                    </div>
                    
                    <button class="submit-btn display-4 text-dark fs-3 px-4 py-2" type="submit">Invia i tuoi appunti</button>
                </div>
            </form>
        </div>
    {/if}
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