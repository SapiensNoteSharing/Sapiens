import { Course, ObjectId } from '$lib/mongodb';
import { error, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const user = locals.user
    try {
        const params = url.searchParams
        const query = {}

        if (user.university) query.university = new ObjectId(user.university._id)
        if (user.degree) query.degree = new ObjectId(user.degree._id)
        if (user.year) query.year = user.year
        if (user.semester) query.semester = user.semester

        const docs = await Course.find(query)

        return json(docs)
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}