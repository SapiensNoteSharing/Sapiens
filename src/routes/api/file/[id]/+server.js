import { File } from '$lib/mongodb';
import { error } from '@sveltejs/kit';
import { render } from '$lib/markdown';

export async function GET({ url, params }) {
    try {
        const urlParams = url.searchParams
        const query = {
            _id: params.id
        }

        const docs = await File.find(query);

        if (!docs) {
            throw error(404, docs)
        }

        return new Response(JSON.stringify(docs), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch(err) {
        console.log(err)
        throw error(500, err)
    }
}