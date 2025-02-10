import { onGetCourseModules } from '@/app/actions/courses'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import { CreateCourseModule } from '../_components/create-module'

type CourseLayoutProps = {
    params : {
        courseid: string
        groupid: string
    },
    children: React.ReactNode
}

const CourseLayout = async ({params, children} : CourseLayoutProps) => {
    const client = new QueryClient()

    await client.prefetchQuery({
        queryKey: ["course-modules"],
        queryFn: () => onGetCourseModules(params.courseid)
    })
  return (
   <HydrationBoundary state={dehydrate(client)}>
  <div className='grid grid-cols-1 h-full lg:grid-cols-4 overflow-hidden'>
<div className='bg-themeBlack p-5 overflow-y-auto'>
    <CreateCourseModule groupid={params.groupid} courseId={params.courseid}/>
</div>
  </div>
   </HydrationBoundary>
  )
}

export default CourseLayout
