import { config } from '$lib/config';

const headers = {
    "Authorization": `Bearer ${config.git.access_token}`,
    "Accept": "application/vnd.github+json"
}



export async function GET({url, fetch}){

/*
    const obj = await getgit(config.git.owner, config.git.repo, config.git.path)
    console.log(obj)
    */
    const urlSuffix = '?ref=master'
    let resp, body;
    resp = await fetch(`https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/Universit%C3%A0?ref=main`, {headers})
    console.log(resp)
    const primoAnno = (resp.ok && await resp.json())
    resp = await fetch(`https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/${config.git.path}/Secondo%20Anno${urlSuffix}`, {headers})
    const secondoAnno = (resp.ok && await resp.json())
    resp = await fetch(`https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/${config.git.path}/Terzo%20Anno${urlSuffix}`, {headers})
    const terzoAnno = (resp.ok && await resp.json())
    console.log(primoAnno, secondoAnno, terzoAnno)
    let courses = [...primoAnno, ...secondoAnno, ...terzoAnno]
    /*
    for(let course of courses){
        const resp = await fetch('https://api.github.com/repos/{config.git.owner}/{config.git.repo}/contents/{config.git.path}/{course.name}{urlSuffix}', {headers})
        const courseContent = (resp.ok && await resp.json())
        for(let file of courseContent){
            const resp = await fetch('https://api.github.com/repos/{config.git.owner}/{config.git.repo}/contents/{config.git.path}/Primo%20Anno{urlSuffix}', {headers})
            const primoAnno = (resp.ok && await resp.json())
            if(file.type == 'dir'){
                const data = getfile(owner, repo, path + file.name)
            } else {

            }
        }        
    }
    */
    const resp1 = await fetch('https://api.github.com/repos/tizi2808/git_example_image_viewer/contents/roo.h?ref=master', {headers})
    const body1 = (resp1.ok && await resp1.json())
    console.log(body1)

    let data = body1.content
    let buff = Buffer.from(data, 'base64');
    let text = buff.toString('ascii');
    console.log(text)


    return new Response(JSON.stringify(body))
}