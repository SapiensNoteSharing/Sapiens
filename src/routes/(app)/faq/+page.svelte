<script>
    import QandA from '$lib/components/QandA.svelte';
</script>


<div class="d-flex flex-wrap flex-row justify-content-between align-content-between">
    <QandA
    class="q-and-a bg-light text-dark p-4 mb-5 g-col-4"
    title={"Punti RNA"}
    question={"A cosa servono i punti RNA?"}
    answer={"I punti RNA sono dei crediti in-app ottenibili completando esercizi, sfide e tramite la classifica"}
    />

    <QandA
    class="q-and-a bg-light text-dark p-4 mb-5 g-col-4"
    title={"Punti DNA"}
    question={"A quanto corrisponde un punto DNA?"}
    answer={"Un punto DNA corrisponde a 0.50€"}
    />

    <QandA
    class="q-and-a bg-light text-dark p-4 mb-5 g-col-4"
    title={"Contribuzione"}
    question={"A cosa serve contribuire?"}
    answer={"I punti RNA sono dei crediti in-app ottenibili completando esercizi, sfide e tramite la classifica"}
    />


    <QandA
    class="q-and-a bg-light text-dark p-4 mb-5 g-col-4"
    title={"Tempo di accesso ai corsi"}
    question={"Per quanto tempo ho accesso ad un corso dopo che l'ho acquistato?"}
    answer={"Il materiale acquistato su Sapiens non ha scandenza! Una volta acquistato un corso, l'accesso agli appunti e alle risorse aggiuntive rimane per sempre."}
    />
</div>


<style lang="scss">
    @import '$css/variables.scss';

    .q-and-a {
        border: 1px solid rgba($dark, 0.25);
        border-radius: 1rem;
        width: 47%;
    }

    .question, .answer {
        border: 1px solid $dark;
        border-radius: .4rem;
    }
    
    .question {
        background: rgba($primary, 0.25);
    }

    .answer {
        background: rgba($secondary, 0.25);
        text-align: right;
    }
</style>