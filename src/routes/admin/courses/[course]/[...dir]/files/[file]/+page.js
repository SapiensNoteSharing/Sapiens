export async function load({ parent, params, fetch }) {
    let file = {},
        fileData = '',
        renderedData = '';

    if (params.file != 'new') {
        const resp = await fetch(`/admin/api/courses/${params.course}/${params.dir}/files/${params.file}`)
        file = (resp.ok && await resp.json()) || {}

        const r = await fetch(`/admin/api/courses/${params.course}/files/${params.file}/content`)
        fileData = (r.ok && await r.json())

        const r1 = await fetch(`/admin/api/courses/${params.course}/files/${params.file}/content?render=true`)
        renderedData = (r1.ok && await r1.json())
    }

    return {
        file,
        fileData,
        params,
        renderedData,
        fetch: fetch
    }
}