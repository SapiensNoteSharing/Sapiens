<script>
    import LeftSidebar from '$lib/components/LeftSidebar.svelte';
    import ActiveButton from '$lib/components/ActiveButton.svelte'
    import { page } from '$app/stores'
    import { user } from '$lib/stores'
    import 'highlight.js/styles/github.css';

    export let data;


    function formatPageTitle(page) {
        if (!page.route?.id) 
            return ''    
        
        let route = page.route.id.split('/').pop().replace(/_/g, ' ')
        route = substitute(route)
        if (route == 'faq') 
            return 'FAQ'

        const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1)
        return capitalise(route)
    }

    function substitute(text) {
        text = text.replace(/\[course\]/, $page.data?.course?.name);
        text = text.replace(/\[...dir\]/, $page.data?.directory?.name)
        text = text.replace(/\[file\]/, $page.data?.file?.name)
        return text
    }

    $: pageTitle = formatPageTitle($page);

</script>


<div class="page">
    <div class="d-flex">
        <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
            <div class="d-flex w-100 align-items-center">
                <a href="/home">
                    <img class="sapiens-logo" style="height: 4rem;" src="/src/style/sapiens_logo.svg" alt="Sapiens-Title">
                </a>
                
                <h2 class="nav-primary display-3 text-decoration-none align-self-center m-0 ms-4">{pageTitle}</h2>

                <div class="d-flex nav-secondary flex-row justify-right align-items-center me-3">
                    <!-- <span class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
                        <button class="btn btn-primary" type="button" disabled>Disabled button</button>
                    </span> -->

                    <ActiveButton 
                    class={"m-2"}
                    type="user_stats"
                    text={$user.streak}
                    src={"/src/style/streak.png"}
                    alt={"streak"}
                    />

                    <ActiveButton 
                    class={"m-2"}
                    type="user_stats"
                    text={$user.xp}
                    src={"/src/style/xp.png"}
                    alt={"xp"}
                    />

                    {#if $user.streak >= 14}
                        <ActiveButton
                        class={"m-2"}
                        type="user_stats"
                        text={($user.league_position || "n") + "°"}
                        src={"/src/style/leagues/level_" + $user.league_level + ".png"}
                        alt={"league"}
                        href={"/classifiche"}
                        />
                    {/if}

                    <ActiveButton 
                    class={"m-2"}
                    type="user_stats"
                    text={$user.dna}
                    src={"/src/style/dna.svg"}
                    alt={"dna"}
                    href={"/negozio/punti_dna"}
                    />

                    <ActiveButton 
                    class={"m-2"}
                    type="user_stats"
                    text={$user.rna}
                    src={"/src/style/rna.png"}
                    alt={"rna"}
                    />

                    <ActiveButton active={$page.route.id == "/(app)/area_personale/dati_account" ? 'active' : 'not-active'} class={"m-2"}>
                        <div slot="name" class="display-6 rounded-4">
                            <a href="/area_personale/dati_account"><img class="d-block user-icon" src="/src/style/user.jpg" alt="account"></a>
                        </div>
                    </ActiveButton>
                </div>
            </div>
        </nav>
    </div>

    <div class="d-flex h-100 align-self-stretch">
        <LeftSidebar user={$user}/>
    
        <div class="content flex-grow-1 position-relative p-4">
            <slot></slot>
        </div>
    </div>

    <div class="d-flex footer">
        <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
            <div class="container-fluid">
                <div>
                    <img class="ms-3 footer-logo" src="/src/style/sapiens_logo.svg" alt="Sapiens-Title">
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
                    <ActiveButton 
                    type={"navigation_link"}
                    active={$page.route.id == "/(app)/chi_siamo" ? 'active' : 'not-active'} 
                    fill={$page.route.id == "/(app)/chi_siamo" ? '' : ''}
                    class={"m-2"}
                    href={"/chi_siamo"}
                    text={"Chi siamo"}
                    icon={"bi-person-raised-hand"}
                    >
                    </ActiveButton>

                    <ActiveButton 
                    type={"navigation_link"}
                    active={$page.route.id == "/(app)/faq" ? 'active' : 'not-active'} 
                    fill={$page.route.id == "/(app)/faq" ? '-fill' : ''}
                    class={"m-2"}
                    href={"/faq"}
                    text={"FAQ"}
                    icon={"bi-question-circle"}
                    >
                    </ActiveButton>
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
    .content {
        max-width: calc(100vw - 250px);
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