

export async function load({parent, params, fetch}){
    const resp = await fetch(`/api/courses`)
    const courses = (resp.ok && await resp.json()) || []

    return {
        courses
    }
}