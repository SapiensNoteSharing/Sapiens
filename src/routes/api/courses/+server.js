import { error } from '@sveltejs/kit'
import { Course } from '$lib/mongodb'

export async function GET({url, params, locals}){
    const user = locals.user;

    if(!user) throw error(404, 'Unathenticated');

    try{
        const urlParams = url.searchParams;

        let query = {}
        if(user.role == 'user'){
            query._id = {$in: user.courses}
        }

        const courses = await Course.find(query)

        return new Response(JSON.stringify(courses))
    }catch(err){
        console.log(err);
        throw error(500, err)
    }



}