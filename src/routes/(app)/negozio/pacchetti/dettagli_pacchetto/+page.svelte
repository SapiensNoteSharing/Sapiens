<script>
    import ActiveButton from '$lib/components/ActiveButton.svelte';
    import NormalButton from '$lib/components/NormalButton.svelte';
    import { page } from '$app/stores';

    export let data;
    let courses = data.courses || [];
    let user = data.user || {};

    let owned = [
        courses.find(course => course.name == "Analisi Matematica I"),
        courses.find(course => course.name == "Fisica I"),
        courses.find(course => course.name == "Algoritmi e strutture dati"),
    ].filter(Boolean);

    function get_semester_bundle_courses() {
        let semester_bundle_courses = [];
        for (let course of courses) {
            if (
                course.university_name == data.user.university_name &&
                course.faculty_code == data.user.faculty_code &&
                course.year == data.user.year &&
                course.semester == data.user.semester
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
                course.university_name == data.user.university_name &&
                course.faculty_code == data.user.faculty_code &&
                course.year == data.user.year
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
                course.university_name == data.user.university_name &&
                course.faculty_code == data.user.faculty_code
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

    let semester_bundle_courses = get_semester_bundle_courses()
    sort_course_list(semester_bundle_courses, "chronological_order");
    let year_bundle_courses = get_year_bundle_courses()
    sort_course_list(year_bundle_courses, "chronological_order");
    let degree_bundle_courses = get_degree_bundle_courses()
    sort_course_list(degree_bundle_courses, "chronological_order");

    let cartModal;
    function openCart() {
        cartModal.show().then(async res => {
            if (res) {
                
            }
        })
    }

    let course = courses[0];
</script>

<div class="d-flex flex-column">

</div>

<style lang="scss">
    @import '$css/variables.scss';

    .bundle {
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 1.5rem;
        padding: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;

        &:hover {
            transition: .25s ease-in-out;
            position: relative;
            box-shadow: 0px 5px 10px 0px rgba($dark, 0.1);
        }
    }

    .box {
        padding: 2rem;
        border: 1px solid rgba($dark, 0.25);
        background: $light;
        border-radius: 2rem;
        cursor: pointer;
        transition: .25s ease-in-out;
    }

    .bundle-course-icon {
        width: 3.5rem;
        margin: 2rem 1.5rem 0rem 1.5rem;
    }
</style>