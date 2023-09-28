import { Directory } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, params }){
    try{
        const urlParams = url.searchParams

        if(urlParams.get('tags')){
            query = params.get('tags').split(',');
        }
        const arr = params.dir.split('/');
        const id = arr[arr.length - 1]
        const docs = await Directory.findById(id).populate('files')

        return new Response(JSON.stringify(docs.files))
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}