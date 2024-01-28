import { error } from '@sveltejs/kit'



export async function GET({locals}) {
    const user = locals.user
    try {
        const calendarEvents = [] //Calendar.findOne({user: user._id})

        return new Response(JSON.stringify(calendarEvents), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch(err) {
        console.log(err);
        throw error(500, err)
    }
}