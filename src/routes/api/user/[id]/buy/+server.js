
import { error } from "@sveltejs/kit"
import { User, Course } from '$lib/mongodb'
import { getSession, setSession } from '$lib/redis'
import { costFormula } from "$lib/utils"

//body must be an array
export async function PUT({ request, url, locals, cookies, params }) {
    try {
        let body = await request.json()

        if(!body) return new Response('No items')
        
        const sid = cookies.get('sid')
        if (sid) {
            const user = await getSession(sid);
            if (user) {
                //TODO: controllare che non possegga già i corsi che vuole comprare
                const buying = (await Course.find({_id: {$in: body.map(course => course._id)}}))

                const cost = buying.reduce((cost, curr) => cost + costFormula(curr.cfu, curr.plan), 0)

                if (user.dna >= cost) {
                    let update = {
                        $set: {dna: user.dna - cost},
                        $push: {courses: {$each: body.map(course => ({course: course._id, plan: course.plan}))}}
                    }
                    const u = await User.findByIdAndUpdate(params.id, update, {new: true})
                    const user = u.toObject()
                    delete user.hash
                    await setSession(sid, user)
                    return new Response({success: true});
                } else {
                    return new Response({success: false, msg: 'Insufficient Funds'})
                }
            }
        }
        return new Response({success: false, msg: 'Something Went Wrong'})
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}
