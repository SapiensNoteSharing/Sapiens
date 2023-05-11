<script>
import Icon from '$lib/components/Icon.svelte';
import Course from '$lib/components/Course.svelte';
import Searchbar from '$lib/components/Searchbar.svelte';
import { view } from '$lib/stores';

let value = undefined;

let courses = [
    {
        professors: ['Caterina Stoppato', 'Giorgio Ottaviani'],
        code: 'B003273',
        name: 'Geometria e algebra Lineare',
        CFU: '6',
        match: 0
    },
    {
        professors: ['Serena Matucci'],
        code: 'B019481',
        name: 'Analisi Matematica I',
        CFU: '9',
        match: 0
    },
    {
        professors: ['Fabio Cinti'],
        code: 'B003273',
        name: 'Fisica I',
        CFU: '6',
        match: 0
    },
    {
        professors: ['Stefano Berretti'],
        code: 'B003273',
        name: 'Fondamenti di Informatica',
        CFU: '9',
        match: 0
    }
];

let filtered = [...courses];

$: value != undefined && search()

function search() {
    console.clear();
    // if search bar value is empty string show all courses
    if (value == "")
        filtered = [...courses];
    // else
    else {
        filtered = [];
        // console.clear();
        let dist_threshold = 3;
        let min_dist, name_dist, code_dist, professor_dist;
        let match_value, name_match, code_match, professor_match;
        let add_course;
        // split the search bar input in its single words
        let values = value.split(" ");
        // search in every course a correspondence, comparing it with:
        for (let course of courses) {
            add_course = false;
            for (let input of values) {
                if (input.length > 3) {
                    let words = course.name.split(" ");
                    min_dist = Infinity;
                    for (let word of words) {
                        if (word.length > 3) {
                            if (word.toLowerCase().includes(input.toLowerCase())) {
                                min_dist = 0;
                                name_dist = 0;
                                name_match = 1;
                            } else
                                min_dist = Math.min(min_dist, edit_distance(word.toLowerCase(), input.toLowerCase()));
                        }
                    } 
                    name_dist += min_dist;
                    name_match = 1 - name_dist / course.name.length;

                    // the course's code
                    min_dist = Infinity;
                    code_match = 0;
                    if (course.code.toLowerCase().includes(input.toLowerCase())) {
                        min_dist = 0;
                        code_dist = 0;
                        code_match = 1;
                    } else if (edit_distance(course.code.toLowerCase(), input.toLowerCase()) < min_dist) {
                        min_dist = edit_distance(course.code.toLowerCase(), input.toLowerCase());
                        code_dist = min_dist;
                        code_match = 1 - code_dist / course.code.length;
                    }
                    

                    professor_dist = Infinity;
                    for (let professor of course.professors) {
                        let words = professor.split(" ");
                        for (let word of words) {
                            // calculate the distance with the course's code
                            if (word.toLowerCase().includes(input.toLowerCase())) {
                                professor_dist = 0;
                                professor_match = 1;
                            } else if (edit_distance(word.toLowerCase(), input.toLowerCase()) < professor_dist) {
                                professor_dist = edit_distance(word.toLowerCase(), input.toLowerCase());
                                professor_match = 1 - professor_dist / word.length;
                            }
                        }
                    }
                }
                min_dist = Infinity;
                if (name_dist < min_dist) {
                    min_dist = name_dist;
                    match_value = name_match;
                }
                if (code_dist < min_dist) {
                    min_dist = code_dist;
                    match_value = code_match;
                }
                if (professor_dist < min_dist) {
                    min_dist = professor_dist;
                    match_value = professor_match;
                }
                if (min_dist <= dist_threshold) {
                    add_course = true;
                    course.match_value = match_value;
                    console.log(course.name, match_value);
                }
            }
            
            if (add_course)
                filtered.push(course);
        }
    }
}
    

function edit_distance(x, y) {
    let m = x.length;
    let n = y.length;

    let copy_cost = 0;
    let replace_cost = 5;
    let delete_cost = 1;
    let insert_cost = 1;
    let twiddle_cost = 1;

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
                c[i][j] = c[i - 1][j - 1] + replace_cost;
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
</script>

<div class="d-flex flex-column content">
    <div class="d-flex align-items-center my-5">
        <h2 class="ms-auto me-auto display-2">I Miei Corsi</h2>
        <i class="bi bi-gear display-6 text-secondary"></i>
    </div>
        <div class="d-flex justify-content-between mb-5">
            <div/>
            
            <Searchbar class="" bind:value></Searchbar>

            <div class="btn-group" role="group">
                <input type="radio" class="btn-check" name="view" id="btnradio1" autocomplete="off" value="list" class:active={$view == 'list'} bind:group={$view}>
                <label class="btn btn-outline-primary" for="btnradio1"><i class="bi bi-list"></i></label>
        
                <input type="radio" class="btn-check" name="view" id="btnradio2" autocomplete="off" value="grid" class:active={$view == 'grid'} bind:group={$view}>
                <label class="btn btn-outline-primary" for="btnradio2"><i class="bi bi-border-all"></i></label>

                <input type="radio" class="btn-check" name="view" id="btnradio3" autocomplete="off" value="graph" class:active={$view == 'graph'} bind:group={$view}>
                <label class="btn btn-outline-primary"  for="btnradio3"><i class="bi bi-diagram-3"></i></label>
            </div>
        </div>
        {#each filtered as course}
            <Course {course} class="mb-3 bg-primary dark btn-outline-dark"/>
        {/each}
</div>

<style>
    .content {
        padding-left: 5rem;
        padding-right: 5rem;
    }
</style>
