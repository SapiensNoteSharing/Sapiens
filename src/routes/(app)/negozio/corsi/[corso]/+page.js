export async function load({params, parent}) {
    const { courses } = await parent();
    
    let course = courses.find((course) => course._id == params.corso);

    return {course, corso: course}
}