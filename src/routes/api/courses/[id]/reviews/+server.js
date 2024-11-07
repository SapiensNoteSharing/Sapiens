import { Review } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, params }) {
    try {
        const urlParams = url.searchParams

        const docs = await Review.find({course: params.id})

        return new Response(JSON.stringify(docs))
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}