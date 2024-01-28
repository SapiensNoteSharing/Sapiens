import { Course, User } from '$lib/mongodb';
import { error } from '@sveltejs/kit';
import { setSession } from '$lib/redis';

export async function POST({ url, request, locals, params, cookies }) {
    let user = locals.user
    try {
        const body = request.json()
        const urlParams = url.searchParams

        const course = await Course.findById(params.course)
        const cost = (10 + course?.cfu * 5 / 6) * (body.type == "base" ? 0.8 : 1) * 2

        if (user.dna >= cost) {
            user = await User.findByIdAndUpdate(user._id, {dna: user.dna - cost, $addToSet: {courses: course._id}}, {new: true})
        }

        const sid = cookies.get('sid')
        if (sid) {
            setSession(sid, user)
        }
        
        return new Response('OK')
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}