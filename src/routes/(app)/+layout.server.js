import { getSession } from "$lib/redis";

export async function load({ url, locals, cookies, fetch }) {
    const user = await getSession(locals.sid)

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    const userCourses = new Set(user.courses.map(course => course._id));

    return {
        user,
        courses: courses.filter(course => userCourses.has(course._id))
    };
}