import { getSession } from "$lib/redis";

export async function load({ url, locals, cookies, fetch }) {
    const user = await getSession(locals.sid)

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    const my_courses = new Set(user.courses.map(course => course._id));

    return {
        user,
        courses,
        my_courses
    };
}