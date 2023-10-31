<script>


</script>

<div>
    
    <div class="full_height d-flex justify-content-evenly align-items-center">
        <div class="d-flex flex-column">
            <h1 class="title text-dark">Studia</h1>
            <h1 class="subtitle text-dark">Sfoglia tra decine di corsi universitari messi a disposizione dai tuoi colleghi</h1>
        </div>
        <img src="/src/style/landing page.png" alt="" class="landing_page_image">
    </div>
    
    <div class="full_height d-flex justify-content-evenly align-items-center">
        <img src="/src/style/landing page.png" alt="" class="landing_page_image">
        <div class="d-flex flex-column">
            <h1 class="title text-dark">Contribuisci</h1>
            <h1 class="subtitle text-dark">Aiutaci a migliorare Sapiens condividendo i tuoi appunti e ricevendo in cambio grandi ricompense!</h1>
        </div>
    </div>
    
    <div class="full_height d-flex justify-content-evenly align-items-center">
        <div class="d-flex flex-column">
            <h1 class="title text-dark">Valuta</h1>
            <h1 class="subtitle text-dark">Recensisci i contenuti proposti: vogliamo sapereno cosa ne pensi!</h1>
        </div>
        <img src="/src/style/landing page.png" alt="" class="landing_page_image">
    </div>
    
    <div class="footer">
        <nav class="navbar navbar-expand-lg bg-light d-flex justify-content-between w-100 border-bottom">
            <div>        
                <img class="ms-3 footer-logo" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
            </div>
            
            <div class="d-flex">
                <a href="" class="me-4"><i class="icon footer_element bi bi-whatsapp"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-discord"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-instagram"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-facebook"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-twitter"></i></a>
                <a href="" class="me-4"><i class="icon footer_element bi bi-linkedin"></i></a>
            </div>
            
            <div class="d-flex">
                <span class="me-5">
                    <a class="display-6 text-decoration-none footer_element" href="#">Chi siamo</a>
                </span>
                <span class="me-5">
                    <a class="display-6 text-decoration-none footer_element" href="#">FAQ</a>
                </span>
            </div>
        </nav>
    </div>
</div>



<style lang="scss">
    @import '$css/variables.scss';
    
    .full_height {
        height: 73vh;
        margin: 0rem 5rem;
    }
    
    .title {
        font-size: 6rem;
    }
    
    .subtitle {
        font-size: 2rem;
    }
    
    .icon {
        font-size: 20px;
    }
    
    .landing_page_image {
        width: 50%;
    }
    
    .footer {
        border-top: 1px solid $dark;
    }
    
    .footer-logo {
        width: 12rem;
        filter: brightness(0);
    }
    
    .footer_element {
        color: $dark;
        opacity: 0.5;
    }
    
    .footer_element:hover {
        color: $secondary;
        transition: 0.1s;
        opacity: 1;
    }
</style>