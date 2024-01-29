<script>
    import Bundle from '$lib/components/Bundle.svelte';
    import { user } from '$lib/stores'
    export let data;
    let courses = data.courses || [];
    let owned = data.my_courses || [];

    function get_semester_bundle_courses() {
        let semester_bundle_courses = [];
        for (let course of courses) {
            if (
                // course?.university?.name == $user?.university?.name &&
                course?.degree?.name == $user?.degree?.name &&
                course?.degree?.type == $user?.degree?.type &&
                course?.year == $user?.year &&
                course?.semester == $user?.semester
            ) {
                semester_bundle_courses.push(JSON.parse(JSON.stringify({ ...course, owned: owned.includes(course) })));
            }
        }
        return semester_bundle_courses
    }

    function get_year_bundle_courses() {
        let year_bundle_courses = [];
        for (let course of courses) {
            if (
                // course?.university?.name == $user?.university?.name &&
                course?.degree?.name == $user?.degree?.name &&
                course?.degree?.type == $user?.degree?.type &&
                course?.year == $user?.year
            ) {
                year_bundle_courses.push(JSON.parse(JSON.stringify({ ...course, owned: owned.includes(course) })));
            }
        }
        return year_bundle_courses
    }

    function get_degree_bundle_courses() {
        let degree_bundle_courses = [];
        for (let course of courses) {
            if (
                // course?.university?.name == $user?.university?.name &&
                course?.degree?.name == $user?.degree?.name &&
                course?.degree?.type == $user?.degree?.type
            ) {
                degree_bundle_courses.push(JSON.parse(JSON.stringify({ ...course, owned: owned.includes(course) })));
            }
        }

        return degree_bundle_courses
    }

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

    let semester_bundle_courses;
    let year_bundle_courses;
    let degree_bundle_courses;

    function load_bundles() {
        semester_bundle_courses = get_semester_bundle_courses()
        sort_course_list(semester_bundle_courses, "chronological_order");
        year_bundle_courses = get_year_bundle_courses()
        sort_course_list(year_bundle_courses, "chronological_order");
        degree_bundle_courses = get_degree_bundle_courses()
        sort_course_list(degree_bundle_courses, "chronological_order");
    }

    load_bundles();
</script>

<div class="d-flex flex-column">
    <div class="row g-3 mb-4">
        <Bundle 
            type="semester" 
            class="col-md-4"
            courses={semester_bundle_courses} 
            title={"Pacchetto semestrale"} 
            subtitle={`${$user?.semester}` + " semestre"} 
            href="/negozio/pacchetti/{$user?.semester?.toLowerCase()}_semestre" 
            enabled={$user?.semester != null && $user?.year != null && $user?.degree?.name != undefined}>
        </Bundle>

        <Bundle 
            type="year" 
            class="col-md-4" 
            courses={year_bundle_courses} 
            title={"Pacchetto annuale"} 
            subtitle={`${$user?.year}` + " anno"} 
            href="/negozio/pacchetti/{$user?.year?.toLowerCase()}_anno" 
            enabled={$user?.year != null && $user?.degree?.name != undefined}>
        </Bundle>
        
        <Bundle 
            type="faculty" 
            class="col-md-4" 
            courses={degree_bundle_courses} 
            title={"Pacchetto facoltà"} 
            subtitle={$user?.degree?.name} 
            href="/negozio/pacchetti/{$user?.degree?.name?.toLowerCase()?.replace(/\s/g, '_')}" 
            enabled={$user?.degree?.name != undefined}>
        </Bundle>
    </div>
</div>

<style lang="scss">
    @import '$css/variables.scss';
</style>