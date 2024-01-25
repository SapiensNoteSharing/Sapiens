import { Province } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const user = locals.user
    try {
        const params = url.searchParams
        const query = {}

        if(params.get('s')){
            query.state = params.get('s')
        }
        if(params.get('r')){
            query.region = params.get('r')
        }

        const docs = await Province.find(query)
        
        return new Response(JSON.stringify(docs))
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}