
import { error } from "@sveltejs/kit"
import { User, Degree } from '$lib/mongodb'
import { getSession, setSession } from '$lib/redis'

export async function PUT({ request, url, locals, cookies, params }) {
    try {
        let body = await request.json()

        if(body.hash) delete body.hash

        const sid = cookies.get('sid')
        if (sid) {
            const user = await getSession(sid);
            if (user) {

                let degree = await Degree.findOne({name: body.degree.name, type: body.degree.type}) || {}
                if(!degree?._id){
                    degree = await Degree.create({name: body.degree.name, type: body.degree.type})
                }

                body.degree = degree._id
                const user = await User.findByIdAndUpdate(params.id, body, {new: true})

                delete user.hash
                await setSession(sid, user)
            }
        }

        return new Response('OK')
    } catch (err) {
        console.log(err)
        throw error(500, err)
    }
}
