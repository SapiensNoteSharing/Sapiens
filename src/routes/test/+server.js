import { config } from '$lib/config';
import { Course, Directory, File, dropContents } from '$lib/mongodb';

const headers = {
    "Authorization": `Bearer ${config.git.access_token}`,
    "Accept": "application/vnd.github+json"
}

const urlSuffix = '?ref=main';

async function getDir(directory){
    let id, childDirectories = [];
    const resp = await fetch(directory.url, {headers})
    const contents = (resp.ok && await resp.json());
    console.log('dir', directory.name, contents)
    const dir = await Directory.create({name: directory.name})
    for(let obj of contents){
        if(obj.type == 'dir'){
            id = await getDir(obj)
            childDirectories.push(id)
        } else {
            console.log('FILE content', obj)
            const resp = await fetch(obj.url, {headers})
            const fileObj = (resp.ok && await resp.json())
            const file = await File.create({name: fileObj.name, content: fileObj.content})
            console.log('created file', file)
            await Directory.findByIdAndUpdate(dir._id, {
                $addToSet: {files: file._id}
            })
        }
    }
    await Directory.findByIdAndUpdate(dir._id, {
        $set: {directories: childDirectories}
    })
    return dir._id


} 

export async function GET({url, fetch}){
    try{
    /*
    const obj = await getgit(config.git.owner, config.git.repo, config.git.path)
    console.log(obj)
    */
    
    let resp, body;
    resp = await fetch(`https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/${config.git.path}/Primo%20anno${urlSuffix}`, {headers})
    const primoAnno = (resp.ok && await resp.json())
    resp = await fetch(`https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/${config.git.path}/Secondo%20anno${urlSuffix}`, {headers})
    const secondoAnno = (resp.ok && await resp.json())
    /*
    resp = await fetch(`https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/${config.git.path}/Terzo%20Anno${urlSuffix}`, {headers})
    const terzoAnno = (resp.ok && await resp.json())
    */
    let courses = [...primoAnno, ...secondoAnno]
    console.log(courses)

    await Directory.deleteMany({})
    await File.deleteMany({})
    
    for(let course of courses){

        /* Estrazione capitoli */
        const resp = await fetch(course.url, {headers})
        const courseContent = (resp.ok && await resp.json())

        const chapters = courseContent.filter(obj => obj.type == 'dir' && obj.name.slice(0, 2).match(/\d+/))
        const extra_content = courseContent.filter(obj => !obj.name.slice(0, 2).match(/\d+/) && obj.name != course.name)
        console.log('chap e content', chapters, extra_content)
        let chaptersIds = [], chapterId;
        for(let chapter of chapters){
            chapterId = await getDir(chapter)
            chaptersIds.push(chapterId)
        }
        let contentsIds = {
            directories: [],
            files: []
        }, contentId;
        for(let content of extra_content){
            if(content.type == 'dir'){
                contentId = await getDir(content)
                contentsIds.directories.push(contentId)
            } else {
                const file = await File.create({name: content.name, content: content.content})
                contentsIds.files.push(file._id)
            }
        }
        
        const extra = await Directory.create({
            name: 'extra_content',
            directories: contentsIds.directories,
            files: contentsIds.files
        })

        await Course.create({
            name: course.name,
            content: chaptersIds,
            extra_content: extra._id
        })

    }
    
   /*
    let data = body1.content
    let buff = Buffer.from(data, 'base64');
    let text = buff.toString('ascii');
    console.log(text)
*/
    return new Response(JSON.stringify(body))
    }catch(err){
        console.log(err)
        return new Response(err)
    }
}