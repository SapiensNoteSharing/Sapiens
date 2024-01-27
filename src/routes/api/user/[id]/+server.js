
import { error } from "@sveltejs/kit"
import { User } from '$lib/mongodb';

export async function PUT({ request, url, params }) {
    try {
        let body = await request.json()

        const user = await User.findByIdAndUpdate(params.id, body)

        return new Response('OK')
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}
