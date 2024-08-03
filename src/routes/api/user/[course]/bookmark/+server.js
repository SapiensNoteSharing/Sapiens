
import { error, json } from "@sveltejs/kit"
import { User, ObjectId } from '$lib/mongodb'
import { getSession, setSession } from '$lib/redis'

export async function PUT({ request, url, locals, cookies, params }) {
    let user = locals.user
    try {
        let body = await request.json()
        console.log(body)

        const sid = cookies.get('sid')
        if (sid) {
            user = await getSession(sid);
            if (user) {
                const u = await User.findOneAndUpdate({_id: user._id, "courses.course": new ObjectId(params.course)}, {$set: {"courses.$.bookmark": new ObjectId(body)}}, {new: true})
                if(u){
                    user = u.toObject()
                    delete user.hash
                    await setSession(sid, user)
                }
            }
        }
        return json(user);
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}
