import { File } from '$lib/mongodb';
import { error } from '@sveltejs/kit';
import { render } from '$lib/markdown';

export async function GET({ url, params }){
    try{
        const urlParams = url.searchParams

        if(urlParams.get('tags')){
            query = params.get('tags').split(',');
        }

        let doc = await File.findById(params.file)
        doc = Buffer.from(doc.content, 'base64').toString('utf-8');

        if(urlParams.get('render')){
            doc = await render(doc)
        }

        return new Response(JSON.stringify(doc))
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}