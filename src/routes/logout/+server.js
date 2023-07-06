import { setSession } from '$lib/redis';

export async function GET({locals, url, cookies}) {

    await setSession(locals.sid, null);

    cookies.set('sid', '', {expires: new Date(0)})
    return new Response('OK')
}