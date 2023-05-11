<script>
  import { onMount } from "svelte";
  import Accordion from '$lib/components/Accordion.svelte';
  import Searchbar from '$lib/components/Searchbar.svelte';
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-icons/font/bootstrap-icons.css'
  import '$css/global.scss';

  import { value } from '$lib/stores'
</script>

<div class="d-flex">
  <nav class="navbar navbar-expand-lg bg-light w-100 border-bottom border-dark">
    <div class="container-fluid">
      <a class="display-2 text-dark text-decoration-none ms-2" href="#">Sapiens</a>
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
      </div>
    </div>
  </nav>
</div>

<div class="d-flex">
  <div class="sidebar px-3 position-relative">
    <div class="d-flex align-items-center my-5">
        <h2 class="ms-auto me-auto display-6 text-dark">Filtri</h2>
    </div>

    <Searchbar class="align-self-center ms-auto me-auto" bind:value={$value}></Searchbar>

    <div class="accordion my-3 mx-3 accordion-border-color-dark" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="year_title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#year_collapse" aria-expanded="true" aria-controls="year_collapse">
            Anno di insegnamento
          </button>
        </h2>
        <div id="year_collapse" class="accordion-collapse collapse show" aria-labelledby="year_title">
          <div class="accordion-body">
            <div class="my-2">
              <input type="checkbox" class="btn-check" id="Primo anno" autocomplete="off">
              <label class="btn btn-outline-primary" for="Primo anno">Primo anno</label><br>
            </div>
            <div class="my-2">
              <input type="checkbox" class="btn-check" id="Secondo anno" autocomplete="off">
              <label class="btn btn-outline-secondary" for="Secondo anno">Secondo anno</label><br>
            </div>
            <div class="my-2">
              <input type="checkbox" class="btn-check" id="Terzo anno" autocomplete="off">
              <label class="btn btn-outline-success" for="Terzo anno">Terzo anno</label><br>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="Tags_title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#tags_collapse" aria-expanded="true" aria-controls="tags_collapse">
            Tags
          </button>
        </h2>
        <div id="tags_collapse" class="accordion-collapse collapse show" aria-labelledby="Tags_title">
          <div class="accordion-body">
            <div class="my-2">
              <input type="checkbox" class="btn-check" id="Best Seller" autocomplete="off">
              <label class="btn btn-outline-secondary" for="Best Seller">Best Seller</label><br>
            </div>
            <div class="my-2">
              <input type="checkbox" class="btn-check" id="New" autocomplete="off">
              <label class="btn btn-outline-success" for="New">New</label><br>
            </div>
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
        height: 100vh;
        background-color: $primary;
        border-right: 1px solid $dark;
        resize: horizontal;
        min-width: 20%;
        max-width: 30%;
    }

    .hoverable {
      opacity: 0.5;
    }
    
    .hoverable:hover {
      opacity: 1;
      transition: 0.3s;
    }
</style>