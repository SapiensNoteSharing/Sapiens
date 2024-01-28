export async function load({ fetch, locals }) {
    return { 
        fetch: fetch, 
        user: locals.user
    }
}