import { render } from '$lib/markdown';
import { error } from '@sveltejs/kit'

export async function POST({ url, request, locals, params, fetch }) {
    const user = locals.user;
    if (!user) throw error(404, 'Unauthenticated');

    try {
        const body = await request.json();

        const doc = await render(body.fileData);

        return new Response(JSON.stringify({ renderedData: doc }))
    } catch (err) {
        console.log(err);
        throw error(500, err)
    }
}