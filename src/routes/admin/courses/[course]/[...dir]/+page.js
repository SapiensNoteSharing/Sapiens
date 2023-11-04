export async function load({ parent, params, fetch }) {
    let directory = {}

    if (!params.dir.endsWith('new')) {
        const resp = await fetch(`/admin/api/courses/${params.course}/${params.dir}`)
        directory = (resp.ok && await resp.json())
    }

    return {
        directory,
        params,
        fetch: fetch
    }
}