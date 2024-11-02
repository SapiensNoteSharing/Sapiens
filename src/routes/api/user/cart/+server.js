
import { error } from "@sveltejs/kit"
import { User, ObjectId } from '$lib/mongodb'
import { getSession, setSession } from '$lib/redis'
import { json } from "@sveltejs/kit"

//body must be an object
export async function PUT({ request, url, locals, cookies, params }) {
    try {
        let body = await request.json()

        if (!body) return new Response('No items')
        
        const sid = cookies.get('sid')
        if (sid) {
            const user = await getSession(sid);
            if (user) {

                let update = {
                    $push: {cart: {course: body.course, plan: body.plan}}
                }

                const u = await User.findByIdAndUpdate(user._id, update, {new: true})
                const updatedUser = u.toObject()
                delete updatedUser.hash
                await setSession(sid, updatedUser)

                return json({success: true})
            }
        }
        return json({success: false, msg: 'Something Went Wrong'})
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}

export async function DELETE({ request, url, locals, cookies, params}){
    try {
        let body = await request.json()

        if (!body) return new Response('No items')
        
        const sid = cookies.get('sid')
        if (sid) {
            const user = await getSession(sid);
            if (user) {
                
                let update = {
                    $pull: {cart: {course: body.course}}
                }

                const u = await User.findByIdAndUpdate(user._id, update, {new: true})
                const updatedUser = u.toObject()
                console.log('updated user', updatedUser)
                delete updatedUser.hash
                await setSession(sid, updatedUser)

                return json({success: true});
            }
        }
        return json({success: false, msg: 'Something Went Wrong'})
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}