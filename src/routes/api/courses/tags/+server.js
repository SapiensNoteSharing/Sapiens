import { Course } from '$lib/mongodb';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const user = locals.user
    try {
        const params = url.searchParams
        const query = [
            {
                $match: {}
            },
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: 0,
                    tags: {$addToSet: '$tags'}
                }
            }
        ]

        const result = await Course.aggregate(query)
        
        return json(result[0].tags)
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}