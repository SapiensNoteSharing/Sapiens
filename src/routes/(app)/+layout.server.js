import { getSession } from "$lib/redis";

export async function load({ url, locals, cookies, fetch, depends }) {
    let user = locals.user
    console.log('rerunning')
    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []
    let userCourses = new Set(user.courses.map(course => course.course))
    const my_courses = courses.filter(course => userCourses.has(course._id));
    depends('http://localhost:5173/') //(app)/user
    return {
        user,
        courses,
        my_courses
    };
}