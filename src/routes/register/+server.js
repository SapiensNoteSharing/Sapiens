
import { createHash } from "$lib/crypt";
import { User } from "$lib/mongodb";
import { error } from '@sveltejs/kit'
import { setSession } from "$lib/redis";

export async function POST({ url, locals, request}){
    try{
        const body = request.json(); 
        const hash = createHash(psw)

        const alreadyRegistered = await User.findOne({email: body.email})
        if(alreadyRegistered){
            throw error(409, 'This email is already used by another user')
        } else {
            const sid = crypto.randomUUID()
            const user = await User.create({...body, hash: hash})
            setSession(sid, user)
            throw redirect(302, '/esplora_corsi')
        }
    }catch(err){
        console.log(err);
        throw error(500, err)
    }
}


