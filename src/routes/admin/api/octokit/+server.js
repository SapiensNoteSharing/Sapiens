import octokit, {get} from "$lib/github";
import { error } from '@sveltejs/kit'
import { config } from "$lib/config";

export async function GET({url, locals, params, fetch}){
    const user = locals.user;
    if(!user) throw error(404, 'Unauthenticated');

    try{
        const obj = await get({gitUrl: '/Primo anno'})
        return new Response(JSON.stringify({obj}))
    }catch(err){
        console.log(err);
        throw error(500, err)
    }



}


