<script>
    let classes = "";
    export {classes as class};

    let style;
    export {style as style};

    export let title;
    export let question;
    export let answer;
</script>

<div class="{classes}" style="{style}">
    <slot name="name">
        <div class="">
            <h2 class="p-3 display-4">{title}</h2>
            <p class="question display-6 p-3 mb-4">{question}</p>
            <p class="answer display-6 p-3 m-0">{answer}</p>
        </div>
    </slot>
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