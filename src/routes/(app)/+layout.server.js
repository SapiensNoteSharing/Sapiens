import { getSession } from "$lib/redis";

export async function load({ url, locals, cookies, fetch }) {
    let user = locals.user
    if(url.pathname) user = locals.user

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []
    const my_courses = courses.filter(course => user.courses.find(id => course._id == id));

    return {
        user,
        courses,
        my_courses
    };
}