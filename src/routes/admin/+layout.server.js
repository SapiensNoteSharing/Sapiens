

export async function load({parent, url, locals, fetch}){
    const user = locals.user;



    return {
        user
    }
}