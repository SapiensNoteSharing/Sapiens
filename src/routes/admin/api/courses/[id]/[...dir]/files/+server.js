import { Directory, File } from '$lib/mongodb';
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

export async function POST({ request }){
    try{
        const body = await request.json()

        if(body.content){
            body.content = Buffer.from(body.content, 'utf-8').toString('base64');
        }

        const file = await File.create(body)

        return new Response('OK')
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}

export async function PUT({ request }){
    try{
        const body = await request.json();

        if(body.content){
            body.content = Buffer.from(body.content, 'utf-8').toString('base64');
        }

        const file = await File.findByIdAndUpdate(body._id, body)

        return new Response('OK')
    }catch(err){
        console.log(err);
        throw error(500, err)
    }
}

export async function DELETE({ request }){
    try{
        const body = await request.json()

        const file = await File.findByIdAndDelete(body._id)

        return new Response('OK')
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}