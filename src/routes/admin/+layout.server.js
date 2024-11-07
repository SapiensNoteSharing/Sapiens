export async function load({ parent, url, locals, depends, fetch }) {
    const user = locals.user;
    depends('admin:user')
    const resp = await fetch(`/admin/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    return {
        user,
        courses
    }
}