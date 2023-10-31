<script>
    import Icon from '$lib/components/Icon.svelte';
    import Course from '$lib/components/Course.svelte';
    import CourseCard from '$lib/components/CourseCard.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { view, value, filter_tags, dna } from '$lib/stores';
    import { space } from 'svelte/internal';
    
    export let data;
    let courses = data.courses || []
    
    console.log('courses', data, courses)
    
    let filtered = [...courses];
    
    $: $value != undefined && search()
    $: $filter_tags && search()
    $: sort_courses && search()
    
    let favourites_filter;
    
    let sort_courses;
    
    let cartModal;
    
    function search() {
        // if search bar value is empty string show all courses that follow the 
        if ($value == "" || $value == undefined) {
            filtered = [];
            for (let course of courses) {
                let filtered_out = false;
                for (let filter_tag of $filter_tags)
                if (filter_tag.selected && course.tags.indexOf(filter_tag.name) == -1)
                filtered_out = true;
                
                if (!filtered_out)
                filtered.push(course);
            }
            
            if (sort_courses == "name_ascending") {
                filtered.sort((a, b) => {
                    if (a.name < b.name)
                    return -1;
                    else if (a.name == b.name) 
                    return 0;
                    else
                    return 1;
                });
            } else if (sort_courses == "name_descending") {
                filtered.sort((a, b) => {
                    if (a.name > b.name)
                    return -1;
                    else if (a.name == b.name) 
                    return 0;
                    else
                    return 1;
                });
            } else if (sort_courses == "code_ascending") {
                filtered.sort((a, b) => {
                    if (a.code < b.code)
                    return -1;
                    else if (a.code == b.code) 
                    return 0;
                    else
                    return 1;
                });
            } else if (sort_courses == "code_descending") {
                filtered.sort((a, b) => {
                    if (a.code > b.code)
                    return -1;
                    else if (a.code == b.code) 
                    return 0;
                    else
                    return 1;
                });
            }
        }
        // else
        else {
            filtered = [];
            let max_match, match_value, min_dist, add_course;
            
            let dist_threshold = 2;
            let n;
            // split the search bar input in its single words
            let values = $value.split(" ");
            // search in every course a correspondence, comparing it with:
            for (let course of courses) {
                let filtered_out = false;
                for (let filter_tag of $filter_tags)
                if (filter_tag.selected && course.tags.indexOf(filter_tag.name) == -1)
                filtered_out = true;
                
                if (!filtered_out) {
                    min_dist = Infinity;
                    match_value = 0;
                    add_course = false;
                    n = 0;
                    for (let input of values) {
                        if (input != "" && input != "e" && input != "di" && input != "dei" && input != "I") {
                            max_match = 0;
                            n++;
                            
                            // the course's name
                            let words = course.name.split(" ");
                            for (let word of words) {
                                if (word != "" && word != "e" && word != "di" && word != "dei" && word != "I") {
                                    if (word.toLowerCase().includes(input.toLowerCase())) {
                                        min_dist = 0;
                                        max_match = 1;
                                    } else {
                                        min_dist = Math.min(min_dist, edit_distance(word.toLowerCase(), input.toLowerCase()));                               
                                        max_match = Math.max(max_match, 1 - edit_distance(word.toLowerCase(), input.toLowerCase()) / word.length);
                                    }
                                }
                            } 
                            
                            // the course's code
                            if (course.code.toLowerCase().includes(input.toLowerCase())) {
                                min_dist = 0;
                                max_match = 1;
                            } else {
                                min_dist = Math.min(min_dist, edit_distance(course.code.toLowerCase(), input.toLowerCase()));                               
                                max_match = Math.max(max_match, 1 - edit_distance(course.code.toLowerCase(), input.toLowerCase()) / course.code.length);
                            }
                            
                            // the course's professors' names
                            for (let professor of course.professors) {
                                let words = professor.split(" ");
                                for (let word of words) {
                                    if (word.toLowerCase().includes(input.toLowerCase())) {
                                        min_dist = 0;
                                        max_match = 1;
                                    } else {
                                        min_dist = Math.min(min_dist, edit_distance(word.toLowerCase(), input.toLowerCase()));                               
                                        max_match = Math.max(max_match, 1 - edit_distance(word.toLowerCase(), input.toLowerCase()) / word.length);
                                    }       
                                }
                            }
                            match_value += max_match;
                            
                            if (min_dist <= dist_threshold)
                            add_course = true;
                        }
                    }
                    match_value /= n;
                    if (add_course) {
                        course.match = match_value;
                        filtered.push(course);
                    }
                }
            }
            
            filtered.sort((a, b) => {
                if (a.match < b.match)
                return 1;
                else if (a.match == b.match) 
                return 0;
                else
                return -1;
            })
        }
    }
    
    function edit_distance(x, y) {
        let m = x.length;
        let n = y.length;
        
        let copy_cost = 0;
        let delete_cost = 1;
        let insert_cost = 1;
        let twiddle_cost = 0.5;
        
        // initialize two new matrixes m x n
        let c = Array(m).fill().map(() => Array(n).fill())
        let op = Array(m).fill().map(() => Array(n).fill())
        for (let i = 0; i < m; i++) {
            c[i][0] = i * delete_cost;
            op[i][0] = "delete";
        }
        for (let j = 0; j < n; j++) {
            c[0][j] = j * insert_cost;
            op[0][j] = "insert";
        }
        
        // fill the matrix
        let i, j;
        for (i = 1; i < m; i++) {
            for (j = 1; j < n; j++) {
                c[i][j] = Infinity;
                if (x.charAt(i) == y.charAt(j)) {
                    c[i][j] = c[i - 1][j - 1] + copy_cost;
                    op[i][j] = "copy";
                }
                if (x.charAt(i) != y.charAt(j) && c[i - 1][j - 1] + replace_cost < c[i][j]) {
                    c[i][j] = c[i - 1][j - 1] + replace_cost(x.charAt(i), y.charAt(j));
                    op[i][j] = "replace";
                }
                if (c[i - 1][j] + delete_cost < c[i][j]) {
                    c[i][j] = c[i - 1][j] + delete_cost;
                    op[i][j] = "delete";
                }
                if (c[i][j - 1] + insert_cost < c[i][j]) {
                    c[i][j] = c[i][j - 1] + insert_cost;
                    op[i][j] = "insert";
                }
                if (i >= 2 && j >= 2 && x.charAt(i) == y.charAt(j - 1) && x.charAt(i - 1) == y.charAt(j) && c[i - 2][j - 2] + twiddle_cost < c[i][j]) {
                    c[i][j] = c[i - 2][j - 2] + twiddle_cost;
                    op[i][j] = "twiddle";
                }
            }
        }
        return c[i - 1][j - 1];
    }
    
    function replace_cost(key1, key2) {
        // QWERTY keys position table
        const keyboardMap = {
            q: { row: 0, col: 0 },
            w: { row: 0, col: 1 },
            e: { row: 0, col: 2 },
            r: { row: 0, col: 3 },
            t: { row: 0, col: 4 },
            y: { row: 0, col: 5 },
            u: { row: 0, col: 6 },
            i: { row: 0, col: 7 },
            o: { row: 0, col: 8 },
            p: { row: 0, col: 9 },
            a: { row: 1, col: 0 },
            s: { row: 1, col: 1 },
            d: { row: 1, col: 2 },
            f: { row: 1, col: 3 },
            g: { row: 1, col: 4 },
            h: { row: 1, col: 5 },
            j: { row: 1, col: 6 },
            k: { row: 1, col: 7 },
            l: { row: 1, col: 8 },
            z: { row: 2, col: 0 },
            x: { row: 2, col: 1 },
            c: { row: 2, col: 2 },
            v: { row: 2, col: 3 },
            b: { row: 2, col: 4 },
            n: { row: 2, col: 5 },
            m: { row: 2, col: 6 }
        };
        
        // check if the table includes the two input characters
        key1 = key1.toLowerCase();
        key2 = key2.toLowerCase();
        if (!keyboardMap.hasOwnProperty(key1) || !keyboardMap.hasOwnProperty(key2))
        return "Error";
        
        // calculate the distance bewteen the two inputs
        const rowDistance = Math.abs(keyboardMap[key1].row - keyboardMap[key2].row);
        const colDistance = Math.abs(keyboardMap[key1].col - keyboardMap[key2].col);
        const distance = Math.sqrt(rowDistance ** 2 + colDistance ** 2);
        
        // get the maximum possible distance
        max_dist = Math.sqrt(Math.abs(keyboardMap.p.row - keyboardMap.z.row) ** 2 + Math.abs(keyboardMap.p.col - keyboardMap.z.col) ** 2);
        // and normalize the calculated distance
        return Math.map(distance, 0, max_dist, 0, 2);
    }
    
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }
</script>

