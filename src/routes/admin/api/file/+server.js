import { File } from '$lib/mongodb';
import { error } from '@sveltejs/kit';
import { render } from '$lib/markdown';

export async function GET({ url }){
    try{
        const params = url.searchParams
        const query = {}

        if(params.get('tags')){
            query.tags = params.get('tags').split(',');
        }

        const docs = await File.findById('6464129b7cf277e05e7d844a')

        if(!docs){
            throw error(404, docs)
        }

        const renderedFile = await render(docs);

        return new Response(JSON.stringify(renderedFile))
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}

export async function POST({ request }){
    try{
        let body = await request.json()

        const course = await Course.create(body)

        return new Response('OK')
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}

export async function PUT({ request }){
    try{
        const body = await request.json();

        const course = await Course.findByIdAndUpdate(body._id, body)

        return new Response('OK')
    }catch(err){
        console.log(err);
        throw error(500, err)
    }
}

export async function DELETE({ request }){
    try{
        const body = await request.json()

        const course = await Course.findByIdAndDelete()

        return new Response('OK')
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}