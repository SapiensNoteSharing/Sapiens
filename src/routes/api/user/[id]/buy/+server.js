
import { error } from "@sveltejs/kit"
import { User, Course } from '$lib/mongodb'
import { getSession, setSession } from '$lib/redis'
import { costFormula } from "$lib/utils"
import { json } from "@sveltejs/kit"

export async function PUT({ request, url, locals, cookies, params }) {
    try {
        let body = await request.json()
        
        const sid = cookies.get('sid')
        if (sid) {
            const user = await getSession(sid);
            if (user) {
                // TODO: controllare che non possegga già i corsi che vuole comprare
                const buying = (await Course.find({_id: {$in: user.cart.map(item => item.course)}}))

                const cost = buying.reduce((cost, curr) => cost + costFormula(curr.cfu, curr.plan), 0)

                if (user.dna >= cost) {
                    let update = {
                        $set: {dna: user.dna - cost, cart: []},
                        $push: {courses: {$each: user.cart.map(item => ({course: item.course, plan: item.plan}))}},
                    }
                    const u = await User.findByIdAndUpdate(params.id, update, {new: true})
                    const updatedUser = u.toObject()
                    delete updatedUser.hash
                    await setSession(sid, updatedUser)
                    return json({success: true});
                } else {
                    return json({success: false, msg: 'Insufficient Funds'})
                }
            }
        }
        return json({success: false, msg: 'Something Went Wrong'})
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}
