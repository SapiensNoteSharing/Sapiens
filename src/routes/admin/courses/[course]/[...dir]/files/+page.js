
import { redirect } from "@sveltejs/kit"
export async function load({parent, params, fetch}){
    throw redirect(308, `/admin/courses/${params.course}/${params.dir}`)
}