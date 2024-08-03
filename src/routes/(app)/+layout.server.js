export async function load({ url, locals, cookies, fetch, depends }) {
    let user = locals.user

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []
    
    let my_courses = []
    if(user.role != 'admin'){
        let userCourses = new Set(user.courses.map(course => course.course))
        my_courses = courses.filter(course => userCourses.has(course._id));
    }

    return {
        user,
        courses,
        my_courses
    };
}