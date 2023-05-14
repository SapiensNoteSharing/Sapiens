<script>
import Icon from '$lib/components/Icon.svelte';
import Course from '$lib/components/Course.svelte';
import CourseCard from '$lib/components/CourseCard.svelte';
import { view, value, filter_tags, dna } from '$lib/stores';

let courses = [
    {
        name: 'Geometria e algebra Lineare',
        CFU: '6',
        code: 'B003273',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Caterina Stoppato', 'Giorgio Ottaviani'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: [],
        favourite: true,
        in_cart: false,
        owned: false,
        content: "",
        chapters: [
            {
                title: "1. Spazio euclideo e vettori",
                paragraphs: [
                    "1.1. I vettori",
                    "1.2. Sistemi di riferimento e coordinate",
                    "1.3. Le coordinate cartesiane",
                    "1.4. Prodotto vettoriale e prodotto misto",
                    "1.5. Rette e piani nello spazio",
                ],
            },
            {
                title: "2. Sistemi lineari",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "3. Algebra delle matrici",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "4. Spazi vettoriali e applicazioni lineari",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "5. Determinante",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "6. Autovalori e autovettori",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "7. Spazi euclidei",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "8. Teorema spettrale e forme quadratiche",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 5,
        reviews_number: 13,
        match: 0,
    },
    {
        name: 'Analisi Matematica I',
        CFU: '9',
        code: 'B019481',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Serena Matucci'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: ["New!"],
        favourite: false,
        in_cart: false,
        owned: true,
        chapters: [
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 3.5,
        reviews_number: 2,
        match: 0,
    },
    {
        name: 'Fisica I',
        CFU: '6',
        code: 'B006853',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Fabio Cinti'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: ["New!", "Best Seller"],
        favourite: true,
        in_cart: false,
        owned: true,
        chapters: [
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 2,
        reviews_number: 9,
        match: 0,
    },
    {
        name: 'Fondamenti di Informatica',
        CFU: '9',
        code: 'B024280',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Stefano Berretti'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: ["Best Seller"],
        favourite: false,
        in_cart: false,
        owned: false,
        chapters: [
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 4,
        reviews_number: 5,
        match: 0,
    }
];

let filtered = [...courses];

$: $value != undefined && search()
$: $filter_tags && search()

let cart_items = [...courses];

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
                <label class="btn btn-outline-primary border-dark" for="btnradio1"><i class="bi bi-list"></i></label>
        
                <input type="radio" class="btn-check" name="view" id="btnradio2" autocomplete="off" value="grid" class:active={$view == 'grid'} bind:group={$view}>
                <label class="btn btn-outline-primary border-dark" for="btnradio2"><i class="bi bi-border-all"></i></label>

                <input type="radio" class="btn-check" name="view" id="btnradio3" autocomplete="off" value="graph" disabled class:active={$view == 'graph'} bind:group={$view}>
                <label class="btn btn-outline-primary border-dark"  for="btnradio3"><i class="bi bi-diagram-3"></i></label>
            </div>
        </div>
    </div>

    <!-- filters and cart -->
    <div class="d-flex my-4 justify-content-between">
        <div class="d-flex">
            {#if $filter_tags.length == 0}
                <span class="py-2"><i class="icon bi bi-funnel"></i></span>
            {:else}
                <span class="py-2"><i class="icon bi bi-funnel-fill"></i></span>
            {/if}
            {#each $filter_tags as tag}
                {#if tag.selected}
                    <span class="badge my-auto p-2 bg-{ tag.color } ms-3 ">{ tag.name }</span>
                {/if}
            {/each}
        </div>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-light position-relative" data-bs-toggle="modal" data-bs-target="#shoppingCart">
            <i class="icon text-dark bi bi-cart"></i>
            <span class="badge bg-secondary rounded-pill position-absolute" style="right: 2px; top: 8px;">{cart_items.length}</span>
        </button>
    </div>

    <!-- courses -->
    {#if filtered.length != 0}
        {#if $view == "list"}
            <!-- list view -->
            {#each filtered as course}
                <Course {course} class="mb-3 bg-primary"/>
            {/each}
        {:else if $view == "grid"}
            <!-- grid view -->
            <div class="d-flex flex-wrap justify-content-between align-content-between">
                {#each filtered as course}
                    <CourseCard {course} class="g-col-6 g-col-md-4 mb-3 me-3 bg-primary border-dark"/>
                {/each}
            </div>
        {:else}
            <!-- graph view -->
        {/if}
    {:else}
        <h2>Nessun risultato trovato</h2>
    {/if}

    <!-- Carrello -->
    <div class="modal fade" id="shoppingCart" tabindex="-1" aria-labelledby="shoppingCartLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content border-dark">
                <div class="modal-header bg-primary border-dark">
                    <h1 class="modal-title fs-1" id="shoppingCartLabel">Carrello</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0">
                    {#each cart_items as cart_item}
                        <div class="d-flex m-4 justify-content-between">
                            <div>
                                <h2>{cart_item.code} - {cart_item.name}</h2>
                                {#each cart_item.professors as professor, i}
                                    <span class="text-dark">{professor}{i != cart_item.professors.length - 1 ? " / " : ""}</span>
                                {/each}
                                <div class="d-flex mt-3">
                                    <div class="form-check me-4">
                                        <input class="form-check-input" type="radio" name="{cart_item.name} accesso" id="{cart_item.name} base">
                                        <label class="form-check-label" for="{cart_item.name} base">
                                            Base
                                        </label>
                                    </div>
                                    <div class="form-check me-4">
                                        <input class="form-check-input" type="radio" name="{cart_item.name} accesso" id="{cart_item.name} Completo" checked>
                                        <label class="form-check-label" for="{cart_item.name} Completo">
                                            Completo
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex">
                                <!-- * (document.getElementById(`${curr.name} base`).checked ? 0.8 : 1) -->
                                <h2 class="align-self-center fs-1 my-0">{5 + cart_item.CFU * 5 / 3}</h2>
                                <img style="width: 1.5rem;" src="/src/style/DNA.svg" alt="DNA">
                            </div>
                        </div>
                        <hr class="m-0">
                    {/each }
                    <div class="d-flex m-4 justify-content-between">
                        <h2 class="m-0 fs-1 align-self-center">Totale</h2>
                        <div class="d-flex">
                            <h2 class="m-0 fs-1 align-self-center">{cart_items.reduce((acc, curr) => {
                                acc += 5 + curr.CFU * 5 / 3;
                                return acc;
                            }, 0)}</h2>
                            <img style="width: 1.5rem;" src="/src/style/DNA.svg" alt="DNA">
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-dark">
                    <button type="button" class="btn btn-secondary border-dark" data-bs-dismiss="modal">Chiudi</button>
                    <button type="button" class="btn btn-primary border-dark" onclick="buy_cart();">Acquista</button>
                </div>
            </div>
        </div>
    </div>
</div>

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

    :root {
        --scroll-size: 10px;
        --scroll-track: $light;
        --scroll-thumb: $primary;
        --scroll-thumb-radius: 5px;
    }
</style>