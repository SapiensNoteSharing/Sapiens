let sorting_methods = [
    {id:"chronological_order", name:"Periodo · cronologico"},
    {id:"chronological_reverse", name:"Periodo · cronologico inverso"},
    {id:"name_ascending", name:"Nome · alfabetico crescente"},
    {id:"name_descending", name:"Nome · alfabetico decrescente"},
    {id:"code_ascending", name:"Codice · crescente"},
    {id:"code_descending", name:"Codice · decrescente"},
    {id:"no_order", name:"Nessun ordinamento"}
]

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

export function sort_course_list(course_list, sort_method = sorting_method) {
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
export function filter_course_list(course_list) {
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