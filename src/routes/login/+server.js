import { compare } from '$lib/crypt'
import { redirect } from '@sveltejs/kit';
import { User } from '$lib/mongodb';
import { setSession } from '$lib/redis';

export async function POST({ url, locals, request, cookies }) {
    const body = await request.json()
    const authenticated = await compare(body)

    if (authenticated) {
        const u = await User.findOne({$or: [{email: body.identifier}, {username: body.identifier}]});
        const user = u.toObject()
        delete user.hash
        const sid = crypto.randomUUID();

        locals.sid = sid;
        locals.user = user;

        await setSession(sid, user);

        cookies.set('sid', sid, {
            path: '/',
            // maxAge: 3600
        })

        return new Response('OK')
    } else {
        throw redirect(300, '/')
    }
}