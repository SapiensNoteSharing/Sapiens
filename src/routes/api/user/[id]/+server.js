
import { error } from "@sveltejs/kit"
import { User } from '$lib/mongodb';

export async function PUT({ request, url, params }) {
    try {
        let body = await request.json()

        const user = await User.findByIdAndUpdate(params.id, body, {new: true})

        return new Response(JSON.stringify(user), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}
