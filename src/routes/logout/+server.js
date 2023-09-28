import { setSession } from '$lib/redis';
import { redirect } from '@sveltejs/kit';
export async function GET({locals, url, cookies}) {

    await setSession(locals.sid, null);

    cookies.set('sid', '', {expires: new Date(0)})
    throw redirect(302, '/')
}