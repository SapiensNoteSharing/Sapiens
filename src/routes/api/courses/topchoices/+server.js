import { Course, ObjectId } from '$lib/mongodb';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const user = locals.user
    try {
        const params = url.searchParams
        const matches = {}
        
        if (user.university) matches.university = new ObjectId(user.university._id)
        if (user.degree) matches.degree = new ObjectId(user.degree._id)
        if (user.year) matches.year = user.year
        
        const query = [
            {
                $match: matches
            },
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    courses: {$push: '$$ROOT'}

                }
            }
        ]


        const docs = await Course.aggregate(query)
        console.log(docs)
        return json(docs)
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}