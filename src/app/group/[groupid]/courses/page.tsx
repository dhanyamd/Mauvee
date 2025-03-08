import { onGetGroupCourses } from '@/app/actions/courses'
import CourseCreate from '@/app/globals/create-course'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import CourseList from './_components'

type Props = {
    params : Promise<{
        groupid: string
    }>
}

export default async function CoursePage ({ params } : Props) {
    const client = new QueryClient()
    const { groupid } = await params;
    await client.prefetchQuery({
        queryKey: ["group-courses"],
        queryFn: () => onGetGroupCourses(groupid)
    })
  return (
    <HydrationBoundary state={dehydrate(client)}>
   <div className='container grid lg:grid-cols-2 2xl:grid-cols-3 py-10 gap-5'>
   <CourseCreate groupid={groupid}/>
   <CourseList groupid={groupid}/>
   </div>
    </HydrationBoundary>
  )
}

