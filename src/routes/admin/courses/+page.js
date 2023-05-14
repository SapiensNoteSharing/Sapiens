export async function load({parent, fetch}){
    const resp = await fetch(`/api/courses`)
    const courses = (resp.ok && await resp.json()) || []


    return {courses}
}