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

export async function POST({ request }){
    try{
        const body = await request.json();

        const course = await Directory.create(body)

        return new Response('OK')
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}

export async function PUT({ request }){
    try{
        const body = await request.json();

        const course = await Directory.findByIdAndUpdate(body._id, body)

        return new Response('OK')
    }catch(err){
        console.log(err);
        throw error(500, err)
    }
}

export async function DELETE({ request }){
    try{
        const body = await request.json()

        const course = await Directory.findByIdAndDelete(body._id)

        return new Response('OK')
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}