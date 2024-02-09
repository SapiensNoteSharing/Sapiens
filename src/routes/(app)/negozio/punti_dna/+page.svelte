<script>
    import NormalButton from '$lib/components/NormalButton.svelte';
    import { user } from '$lib/stores';

    export let data;

    let dna = 0;
    let euro = 0;

    async function addDNA() {
        const resp = await fetch(`/api/user/${$user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dna: $user.dna + dna})
        })
        $user.dna += dna
    }

    function updateDNA() {
        dna = euro * 2;
    }

    function updateEuro() {
        euro = dna / 2;
    }
</script>

<div class="d-flex flex-column">
    <h2 class="display-4 mb-3">Acquista punti DNA</h2>
    <p class="fs-2">I punti DNA sono la <strong>valuta di Sapiens</strong> e li puoi spendere per ottenere il materiale disponibile sulla piattaforma.</p>
    <p class="fs-2">Ognuno corrisponde a <strong>0.50€</strong>, quindi per calcolare il prezzo in euro dei contenuti su Sapiens è sufficiente <strong>dimezzare il loro costo</strong> in DNA.
        <br>
        Nel riquadro qui di sotto, inserisci il numero di <strong>Punti DNA</strong> che vuoi acquistare oppure <strong>l'importo</strong> che intendi convertire e premi il pulsante <strong>Acquista</strong>.
    </p>

    <div class="transaction-container d-flex flex-column bg-light mt-5 mx-auto">
        <div class="d-flex flex-row align-items-end mb-4">
            <div class="d-flex flex-column align-items-center">
                <label for="euro" class="form-label display-5">Euro</label>
                <div class="input-group has-validation" style="font-size: 1rem !important;">
                    <span class="input-icon-label input-group-text p-2"><img src="/src/style/paypal.png" alt="" style="width: 2rem;"></span>
                    <input type="number" class="form-control" bind:value={euro} min="0" max="150" required on:input={updateDNA}>
                </div>
            </div>

            <i class="bi bi-arrow-right mx-3 display-3" style="position: relative; bottom: .3rem;"></i>
            
            <div class="d-flex flex-column align-items-center">
                <label for="dna" class="form-label display-5">Punti DNA</label>
                <div class="input-group has-validation">
                    <span class="input-icon-label input-group-text p-2"><img src="/src/style/dna.svg" alt="" style="width: 2rem;"></span>
                    <input type="number" class="form-control" bind:value={dna} min="0" max="300" required on:input={updateEuro}>
                </div>
            </div>
        </div>

        <div class="d-flex flex-row justify-content-center">
            <NormalButton class={"mx-2"}>
                <div slot="name">
                    <a type="button" class="btn btn-primary text-center fs-2" on:click={addDNA}>Acquista</a>
                </div>
            </NormalButton>
        </div>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .transaction-container {
        border: 1px solid rgba($dark, .25);
        border-radius: 1rem;
        padding: 2rem;
        width: fit-content;
    }

    .form-control {
        font-size: 1.25rem;
        text-align: center;
    }

    .input-icon-label {
        border-radius: .4rem 0rem 0rem .4rem;
    }
</style>