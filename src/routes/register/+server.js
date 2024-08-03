import { createHash } from "$lib/crypt";
import { User } from "$lib/mongodb";
import { error } from '@sveltejs/kit'
import { setSession } from "$lib/redis";
import { Degree } from "$lib/mongodb";

export async function POST({ url, locals, cookies, request }) {
    const body = await request.json();

    const hash = await createHash(body.password)
    const existingUser = await User.findOne({$or: [{email: body.email}, {username: body.username}]})

    let matchingUniqueFields = []

    if (existingUser?.username == body?.username) {
        matchingUniqueFields.push({field: 'username', msg: 'This username is already used by another user', val: body.username})
    } 
    if (existingUser?.email == body?.email){
        matchingUniqueFields.push({field: 'email', msg: 'This email is already used by another user', val: body.email})
    }

    if(matchingUniqueFields.length > 0){
        throw error(409, matchingUniqueFields)
    }
    let degree;
    if(body?.faculty_name && body?.faculty_type){
        degree = await Degree.findOne({name: body.faculty_name, type: body.faculty_type})
        if(degree) body.degree = degree
    }

    const u = await User.create({...body, hash: hash})
    const populated = await User.findOne({_id: u._id})
    const user = populated.toObject()
    delete user.hash

    const sid = crypto.randomUUID()

    locals.sid = sid
    locals.user = user

    await setSession(sid, user)

    cookies.set('sid', sid, {
        path: '/',
        // maxAge: 3600
    })

    return new Response('OK')
}