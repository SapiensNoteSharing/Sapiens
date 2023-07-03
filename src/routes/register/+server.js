
import { createHash } from "$lib/crypt";
import { User } from "$lib/mongodb";
import { error } from '@sveltejs/kit'
import { setSession } from "$lib/redis";
import { redirect } from "@sveltejs/kit";

export async function POST({ url, locals, request }){
    const body = await request.json();

    const hash = await createHash(body.password)
    const alreadyRegistered = await User.findOne({email: body.email})

    if(alreadyRegistered){
        throw error(409, 'This email is already used by another user')
    } else {
        const sid = crypto.randomUUID()
        const user = await User.create({...body, hash: hash})
        locals.sid = sid
        locals.user = user
        setSession(sid, user)
        throw redirect(302, '/esplora_corsi')
    }
}


