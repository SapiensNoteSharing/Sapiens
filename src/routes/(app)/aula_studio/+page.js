export async function load({ parent, fetch }) {
    const user = await parent()

    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    return {
        user,
        courses
    };
}