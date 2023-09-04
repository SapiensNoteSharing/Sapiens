import { compare } from '$lib/crypt'
import { redirect } from '@sveltejs/kit';
import { User } from '$lib/mongodb';
import { setSession } from '$lib/redis';

export async function POST({url, locals, request, cookies }){

    const body = await request.json()
    const authenticated = await compare(body)

    if(authenticated){
        const user = await User.findOne({email: body.email})
        const sid = crypto.randomUUID();

        locals.sid = sid;
        locals.user = user;

        await setSession(sid, user);

        cookies.set('sid', sid, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            // maxAge: 3600
        })

        return new Response('OK')
    } else {
        throw redirect(303, '/')
    }

}