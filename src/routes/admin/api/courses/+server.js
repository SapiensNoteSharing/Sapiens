import { Course } from '$lib/mongodb';
import { error } from '@sveltejs/kit';

export async function GET({ url }) {
    try {
        const params = url.searchParams
        const query = {}

        if (params.get('tags')) {
            query.tags = params.get('tags').split(',');
        }

        const docs = await Course.find(query)

        return new Response(JSON.stringify(docs))
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}

export async function POST({ request }) {
    try {
        let body = await request.json()

        const course = await Course.create(body)

        return new Response('OK')
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}

export async function PUT({ request }) {
    try {
        const body = await request.json();

        const course = await Course.findByIdAndUpdate(body._id, body, { new: true })

        return new Response('OK')
    } catch (err) {
        console.log(err);
        throw error(500, err)
    }
}

export async function DELETE({ request }) {
    try {
        const body = await request.json()

        const course = await Course.findByIdAndDelete(body._id)

        return new Response('OK')
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}