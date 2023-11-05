import { Course } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, params }) {
    try {
        const urlParams = url.searchParams

        if (urlParams.get('tags')) {
            query = params.get('tags').split(',');
        }

        const docs = await Course.findById(params.id)

        return new Response(JSON.stringify(docs))
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}