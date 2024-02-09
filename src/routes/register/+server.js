import { createHash } from "$lib/crypt";
import { User } from "$lib/mongodb";
import { error } from '@sveltejs/kit'
import { setSession } from "$lib/redis";
import { redirect } from "@sveltejs/kit";

export async function POST({ url, locals, cookies, request }) {
    const body = await request.json();

    const hash = await createHash(body.password)
    const alreadyRegistered = await User.findOne({$or: [{email: body.email}, {username: body.username}]})

    if (alreadyRegistered) {
        throw error(409, 'This email/username is already used by another user')
    } else {
        const u = await User.create({...body, hash: hash})
        const user = u.toObject()
        delete user.hash
        const sid = crypto.randomUUID()

        locals.sid = sid
        locals.user = user

        await setSession(sid, user)

        cookies.set('sid', sid, {
            path: '/',
            // maxAge: 3600
        })

        return new Response('OK')
    }
}