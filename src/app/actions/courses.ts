'use server'

import { client } from "@/lib/prisma"

export const onGetGroupCourses = async (groupid: string ) => {
    try {
        const courses = await client.course.findMany({
            where: {
                groupId: groupid    
            },
            take: 8,
            orderBy: {
                createdAt: "desc"
            }
        })

        if(courses && courses.length > 0) {
            return {status: 200, courses}
        }
        return {
            status: 404,
            message: "No courses found"
        }
    } catch (error) {
        return {
            status: 400,
            message: "Oops! something went wrong"
        }
    }
}

export const onCreateGroupCourse = async (
    groupid: string,
    name: string,
    image: string,
    description: string,
    courseid: string,
    privacy: string,
    published: boolean
) => {
    try {
        const course = await client.group.update({
            where:{
                id: groupid
            },
            data: {
                courses: {
                    create: {
                        id: courseid,
                        name,
                        thumbnail: image,
                         description: description,
                         privacy: privacy,
                         published
                        
                    }
                }
            }
        })
        if(course) {
            return {status : 200, message: "Course successfully created"}
        }
        return {status: 400, message: "Group not found"}
    } catch (error) {
        return {status: 400, message: "Oops! something went wrong"}
    }
}

export const onGetCourseModules = async (courseId: string) => {
    try {
        const modules = await client.module.findMany({
            where: {
                courseId
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                section: {
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })
        if(modules && modules.length > 0) {
            return {status: 200, modules}
        }
    } catch (error) {
        return {
            status: 404,
            message: "No modules found"
        }
    }
}

export const onCreateCourseModule = async (courseId: string, name: string, moduleId: string) => {
    try {
        const courseModule = await client.course.update({
            where: {
                id: courseId
            },
            data: {
                modules: {
                    create: {
                        title: name,
                        id: moduleId
                    }
                }
            }
        })
        if(courseModule) {
            return {status : 200, message: "Module successfully created"}
        }
        return {
            status: 404,
            message: "Noc ourses found"
        }
    } catch (error) {
        return {
            status: 400,
            message: "OOps! Something went wrong"
        }
    }
}