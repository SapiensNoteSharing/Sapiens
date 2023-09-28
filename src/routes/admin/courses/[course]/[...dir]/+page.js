
export async function load({parent, params, fetch}){
    const resp = await fetch(`/admin/api/courses/${params.course}/${params.dir}`)
    const directory = (resp.ok && await resp.json())

    return {
        directory,
        params
    }
}