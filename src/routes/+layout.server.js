import { getSession } from "$lib/redis";

export async function load({ locals }) {
    const user = await getSession(locals.sid)
    return {
        user
    }
}