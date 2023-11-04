export async function load({ url, locals, cookies, fetch }) {
    const user = locals.user

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    const test = await fetch('/admin/api/octokit')

    return {
        user,
        courses
    };
}