import { compare } from '$lib/crypt'
import { error } from '@sveltejs/kit';
import { User } from '$lib/mongodb';
import { setSession } from '$lib/redis';

export async function POST({url, locals, request }){
    try{
        const body = request.json()

        const user = User.find({email: body.email})
        const authenticated = compare(user)
        if(authenticated){
            setSession()
        }

    }catch(err){
        console.log(err);
        throw error(500, err)
    }
}