import { getSession } from "$lib/redis";

export async function load({ url, locals, cookies, fetch }) {
    const user = await getSession(locals.sid)

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    return {
        user,
        courses
    };
}