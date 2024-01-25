import { State } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const user = locals.user
    try {
        const params = url.searchParams
        const query = {}

        const docs = await State.find(query)
        
        return new Response(JSON.stringify(docs))
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}