import { config } from '$lib/config';
import { getSession, updateTtl } from '$lib/redis';
import guard from '$lib/router';
import { redirect } from '@sveltejs/kit';
import { loadDatabase } from '$lib/loadDatabase';

process.on('SIGINT', function () { process.exit(); }); // Ctrl+C  
process.on('SIGTERM', function () { process.exit(); }); // docker stop

try{
    loadDatabase()
}catch(err){
    console.log(err)
}

export async function handle({ event, resolve }) {
    const sid = event.cookies.get('sid')
    let user;
    if (sid) {
        user = await getSession(sid);
        if (user) {
            event.locals.sid = sid;
            event.locals.user = user;
        }
    }

    const auth = guard(`${event.request.method}:${event.url.pathname}`, user);
    

    if(event.url.pathname != '/status' && event.url.pathname != '/api/auth') {
        await updateTtl(sid);
        console.log(`${event.request.method}:${event.url.pathname}`, auth)
    }

    if(auth.status != 200 && event.url.pathname != '/') {
        console.log('auth status != 200', event.url.pathname)

        event.cookies.set('redirect', (event.url.pathname == '/api/auth') ? '/' : event.url.href, {
            path: '/',
            httpOnly: true
        })

        throw redirect(auth.status, auth.redirect)
    }

    const response = await resolve(event);

    return response;
}