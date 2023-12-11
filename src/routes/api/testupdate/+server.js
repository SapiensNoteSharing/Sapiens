import { update } from "$lib/github";

export async function GET({url, params, locals, fetch}) {
    try {
        const body = await update();
        return new Response(JSON.stringify(body || {}))
    } catch(err) {
        console.log(err)
    }
}