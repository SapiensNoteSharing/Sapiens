import { compare } from '$lib/crypt'
import { error } from '@sveltejs/kit';
import { User } from '$lib/mongodb';
import { setSession } from '$lib/redis';

export async function POST({ url, locals, request, cookies }) {
    const body = await request.json()

    const dbUser = await User.findOne({$or: [{email: body.identifier}, {username: body.identifier}]})

    const authenticated = await compare(body, dbUser)
    console.log(body, dbUser)
    if (authenticated) {
        const user = dbUser.toObject()
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
    } else if(body.identifier == dbUser?.email || body.identifier == dbUser?.username) {
        throw error(400, {field: 'password', msg: 'Password Errata'})
    } else {
        throw error(400, {field: 'identifier', msg: 'Username/Email errata'})
    }
}