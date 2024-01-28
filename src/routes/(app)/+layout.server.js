import { getSession } from "$lib/redis";

export async function load({ url, locals, cookies, fetch, depends }) {
    let user = locals.user

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []
    const my_courses = courses.filter(course => user.courses.find(id => course._id == id));
    depends('http://localhost:5173/') //(app)/user
    return {
        user,
        courses,
        my_courses
    };
}