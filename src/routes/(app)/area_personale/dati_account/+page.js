export async function load({fetch}){

    const resp = await fetch(`/api/degrees`);
    const degrees = (resp.ok && await resp.json()) || []

    return {
        degrees
    }
}