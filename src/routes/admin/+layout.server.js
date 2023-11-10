export async function load({ parent, url, locals, fetch }) {
    const user = locals.user;

    const resp = await fetch(`/admin/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    return {
        user,
        courses
    }
}