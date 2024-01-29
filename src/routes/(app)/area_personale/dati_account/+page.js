export async function load({fetch, parent}) {
    const { user } = await parent()

    const resp = await fetch(`/api/degrees`);
    const degrees = (resp.ok && await resp.json()) || []

    return {
        user,
        degrees
    }
}