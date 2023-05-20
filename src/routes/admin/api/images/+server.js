import { File } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url, setHeaders }){
    try{
        const params = url.searchParams
        const query = {}

        if(params.get('tags')){
            query.tags = params.get('tags').split(',');
        }

        const docs = await File.findById('646412b27cf277e05e7d853c')

        let data = `data:image/png;base64,${docs.content}`
        if(!docs){
            console.log(docs);
            throw error(404, docs)
        }

        setHeaders({
            'Content-Type': 'image/png',
        });

        return new Response(JSON.stringify({data}))
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}