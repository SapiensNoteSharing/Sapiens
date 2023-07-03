<script>
  import { onMount } from "svelte";
  import Accordion from '$lib/components/Accordion.svelte';
  import Accordionitem from "$lib/components/Accordionitem.svelte";
  import Searchbar from '$lib/components/Searchbar.svelte';
  import { page } from '$app/stores';

  import { view, value, filter_tags, dna } from '$lib/stores'

  let faculties = [
    "Ingegneria informatica",
    "Ingegneria meccanica",
    "Ingegneria gestionale",
    "Ingegneria biomedica",
    "Ingegneria elettronica",
    "Chimica e tecnologie farmaceutiche", 
    "Giurrisprudenza", 
    "Psicologia",
    "Scienze sociali",
    "Scienze della comunicazione", 
    "Scienze della formazione primaria", 
    "Filosofia",
    "Architettura",
    "Medicina",
    "Scienze farmaceutiche",
  ]
</script>

  <div class="d-flex sticky-top">
      <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom border-dark">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <!-- Sapiens Logo -->
          <img class="ms-3" style="width: 18rem;" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
          
          <div class="d-flex me-3 align-items-center">
            <!-- Site navigation -->
            <span class="me-5">
              <a class="display-6 text-decoration-none navbar_page" class:active={$page.route.id == "/(app)/esplora_corsi"} href="/esplora_corsi">Esplora Corsi</a>
            </span>
            <span class="me-5">
              <a class="display-6 text-decoration-none navbar_page" class:active={$page.route.id == "/(app)/aula_studio"} href="/aula_studio">Aula Studio</a>
            </span>
            <span class="me-5">
              <a class="display-6 text-decoration-none navbar_page" class:active={$page.route.id == "/(app)/area_personale"} href="/area_personale">Area personale</a>
            </span>

            <!-- credit -->
            <span class="display-5 text-dark me-2">{$dna}</span>
            <button type="button" class="me-3 p-2 btn btn-light position-relative" data-bs-toggle="modal" data-bs-target="#dnaInfo">
              <img style="width: 2.5rem;" src="/src/style/DNA.svg" alt="DNA">
            </button>
          </div>
        </div>
      </nav>
  </div>

  <div class="d-flex h-100 align-self-stretch">
    <div class="sidebar align-self-stretch px-3 position-relative flex-shrink-0">
      {#if $page.route.id == '/(app)/esplora_corsi'}
        <div class="d-flex align-items-center mt-5 mb-4">
          <h2 class="mx-auto display-6 text-dark">Filtri</h2>
        </div>

        <!-- filter according to input -->
        <Searchbar class="align-self-center ms-auto me-auto" bind:value={$value}></Searchbar>

        <div class="accordion my-4 mx-3">
          <!-- filter according to degree faculty -->
          <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="faculty_filter">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faculty_collapse" aria-expanded="true" aria-controls="faculty_collapse">
                Corso di Laurea
              </button>
            </h2>
            <div id="faculty_collapse" class="accordion-collapse collapse show" aria-labelledby="faculty_filter">
              <div class="accordion-body d-flex flex-wrap">
                {#each faculties as faculty}
                  <div class="me-2 mb-2">
                    <input type="checkbox" class="btn-check filter_btn" id="{faculty.replace(" ", "_")}" autocomplete="off">
                    <label class="btn btn-outline-primary text-dark border-primary" for="{faculty.replace(" ", "_")}">{faculty}</label><br>
                  </div>  
                {/each}
              </div>
            </div>
          </div>

          <!-- filter according to degree type -->
          <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="degree_filter">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#degree_collapse" aria-expanded="true" aria-controls="degree_collapse">
                Tipo di Laurea
              </button>
            </h2>
            <div id="degree_collapse" class="accordion-collapse collapse show" aria-labelledby="degree_filter">
              <div class="accordion-body d-flex flex-wrap">
                <div class="me-2 mb-2">
                  <input type="checkbox" class="btn-check filter_btn" id="triennale" autocomplete="off">
                  <label class="btn btn-outline-primary text-dark border-primary" for="triennale">Triennale</label><br>
                </div>       
                <div class="me-2 mb-2">
                  <input type="checkbox" class="btn-check filter_btn" id="magistrale" autocomplete="off">
                  <label class="btn btn-outline-primary text-dark border-primary" for="magistrale">Magistrale</label><br>
                </div>
                <div class="me-2 mb-2">
                  <input type="checkbox" class="btn-check filter_btn" id="ciclo_unico" autocomplete="off">
                  <label class="btn btn-outline-primary text-dark border-primary" for="ciclo_unico">A Ciclo Unico</label><br>
                </div>
                <!--  -->
                <!-- {#if } -->
              </div>
              <hr class="m-0">
              <h2 class="px-4 pt-4">Triennale</h2>
              <div class="accordion-body d-flex flex-wrap">
                <div class="me-2 mb-2">
                  <input type="checkbox" class="btn-check" id="Primo anno primo semestre" autocomplete="off">
                  <label class="btn btn-outline-primary text-dark border-primary" for="Primo anno primo semestre">Primo anno - Primo semestre</label><br>
                </div>
                <div class="me-2 mb-2">
                  <input type="checkbox" class="btn-check" id="Primo anno secondo semestre" autocomplete="off">
                  <label class="btn btn-outline-primary text-dark border-primary" for="Primo anno secondo semestre">Primo anno - Secondo semestre</label><br>
                </div>
                <div class="me-2 mb-2">
                  <input type="checkbox" class="btn-check" id="Secondo anno" autocomplete="off">
                  <label class="btn btn-outline-primary text-dark border-primary" for="Secondo anno">Secondo anno</label><br>
                </div>
                <div class="me-2 mb-2">
                  <input type="checkbox" class="btn-check" id="Terzo anno" autocomplete="off">
                  <label class="btn btn-outline-primary text-dark border-primary" for="Terzo anno">Terzo anno</label><br>
                </div>
              </div>
            </div>
          </div>

          <!-- filter according to tags -->
          <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="tags_filter">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tags_collapse" aria-expanded="true" aria-controls="tags_collapse">
                Tags
              </button>
            </h2>
            <div id="tags_collapse" class="accordion-collapse collapse show" aria-labelledby="tags_filter">
              <div class="accordion-body d-flex flex-wrap">
                {#each $filter_tags as tag}
                  <div class="me-2 mb-2">
                    <input type="checkbox" class="btn-check" id="{tag.name}" bind:checked={tag.selected} autocomplete="off">
                    <label class="btn btn-outline-{tag.color} text-dark border-dark" for="{tag.name}">{tag.name}</label><br>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- filter according to rating -->
          <div class="accordion-item border-dark">
            <h2 class="accordion-header" id="rating_filter">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#rating_collapse" aria-expanded="true" aria-controls="rating_collapse">
                Valutazione
              </button>
            </h2>
            <div id="rating_collapse" class="accordion-collapse collapse show" aria-labelledby="rating_filter">
              <div class="accordion-body d-flex flex-wrap">
                <!-- Rating filter -->
              </div>
            </div>
          </div>
        </div>
      {:else if $page.route.id == '/(app)/aula_studio'}
      <!--
        <Accordion>
          {#each $page.data.courses as course}
            <Accordionitem title={course.name}></Accordionitem>
          {/each}
        </Accordion>
      -->
      {:else if $page.route.id == '/(app)/area_personale'}
        <nav id="personal_area_scrollspy" class="mt-4 h-100 flex-column align-items-stretch pe-4 border-end">
          <nav class="nav nav-pills flex-column">
            <a class="fs-1 nav-link" href="#account">Account</a>
            <nav class="nav nav-pills flex-column">
              <a class="fs-1 nav-link ms-3 my-1" href="#dati_personali">Dati Personali</a>
              <a class="fs-1 nav-link ms-3 my-1" href="#dati_accademici-1-2">Dati Accademici</a>
            </nav>
            <a class="fs-1 nav-link" href="#preferenze">Preferenze</a>
          </nav>
        </nav>
      {/if}
    </div>

    <div class="flex-grow-1 position-relative">
      <slot></slot>
    </div>

    <!-- DNA sequences info -->
    <div class="modal fade" id="dnaInfo" tabindex="-1" aria-labelledby="dnaInfoLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-dark">
          <div class="modal-header bg-primary border-dark">
            <h1 class="modal-title display-6 ms-2 text-dark" id="dnaInfoLabel">Sequenze di DNA</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-3">
            <p>
            Lorem ipsum dolor sit amet. Est tempora perferendis eos quia rerum a rerum laborum eum atque eligendi ut laboriosam optio 33 fugiat quae. At nihil nostrum et Quis magnam ab aliquam temporibus est ipsa reiciendis sed facilis odit aut mollitia consequatur. Aut consectetur veritatis ea adipisci ratione et iste quaerat. Ut beatae obcaecati est harum unde et galisum similique ut officia architecto sed nesciunt delectus.
            </p>
          </div>
          <div class="modal-footer border-dark">
            <button type="button" class="btn btn-outline-primary text-dark fs-3 px-4 py-2 border-dark rounded-pill" data-bs-dismiss="modal">Capito</button>
          </div>
        </div>
      </div>
    </div>    
  </div>

  <div class="d-flex justify-content-between footer">
    <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom">
      <div class="container-fluid">
        <div>        
          <img class="ms-3 footer-logo" src="/src/style/Sapiens Logo.svg" alt="Sapiens-Title">
        </div>
        
        <div class="d-flex align-items-center">
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
      </div>
    </nav>
  </div>

<style lang="scss">
    @import '$css/variables.scss';

    .sidebar {
      width: 25%;
      min-height: 82vh;
      background-color: $primary;
      border-right: 1px solid $dark;
    }
    
    .icon {
      font-size: 20px;
    }

    .navbar_page.active {
      color: $secondary;
    }

    .navbar_page:not(.active) {
      color: $dark;
      opacity: 0.5;
    }
    
    .navbar_page:not(.active):hover {
      opacity: 1;
      transition: 0.3s;
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