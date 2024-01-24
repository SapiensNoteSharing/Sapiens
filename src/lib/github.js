import { config } from '$lib/config';
import { Course, Directory, File, dropContents } from '$lib/mongodb';
import { error } from '@sveltejs/kit';


const htmlMapping = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
    " ": "%20",
    "!": "%21",
    "#": "%23",
    "$": "%24",
    "%": "%25",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "*": "%2A",
    "+": "%2B",
    ",": "%2C",
    "-": "%2D",
    ".": "%2E",
    ":": "%3A",
    ";": "%3B",
    "=": "%3D",
    "?": "%3F",
    "@": "%40",
    "[": "%5B",
    "]": "%5D",
    "{": "%7B",
    "}": "%7D",
    "À": "%C3%80",
    "Á": "%C3%81",
    "È": "%C3%88",
    "É": "%C3%89",
    "Ì": "%C3%8C",
    "Í": "%C3%8D",
    "Ò": "%C3%92",
    "Ó": "%C3%93",
    "Ù": "%C3%99",
    "Ú": "%C3%9A",
    "à": "%C3%A0",
    "á": "%C3%A1",
    "è": "%C3%A8",
    "é": "%C3%A9",
    "ì": "%C3%AC",
    "í": "%C3%AD",
    "ò": "%C3%B2",
    "ó": "%C3%B3",
    "ù": "%C3%B9",
    "ú": "%C3%BA",
  }  

const options = {
    headers: {
        "Authorization": `Bearer ${config.git.access_token}`,
        "Accept": "application/vnd.github+json"
    }
}
const base = `https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/`

export async function get(file) {
    if (!file.path) 
        throw error(500, 'File provided has not a gitUrl property')

    const metadataPath = `${file.path}/metadata.json`;
    
    const resp = await fetch(`${base}${substitute(file.path)}`, options)
    const body = (resp.ok && await resp.json()) || {}
    return body
}

function substitute(href){
    return href?.split('')?.map(char => {
        if(htmlMapping[char] != undefined) 
            return htmlMapping[char];
        return char
    })?.join('')
}

async function getMetadata(coursePath) {
    const metadataPath = `${coursePath}/metadata.json`;
    const resp = await fetch(`${base}${substitute(metadataPath)}`, options);
    const body = (resp.ok && await resp.json()) || {};

    let data = JSON.parse(Buffer.from(body.content, 'base64').toString('utf-8'));
    console.log(data);
    return data;
}

async function getDir(gitDir) {
    let id, childDirectories = [], childFiles = [];

    let dir = await Directory.findOne({name: gitDir.name}) || {}
    
    if (!dir._id) 
        dir = await Directory.create({name: gitDir.name, sha: gitDir.sha, path: gitDir.path})

    // if (dir.sha != gitDir.sha) {
        const resp = await fetch(gitDir.url, options)
        const contents = (resp.ok && await resp.json()) || [];

        for (let obj of contents) {
            if (obj.type == 'dir') {
                id = await getDir(obj)
                childDirectories.push(id)
            } else {
                if(obj.name != dir.name){
                    const fileName = obj.name.replace(/\.(?=[a-z]).*/, '')
                    const oldFile = await File.deleteMany({name: obj.name})
                    console.log('getting file', fileName)
                    const dbFile = await File.findOne({name: fileName}) || {}
                    console.log('dbfile', dbFile.name || 'not found')
                    // if (dbFile.sha != obj.sha) {
                        const resp = await fetch(obj.url, options)
                        const fileObj = (resp.ok && await resp.json())
    
                        const file = await File.findOneAndUpdate({ name: fileName }, {...fileObj, name: fileName}, {upsert: true, new: true})
                        console.log('saved file', fileName, file.name)
                        childFiles.push(file._id)
                    // }
                }
            }
        }
        const childFilesId = new Set(childFiles)
        const orphanFiles = dir?.files?.filter(file => childFilesId.has(file._id))
        for (let file of orphanFiles) {
            await File.findByIdAndDelete(file._id)
        }
        await Directory.findByIdAndUpdate(dir._id, {...gitDir, directories: childDirectories, files: childFiles})
    // }

    return dir._id
}

export async function update() {
    try {
        const dbCourses = await Course.find({})

        const resp = await fetch(`${base}${substitute('Università')}`, options);
        const body = (resp.ok && await resp.json()) || []

        let courses = []

        for (let dir of body) {
            if(dir.name != 'Hidden'){
                const res = await fetch(`${base}${substitute(dir.path)}`, options)
                courses = [...courses, ...((res.ok && await res.json()) || [])]
            }
        }
        
        courses.forEach(async course => {
            console.log('doing asyncronus')
            let dbCourse = dbCourses.find(c => c.name == course.name) 
            const resp = await fetch(course.url, options)
            const body = (resp.ok && await resp.json()) || {}

            const metadata = await getMetadata(course.path)

            const chapters = body.filter(obj => obj.type == 'dir' && obj.name.slice(0, 2).match(/\d+/))
            const extra_content = body.filter(obj => !obj.name.slice(0, 2).match(/\d+/) && obj.name != course.name)
            
            let chapterIds = [], chapterId
            for (let chapter of chapters) {
                chapterId = await getDir(chapter)
                chapterIds.push(chapterId)
            }

            let contentsIds = {
                directories: [],
                files: []
            }, contentId;

            for (let content of extra_content) {
                if (content.type == 'dir') {
                    contentId = await getDir(content)
                    contentsIds.directories.push(contentId)
                } else {
                    const file = await File.findOneAndUpdate({name: content.name}, {...content}, {upsert: true, new: true})
                    contentsIds.files.push(file._id)
                }
            }

            const extra = await Directory.findOneAndUpdate({_id: dbCourse?.extra_content}, {
                name: `${course.name}:extraContent`,
                directories: contentsIds.directories,
                files: contentsIds.files,
            }, {upsert: true, new: true})

            await Course.findOneAndUpdate({name: course.name}, {
                ...metadata,
                chapters: chapterIds,
                extra_content: extra._id
            }, {upsert: true})

            console.log('finished course', course.name)
        })

        const gitCoursesNames = new Set(courses.map(course => course.name))
        let orphanCourses = dbCourses.filter(course => !gitCoursesNames.has(course.name))

        console.log('done update function')
    } catch(err) {
        console.log(err)
    }
}