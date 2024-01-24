export async function load({params, parent}) {
    const obj = await parent();
    
    let course = obj.courses.find((course) => course.name.toLowerCase().replace(/\s/g, '_') == params.corso);

    return {course}
}