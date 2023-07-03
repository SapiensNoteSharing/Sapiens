import { getSession } from "$lib/redis";
import guard from '$lib/router';
import { redirect } from '@sveltejs/kit'

export async function load({ url, locals }) {
    const user = await getSession(locals.sid)
    const auth =  guard(`GET:${url.pathname}`, user)
    
    if(auth.status >= 300 && auth.status <= 308) throw redirect(auth.status, auth.redirect)
    
    return { 
        user
    };
  }