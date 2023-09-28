import { getSession } from "$lib/redis";
import guard from '$lib/router';
import { redirect } from '@sveltejs/kit'

export async function load({ url, locals, cookies, fetch }) {
    const user = locals.user

    const auth =  guard(`GET:${url.pathname}`, user)
    if(auth.status >= 300 && auth.status <= 308) throw redirect(auth.status, auth.redirect)
    
    const resp = await fetch(`/api/courses`);
    const courses = (resp.ok && await resp.json()) || []

    return {
        user,
        courses
    };
}