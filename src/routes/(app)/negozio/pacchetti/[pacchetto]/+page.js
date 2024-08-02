export async function load({parent, fetch, params}){

    const resp = await fetch(`/api/shop/bundles/${params.pacchetto}`)
    const body = (resp.ok && await resp.json()) || []

    return {
        fetch: fetch,
        courses: body,
        type: params.pacchetto
    }
}