<script>
  import { onMount } from "svelte";
  import Accordion from '$lib/components/Accordion.svelte';
  import Searchbar from '$lib/components/Searchbar.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  import '$css/global.scss';

  import { value, filter_tags, dna } from '$lib/stores'
</script>

<div class="d-flex">
  <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom border-dark">
    <div class="container-fluid">
      <!-- <a class="display-2 text-dark text-decoration-none ms-2" href="#">Sapiens</a> -->
      <img class="ms-3" style="width: 18rem;" src="/src/style/Sapiens.svg" alt="Sapiens-Title">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="d-flex me-3">
        <span class="me-5">
          <a class="display-6 text-decoration-none text-secondary" href="#">Esplora Corsi</a>
        </span>
        <span class="me-5">
          <a class="display-6 text-decoration-none text-dark hoverable" href="#">Aula Studio</a>
        </span>
        <span class="me-5">
          <a class="display-6 text-decoration-none text-dark hoverable" href="#">Area personale</a>
        </span>
        <span class="display-5 text-dark">18</span>
        <img class="me-3" style="width: 2.5rem;" src="/src/style/DNA.svg" alt="DNA">
      </div>
    </div>
  </nav>
</div>

<div class="d-flex">
  <div class="sidebar align-self-stretch px-3 position-relative">
    <div class="d-flex align-items-center mt-5 mb-4">
        <h2 class="mx-auto display-6 text-dark">Filtri</h2>
    </div>

    <!-- filter according to input -->
    <Searchbar class="align-self-center ms-auto me-auto" bind:value={$value}></Searchbar>

    <div class="accordion my-4 mx-3 accordion-border-color-dark" id="accordionPanelsStayOpenExample">
      <!-- filter according to degree type -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="Tags_title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tags_collapse" aria-expanded="true" aria-controls="tags_collapse">
            Tipo di Laurea
          </button>
        </h2>
        <div id="tags_collapse" class="accordion-collapse collapse show" aria-labelledby="Tags_title">
          <div class="accordion-body d-flex flex-wrap">
            <div class="me-2 mb-2">
              <input type="checkbox" class="btn-check" id="Triennale" autocomplete="off">
              <label class="btn btn-outline-secondary" for="Triennale">Triennale</label><br>
            </div>       
            <div class="me-2 mb-2">
              <input type="checkbox" class="btn-check" id="Magistrale" autocomplete="off">
              <label class="btn btn-outline-success" for="Magistrale">Magistrale</label><br>
            </div> 
          </div>
        </div>
      </div>

      <!-- filter according to year and semester -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="year_title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#year_collapse" aria-expanded="true" aria-controls="year_collapse">
            Anno di insegnamento
          </button>
        </h2>
        <div id="year_collapse" class="accordion-collapse collapse show" aria-labelledby="year_title">
          <div class="accordion-body">
            <div class="me-2 mb-2">
              <input type="checkbox" class="btn-check" id="Primo anno primo semestre" autocomplete="off">
              <label class="btn btn-outline-primary" for="Primo anno primo semestre">Primo anno - Primo semestre</label><br>
            </div>
            <div class="me-2 mb-2">
              <input type="checkbox" class="btn-check" id="Primo anno secondo semestre" autocomplete="off">
              <label class="btn btn-outline-primary" for="Primo anno secondo semestre">Primo anno - Secondo semestre</label><br>
            </div>
            <div class="me-2 mb-2">
              <input type="checkbox" class="btn-check" id="Secondo anno" autocomplete="off">
              <label class="btn btn-outline-secondary" for="Secondo anno">Secondo anno</label><br>
            </div>
            <div class="me-2 mb-2">
              <input type="checkbox" class="btn-check" id="Terzo anno" autocomplete="off">
              <label class="btn btn-outline-success" for="Terzo anno">Terzo anno</label><br>
            </div>
          </div>
        </div>
      </div>

      <!-- filter according to tags -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="Tags_title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tags_collapse" aria-expanded="true" aria-controls="tags_collapse">
            Tags
          </button>
        </h2>
        <div id="tags_collapse" class="accordion-collapse collapse show" aria-labelledby="Tags_title">
          <div class="accordion-body d-flex flex-wrap">
            {#each $filter_tags as tag}
              <div class="me-2 mb-2">
                <input type="checkbox" class="btn-check" id="{tag.name}" bind:checked={tag.selected} autocomplete="off">
                <label class="btn btn-outline-{tag.color}" for="{tag.name}">{tag.name}</label><br>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- filter according to rating -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="Tags_title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tags_collapse" aria-expanded="true" aria-controls="tags_collapse">
            Valutazione
          </button>
        </h2>
        <div id="tags_collapse" class="accordion-collapse collapse show" aria-labelledby="Tags_title">
          <div class="accordion-body d-flex flex-wrap">
            <!-- Rating filter -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex-grow-1">
    <slot></slot>
  </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';

    .sidebar {
        width: 25%;
        background-color: $primary;
        border-right: 1px solid $dark;
        // overflow-y: scroll;
    }

    .hoverable {
      opacity: 0.5;
    }
    
    .hoverable:hover {
      opacity: 1;
      transition: 0.3s;
    }

    .custom-scrollbar {
        scroll-behavior: smooth;
    }
</style>