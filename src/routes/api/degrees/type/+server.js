import { Degree } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const user = locals.user
    try {
        const params = url.searchParams

        const query = [
            {
                $match: {}
            },
            {
                $group: {
                    _id: 0,
                    types: {$addToSet: "$type"}
                }
            }
        ]

        const docs = await Degree.aggregate(query) || []
        
        return new Response(JSON.stringify(docs[0]?.types || []))
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}