<div class="d-flex flex-column content bg-light">
    <div class="d-flex justify-content-between mt-5">
        {#if $value == undefined || $value == ""}
            <span class="display-6 text-dark">Tutti i corsi</span>
        {:else}
            <span class="display-6 text-dark">Risultati per: {$value}</span>
        {/if}

        <div class="d-flex">
            <div class="btn-group" role="group">
                <input type="radio" class="btn-check" name="view" id="btnradio1" autocomplete="off" value="list" class:active={$view == 'list'} bind:group={$view}>
                <label class="btn btn-outline-primary border-dark align-self-center px-3 py-2" for="btnradio1"><i class="text-dark fs-2 bi bi-list"></i></label>
                
                <input type="radio" class="btn-check" name="view" id="btnradio2" autocomplete="off" value="grid" class:active={$view == 'grid'} bind:group={$view}>
                <label class="btn btn-outline-primary border-dark align-self-center px-3 py-2" for="btnradio2"><i class="text-dark fs-2 bi bi-border-all"></i></label>
                
                <input type="radio" class="btn-check" name="view" id="btnradio3" autocomplete="off" value="graph" class:active={$view == 'graph'} bind:group={$view} disabled>
                <label class="btn btn-outline-primary border-dark align-self-center px-3 py-2 cursor-not-allowed" for="btnradio3"><i class="text-dark fs-2 bi bi-diagram-3"></i></label>
            </div>
        </div>
    </div>
    
    <!-- filters and cart -->
    <div class="d-flex my-4 justify-content-between">
        <div class="d-flex align-items-center">
            {#if $filter_tags.length == 2}
                <span class="py-2"><i class="icon bi bi-funnel"></i></span>
                <h4 class="fs-1 ms-3 my-0">Nessun filtro selezionato</h4>
            {:else}
                <span class="py-2"><i class="icon bi bi-funnel-fill"></i></span>
            {/if}
            {#each $filter_tags as tag}
                {#if tag.selected}
                    <span class="badge my-auto p-2 bg-{ tag.color } ms-3 filter_badge text-dark">{ tag.name }</span>
                {/if}
            {/each}
        </div>
        
        <div class="d-flex align-items-center">
            <!-- sort -->
            {#if $value == undefined || $value == ""}
                <select class="form-select me-3" placeholder="Ordina per:" aria-label="Default select example" bind:value={sort_courses}>
                    <option class="opt" value="name_ascending">Nome - crescente</option>
                    <option class="opt" value="name_descending">Nome - decrescente</option>
                    <option class="opt" value="code_ascending">Codice - crescente</option>
                    <option class="opt" value="code_descending">Codice - decrescente</option>
                </select>
            {:else}
                <select class="form-select me-3" placeholder="Ordina per:" aria-label="Default select example" disabled>
                    <option value="name_ascending">Corrispondenza</option>
                </select>
            {/if}
            
            <!-- favourites filter -->
            <div>
                <input type="checkbox" class="btn-check" id="favourites_filter" autocomplete="off" bind:checked={favourites_filter}>
                <label class="btn btn-outline-light text-dark border-light" for="favourites_filter">
                    {#if favourites_filter}
                    <i class="icon me-2 text-secondary bi bi-heart-fill"></i>
                    {:else}
                    <i class="icon me-2 text-dark bi bi-heart" ></i>
                    {/if}
                </label><br>
            </div>
            
            <!-- cart button -->
            <button type="button" class="btn btn-light position-relative" on:click={openCart}>
                <i class="icon text-dark bi bi-cart"></i>
                <span class="badge bg-secondary rounded-pill position-absolute" style="right: 2px; top: 8px;">{courses.reduce((acc, course) => acc + (course.in_cart ? 1 : 0), 0)}</span>
            </button>
        </div>  
    </div>
    
    <!-- courses -->
    {#if filtered.length != 0}
        {#if $view == "list"}
            <!-- list view -->
            {#each filtered as course}
                <Course {course} class="mb-3"/>
            {/each}
        {:else if $view == "grid"}
            <!-- grid view -->
            <div class="d-flex flex-wrap justify-content-between align-content-between">
                {#each filtered as course}
                    <CourseCard {course} class="g-col-6 g-col-md-4 mb-3 me-3"/>
                {/each}
            </div>
        {:else}
            <!-- graph view -->
        {/if}
    {:else}
        <h2>Nessun risultato trovato</h2>
    {/if}
</div>

<!-- Carrello -->
<Modal title="Carrello" yes="Acquista" no="Chiudi" classes="bg-primary border-dark" theme="btn-outline-primary" bind:this={cartModal}>
    {#each courses as course}
        {#if course.in_cart}
            <div class="d-flex m-4 justify-content-between">
                <div>
                    <h2>{course.code} - {course.name}</h2>
                    {#each course.professors as professor, i}
                        <span class="text-dark">{professor}{i != course.professors.length - 1 ? " / " : ""}</span>
                    {/each}
                    <div class="d-flex mt-3">
                        <section class="btn-group">
                            <div class="me-2">
                                <input type="radio" class="btn-check" name="{course.name} accesso" id="{course.name} base">
                                <label class="btn btn-outline-primary text-dark fs-3 px-4 py-2 border-dark rounded-pill" for="{course.name} base">
                                    Base
                                </label>
                            </div>
                            <div class="me-2">
                                <input type="radio" class="btn-check" name="{course.name} accesso" id="{course.name} completo" checked>
                                <label class="btn btn-outline-primary text-dark fs-3 px-4 py-2 border-dark rounded-pill" for="{course.name} completo">
                                    Completo
                                </label>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="d-flex">
                    <h2 class="align-self-center fs-1 my-0">{5 + course.CFU * 5 / 3}</h2>
                    <img style="width: 1.5rem;" src="/src/style/DNA.svg" alt="DNA">
                </div>
            </div>
            <hr class="m-0">
        {/if}
    {/each}
    {#if courses.reduce((acc, course) => acc + (course.in_cart ? 1 : 0), 0) > 0}
        <hr class="m-0 border-2 opacity-100">
    {/if}
    <div class="d-flex w-100 px-4 pt-3 justify-content-between">
        <h2 class="m-0 fs-1 align-self-left">Sequenze di DNA</h2>
        <div class="d-flex">
            <h2 class="m-0 fs-1 align-self-right">{$dna}</h2>
            <img style="width: 1.5rem;" src="/src/style/DNA.svg" alt="DNA">
        </div>
    </div>
    <div class="d-flex w-100 px-4 pt-3 justify-content-between">
        <h2 class="m-0 fs-1 align-self-center">Totale</h2>
        <div class="d-flex">
            <h2 class="m-0 fs-1 align-self-center">{courses.reduce((acc, curr) => {
                if (curr.in_cart)
                acc += 5 + curr.CFU * 5 / 3;
                return acc;
            }, 0)}</h2>
            <img style="width: 1.5rem;" src="/src/style/DNA.svg" alt="DNA">
        </div>
    </div>
    <div class="d-flex w-100 px-4 py-3 justify-content-between">
        <h2 class="m-0 fs-1 align-self-center">Rimanente</h2>
        <div class="d-flex">
            <h2 class="m-0 fs-1 align-self-center">{$dna - courses.reduce((acc, curr) => {
                if (curr.in_cart)
                acc += 5 + curr.CFU * 5 / 3;
                return acc;
            }, 0)}</h2>
            <img style="width: 1.5rem;" src="/src/style/DNA.svg" alt="DNA">
        </div>
    </div>
</Modal>

<style lang="scss">
    @import '$css/variables.scss';
    .content {
        padding-left: 5rem;
        padding-right: 5rem;
    }
    
    .custom-scrollbar {
        scroll-behavior: smooth;
    }
    
    .icon {
        font-size: 24px;
    }
    
    .filter_badge {
        border: 1px solid $dark;
    }
    
    :root {
        --scroll-size: 10px;
        --scroll-track: $light;
        --scroll-thumb: $primary;
        --scroll-thumb-radius: 5px;
    }
</style>