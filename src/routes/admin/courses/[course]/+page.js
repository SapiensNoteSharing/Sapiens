export async function load({ parent, params, fetch }) {
    const resp = await fetch(`/admin/api/courses/${params.course}`)
    const course = (resp.ok && await resp.json()) || []

    const r = await fetch(`/admin/api/courses/tags`);
    const tags = (r.ok && await r.json()) || []

    return {
        course,
        tags,
        fetch: fetch
    }
}