import { University } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const user = locals.user
    try {
        const params = url.searchParams
        const query = {}

        if (params.get('s') && params.get('s') != 'undefined') {
            query.state = params.get('s')
        }
        
        if (params.get('r') && params.get('r') != 'undefined') {
            query.region = params.get('r')
        }

        const docs = await University.find(query)
        
        return new Response(JSON.stringify(docs))
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}