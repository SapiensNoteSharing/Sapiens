import { File } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, params }){
    try{
        const urlParams = url.searchParams

        if(urlParams.get('tags')){
            query = params.get('tags').split(',');
        }

        const doc = await File.findById(params.file)

        return new Response(JSON.stringify(doc))
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}