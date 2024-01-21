import { createHash } from "$lib/crypt";
import { User } from "$lib/mongodb";
import { error } from '@sveltejs/kit'
import { setSession } from "$lib/redis";
import { redirect } from "@sveltejs/kit";

export async function POST({ url, locals, request }) {
    const body = await request.json();

    const hash = await createHash(body.password)
    const alreadyRegistered = await User.findOne({ email: body.email })

    if (alreadyRegistered) {
        throw error(409, 'This email is already used by another user')
    } else {
        const u = await User.create({...body, hash: hash})
        const user = u.toObject()
        delete user.hash
        const sid = crypto.randomUUID()

        locals.sid = sid
        locals.user = user

        await setSession(sid, user)

        return new Response('OK')
    }
}