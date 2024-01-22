<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import '$css/global.scss';

    $: user = $page.data.user || {};
        
    let dnaModal;

    onMount(async () => {
        const bootstrap = await import('bootstrap');
    })

    function openDnaModal() {   
        dnaModal.show().then(async res => {
            if (res) {

            }
        })
    }
    
    $: pageTitle = $page.route.id.endsWith('faq') ? 'FAQ' : ($page.route.id ? $page.route.id.split('/').pop().replace(/_/g, ' ').charAt(0).toUpperCase() + $page.route.id.split('/').pop().replace(/_/g, ' ').slice(1) : '');
</script>

<div class="page">
    {#if $page.route.id == '/'}
        <div class="d-flex">
            <nav class="navbar navbar-expand-lg bg-light w-100">
                <div class="d-flex w-100 justify-content-center align-items-center">
                    <img style="width: 14rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
                </div>
            </nav>
        </div>
    {:else}
        <div class="d-flex">
            <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
                <div class="d-flex w-100 align-items-center">
                    <a href="/home">
                        <img class="sapiens-logo" style="height: 4rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
                    </a>
                    
                    <h2 class="nav-primary display-3 text-decoration-none align-self-center m-0 ms-4">{pageTitle}</h2>

                    <div class="d-flex nav-secondary flex-row justify-right align-items-center me-3">
                        <ActiveButton 
                        class={"m-2"}
                        type="user_stats"
                        text={user.streak}
                        src={"/src/style/streak.png"}
                        alt={"streak"}
                        />

                        <ActiveButton 
                        class={"m-2"}
                        type="user_stats"
                        text={user.xp}
                        src={"/src/style/xp.png"}
                        alt={"xp"}
                        />

                        <ActiveButton 
                        class={"m-2"}
                        type="user_stats"
                        text={(user.league_position || "n") + "°"}
                        src={"/src/style/league.png"}
                        alt={"league"}
                        />

                        <ActiveButton 
                        class={"m-2"}
                        type="user_stats"
                        text={user.dna}
                        src={"/src/style/dna.svg"}
                        alt={"dna"}
                        />

                        <ActiveButton 
                        class={"m-2"}
                        type="user_stats"
                        text={user.rna}
                        src={"/src/style/rna.png"}
                        alt={"RNA"}
                        />

                        <ActiveButton active={$page.route.id == "/(app)/area_personale" ? 'active' : 'not-active'} class={"m-2"}>
                            <div slot="name" class="display-6 rounded-4">
                                <a href="/area_personale"><img class="d-block user-icon" src="/src/style/user.jpg" alt="account"></a>
                            </div>
                        </ActiveButton>
                    </div>
                </div>
            </nav>
        </div>
    {/if}

    <slot></slot>

    <div class="d-flex footer">
        <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
            <div class="container-fluid">
                <div>
                    <img class="ms-3 footer-logo" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
                </div>

                <div class="d-flex align-items-center">
                    <a href="" class="me-4"><i class="icon footer-element bi bi-whatsapp"></i></a>
                    <a href="" class="me-4"><i class="icon footer-element bi bi-discord"></i></a>
                    <a href="" class="me-4"><i class="icon footer-element bi bi-instagram"></i></a>
                    <a href="" class="me-4"><i class="icon footer-element bi bi-facebook"></i></a>
                    <a href="" class="me-4"><i class="icon footer-element bi bi-twitter-x"></i></a>
                    <a href="" class="me-4"><i class="icon footer-element bi bi-linkedin"></i></a>
                    <a href="" class="me-4"><i class="icon footer-element bi bi-tiktok"></i></a>
                </div>

                <div class="d-flex">
                    <span class="me-5">
                        <a class="display-6 text-decoration-none footer-element" href="/chi_siamo">Chi siamo</a>
                    </span>
                    <span class="me-5">
                        <a class="display-6 text-decoration-none footer-element" href="/faq">FAQ</a>
                    </span>
                </div>
            </div>
        </nav>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .page {
        background: $light;
        overflow-x: hidden;
    }

    .icon {
        font-size: 20px;
    }
    
    .navbar {
        overflow-y: scroll;

        &.border-bottom {
            border-bottom: 1px solid rgba($dark, 0.25) !important;
        }
    }

    .sapiens-logo {
        position: relative;
        left: 125px;
        transform: translate(-50%);
    }

    .nav-primary {
        position: absolute;
        left: 250px;
    }

    .nav-secondary {
        position: absolute;
        right: 0px;
    }

    .dna-btn {
        background: $light;

        &:hover {
            background: $secondary !important;
        }
    }

    .user-icon {
        width: 3rem;
        border-radius: 3rem;
        transition: .15s;
        
        &:hover {
            width: 2.5rem;
            margin: .25rem;
        }
    }

    .full-height {
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
    
    .landing-page-image {
        width: 50%;
    }
    
    .footer {
        border-top: 1px solid rgba($dark, 0.25);
    }
    
    .footer-logo {
        height: 3rem;
        filter: brightness(0);
    }
    
    .footer-element {
        color: $dark;
        opacity: 0.5;

        &:hover {
            color: $secondary;
            transition: 0.1s;
            opacity: 1;
        }
    }
</style>
    