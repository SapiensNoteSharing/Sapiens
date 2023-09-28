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
        const docs = await Directory.findById(id).populate('directories').populate('files')
        console.log(docs)
        return new Response(JSON.stringify(docs))
    }catch(err){
        console.log(err)
        throw error(500, err)
    }
}

export async function POST({ request }){
    try{
        let body = await request.json()

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