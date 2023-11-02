import { File } from '$lib/mongodb';
import { error } from '@sveltejs/kit';
import { render } from '$lib/markdown';

export async function GET({ url, params }) {
    try {
        const urlParams = url.searchParams

        let doc = await File.findById(params.id);

        if (!doc) {
            throw error(404, 'Not Found')
        }

        doc = await render(Buffer.from(doc.content, 'base64').toString('utf-8'));
        
        return new Response(doc, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch(err) {
        console.log(err)
        throw error(500, err)
    }
}