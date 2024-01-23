<script>
    import CourseCard from '$lib/components/CourseCard.svelte';
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import { value, filter_tags } from '$lib/stores';
    import { page } from '$app/stores';

    export let data;
    let courses = data.courses || [];
    let user = data.user || {};

    let owned = [
        courses.find(course => course.name == "Analisi Matematica I"),
        courses.find(course => course.name == "Fisica I"),
        courses.find(course => course.name == "Algoritmi e strutture dati"),
    ].filter(Boolean);

    // elenco dei corsi non posseduti
    let ownedCoursesNames = owned.map(course => course.name);
    let not_owned = courses.filter(course => !ownedCoursesNames.includes(course.name));

    let sorting_method = "chronological_order";

    function sort_course_list(course_list, sort_method = sorting_method) {
        switch(sort_method) {
            case "no_order":
                course_list.sort((a, b) => {
                    if (Math.random() < 0.5)
                        return -1;
                    else
                        return 1;
                });
                break;
            case "name_ascending":
                course_list.sort((a, b) => {
                    if (a.name < b.name)
                        return -1;
                    else if (a.name == b.name) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "name_descending":
                course_list.sort((a, b) => {
                    if (a.name > b.name)
                        return -1;
                    else if (a.name == b.name) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "code_ascending":
                course_list.sort((a, b) => {
                    if (a.code < b.code)
                        return -1;
                    else if (a.code == b.code) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "code_descending":
                course_list.sort((a, b) => {
                    if (a.code > b.code)
                        return -1;
                    else if (a.code == b.code) 
                        return 0;
                    else
                        return 1;
                });
                break;
            case "chronological_order":
                course_list.sort((a, b) => {
                    const yearOrder = { "Primo": 1, "Secondo": 2, "Terzo": 3 };
                    const semesterOrder = { "Primo e secondo": 0, "Primo": 1, "Secondo": 2 };

                    if (yearOrder[a.year] < yearOrder[b.year])
                        return -1;
                    else if (yearOrder[a.year] == yearOrder[b.year]) {
                        if (semesterOrder[a.semester] < semesterOrder[b.semester])
                            return -1;
                        else if (semesterOrder[a.semester] == semesterOrder[b.semester])
                            return 0;
                        else
                            return 1;
                    } else
                        return 1;
                });
                break;
            case "chronological_reverse":
                course_list.sort((a, b) => {
                    const yearOrder = { "Primo": 1, "Secondo": 2, "Terzo": 3 };
                    const semesterOrder = { "Primo e secondo": 0, "Primo": 1, "Secondo": 2 };

                    if (yearOrder[a.year] < yearOrder[b.year])
                        return 1;
                    else if (yearOrder[a.year] == yearOrder[b.year]) {
                        if (semesterOrder[a.semester] < semesterOrder[b.semester])
                            return 1;
                        else if (semesterOrder[a.semester] == semesterOrder[b.semester])
                            return 0;
                        else
                            return -1;
                    } else
                        return -1;
                });
                break;
        }
    }

    function filter_course_list(course_list) {
        let filtered_courses_list = [];

        // per ogni corso
        for (let course of course_list) {
            // si controllano prima i filtri
            let filtered_out = false;
            for (let filter_tag of $filter_tags)
                if (filter_tag.selected && course.tags.indexOf(filter_tag.name) == -1)
                    filtered_out = true;

            // se il corso ha superato il test e se la barra di ricerca è vuota
            if (!filtered_out && $value != "" && $value != undefined) {
                let max_match;
                let min_dist = Infinity;
                let match_value = 0;
                let add_course = false;
                let n = 0;
                let dist_threshold = 2;

                // split the search bar input in its single words
                let values = $value.split(" ");

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
                        if (course.code) {
                            if (course.code.toLowerCase().includes(input.toLowerCase())) {
                                min_dist = 0;
                                max_match = 1;
                            } else {
                                min_dist = Math.min(min_dist, edit_distance(course.code.toLowerCase(), input.toLowerCase()));                               
                                max_match = Math.max(max_match, 1 - edit_distance(course.code.toLowerCase(), input.toLowerCase()) / course.code.length);
                            }
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
                    filtered_courses_list.push(course);
                }
            } else {
                filtered_courses_list.push(course);
            }
        }

        if ($value != "" && $value != undefined) {
            filtered_courses_list.sort((a, b) => {
                if (a.match < b.match)
                    return 1;
                else if (a.match == b.match) 
                    return 0;
                else
                    return -1;
            })
        }

        return filtered_courses_list;
    }
    
    function filter_and_sort(course_list) {
        let filtered_course_list = filter_course_list(course_list)
        sort_course_list(filtered_course_list)

        return filtered_course_list
    }

    let filtered_not_owned = filter_and_sort(not_owned)

    $: sorting_method && (filtered_not_owned = filter_and_sort(not_owned))
    $: $filter_tags && (filtered_not_owned = filter_and_sort(not_owned))
    $: $value !== undefined && (filtered_not_owned = filter_and_sort(not_owned))
    
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
    
    let cartModal;
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }

    let course = courses[0];

    let selected_option = "base";
</script>

<Modal title="Carrello" yes="Acquista" no="Annulla" classes="" theme="btn-outline-primary" bind:this={cartModal}>
    <div class="d-flex m-4 justify-content-between">
        <div>
            <span class="display-6">{course.code}</span>
            <h2 class="display-4 text-dark">{course.name}</h2>
            {#each course.professors as professor, i}
                <span class="text-dark">{professor}{i != course.professors.length - 1 ? " / " : ""}</span>
            {/each}
            <div class="d-flex mt-3">
                <div class="d-flex flex-row justify-content-start me-2">
                    <ActiveButton
                    type="navigation_link"
                    active={selected_option == "base" ? 'active' : 'not-active'}
                    fill={selected_option == "base" ? '-fill' : ''}
                    class={"me-3"}
                    text={"Base"}
                    icon={"bi-file-earmark"}
                    on:click={() => selected_option = "base"}
                    />

                    <ActiveButton 
                    type="navigation_link"
                    active={selected_option == "complete" ? 'active' : 'not-active'}
                    fill={selected_option == "complete" ? '-fill' : ''}
                    class={"me-3"}
                    text={"Completo"}
                    icon={"bi-folder"}
                    on:click={() => selected_option = "complete"}
                    />
                </div>
            </div>
        </div>
        <div class="d-flex">
            <h2 class="align-self-center display-3 my-0">{(10 + course.cfu * 5 / 6) * (selected_option == "base" ? 0.8 : 1) * 2}</h2>
            <img style="width: 2rem;" src="/src/style/DNA.svg" alt="DNA">
        </div>
    </div>
</Modal>

<div class="d-flex flex-column">
    <div class="d-flex flex-row mb-5">
        <ActiveButton
        type={"navigation_link"}
        active={$page.route.id.startsWith("/(app)/negozio/pacchetti") ? 'active' : 'not-active'}
        fill={$page.route.id.startsWith("/(app)/negozio/pacchetti") ? '-fill' : ''}
        class={"me-3"}
        text={"Pacchetti"}
        icon={"bi-box-seam"}
        href={"/negozio/pacchetti"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id.startsWith("/(app)/negozio/corsi_singoli") ? 'active' : 'not-active'}
        fill={$page.route.id.startsWith("/(app)/negozio/corsi_singoli") ? '-fill' : ''}
        class={"me-3"}
        text={"Corsi singoli"}
        icon={"bi-1-circle"}
        href={"/negozio/corsi_singoli"}
        />

        <ActiveButton 
        type={"navigation_link"}
        active={$page.route.id == "/(app)/negozio/punti_dna" ? 'active' : 'not-active'}
        fill={$page.route.id == "/(app)/negozio/punti_dna" ? '-fill' : ''}
        class={"me-3"}
        text={"Punti DNA"}
        icon={"bi-cart"}
        href={"/negozio/punti_dna"}
        />
    </div>

    <div class="d-flex mb-5 justify-content-between">
        <div class="d-flex align-items-center">
            {#if $filter_tags.length == 2}
                <span class=""><i class="icon bi bi-funnel"></i></span>
                <h4 class="fs-6 ms-3 my-0">Nessun filtro selezionato</h4>
            {:else}
                <span class="py-2"><i class="icon bi bi-funnel-fill"></i></span>
            {/if}

            {#each $filter_tags as tag}
                {#if tag.selected}
                    <span class="badge my-auto p-2 bg-{tag.color} ms-3 filter_badge text-dark">{tag.name}</span>
                {/if}
            {/each}
        </div>
        
        <div class="d-flex align-items-center">
            {#if $value != "" && $value != undefined}
                <select class="form-select me-3" placeholder="Ordina per:" aria-label="Default select example" bind:value={sorting_method} disabled>
                    <option class="opt" value="match_ascending" selected>Corrispondenza</option>
                </select>
            {:else}
                <select class="form-select me-3" placeholder="Ordina per:" aria-label="Default select example" bind:value={sorting_method}>
                    <option class="opt" value="chronological_order" selected>Periodo · cronologico</option>
                    <option class="opt" value="chronological_reverse">Periodo · cronologico inverso</option>
                    <option class="opt" value="name_ascending">Nome · alfabetico crescente</option>
                    <option class="opt" value="name_descending">Nome · alfabetico decrescente</option>
                    <option class="opt" value="code_ascending">Codice · crescente</option>
                    <option class="opt" value="code_descending">Codice · decrescente</option>
                    <option class="opt" value="no_order">Nessun ordinamento</option>
                </select>
            {/if}
        </div>
    </div>

    {#if filtered_not_owned.length != 0}
        <div class="d-flex flex-wrap justify-content-between align-content-between">
            {#if sorting_method == "chronological_order" || sorting_method == "chronological_reverse"}
                <div class="w-100 mb-3">
                    <h3 class="display-3 m-0" on:click={openCart}>{filtered_not_owned[0].year} anno</h3>
                </div>
                <div class="w-100 mb-4">
                    <h3 class="display-4 m-0">{filtered_not_owned[0].semester} semestre</h3>
                </div>
                {#each filtered_not_owned as course, $index}
                    {#if $index > 0}
                        {#if course.year != filtered_not_owned[$index - 1].year}
                            <div class="w-100 mb-3">
                                <h3 class="display-3 m-0">{course.year} anno</h3>
                            </div>
                            <div class="w-100 mb-4">
                                <h3 class="display-4 m-0">{course.semester} semestre</h3>
                            </div>
                        {:else if course.semester != filtered_not_owned[$index - 1].semester}
                            <div class="w-100 mb-4">
                                <h3 class="display-4 m-0">{course.semester} semestre</h3>
                            </div>
                        {/if}
                    {/if}
                    <CourseCard {course} owned=0 class="g-col-4 mb-5" href="/negozio/corsi_singoli/dettagli_corso"/>
                {/each}
            {:else if sorting_method == "name_ascending" || sorting_method == "name_descending"}
                <div class="w-100 mt-3">
                    <h3 class="display-3 m-0">{filtered_not_owned[0].name[0]}</h3>
                </div>
                {#each filtered_not_owned as course, $index}
                    {#if $index > 0}
                        {#if course.name[0] != filtered_not_owned[$index - 1].name[0]}
                            <div class="w-100 my-4">
                                <h3 class="display-4">{course.name[0]}</h3>
                            </div>
                        {/if}
                    {/if}
                    <CourseCard {course} owned={false} class="g-col-4 mb-5" href="/negozio/corsi_singoli/dettagli_corso"/>
                {/each}
            {:else}
                {#each filtered_not_owned as course}
                    <CourseCard {course} owned={false} class="g-col-4 mb-5" href="/negozio/corsi_singoli/dettagli_corso"/>
                {/each}
            {/if}
        </div>
    {:else}
        <h2>Hai comprato tutti i corsi disponibili! Grazie!</h2>
    {/if}
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>