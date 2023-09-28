

export async function load({parent, params, fetch}){
    const resp = await fetch(`/admin/api/courses/${params.course}`)
    const course = (resp.ok && await resp.json()) || []

    return {
        course
    }
}