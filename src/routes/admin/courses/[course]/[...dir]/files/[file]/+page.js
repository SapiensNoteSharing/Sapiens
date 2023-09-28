
export async function load({parent, params, fetch}){
    const resp = await fetch(`/admin/api/courses/${params.course}/${params.dir}/files/${params.file}`)
    const file = (resp.ok && await resp.json()) || []
    const r = await fetch(`/admin/api/courses/${params.course}/files/${params.file}/content`)
    let fileData = (r.ok && await r.json())

    const r1 = await fetch(`/admin/api/courses/${params.course}/files/${params.file}/content?render=true`)
    const renderedData = (r1.ok && await r1.json())

    return {
        file,
        fileData,
        params,
        renderedData,
        fetch: fetch
    }
}