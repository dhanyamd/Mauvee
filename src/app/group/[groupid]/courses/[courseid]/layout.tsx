import { onGetCourseModules } from '@/app/actions/courses'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import { CreateCourseModule } from '../_components/create-module'
import CourseList from '../_components/module-list'

type CourseLayoutProps = {
    params : Promise<{
        courseid: string
        groupid: string
    }>,
    children: React.ReactNode
}
//    params: Promise<{sectionid : string; groupid: string}>

export default async function CourseLayout ({params, children} : CourseLayoutProps) {
    const client = new QueryClient()
   const {courseid, groupid} = await params;
    await client.prefetchQuery({
        queryKey: ["course-modules"],
        queryFn: () => onGetCourseModules(courseid)
    })
  return (
   <HydrationBoundary state={dehydrate(client)}>
  <div className='grid grid-cols-1 h-full lg:grid-cols-4 overflow-hidden'>
<div className='bg-themeBlack p-5 overflow-y-auto'>
    <CreateCourseModule groupid={groupid} courseId={courseid}/>
    <CourseList groupid={groupid} courseId={courseid}/>
</div>
<div className='lg:col-span-3 max-h-full h-full pb-10 overflow-y-auto bg-[#101011]/90'>
{children}
</div>
  </div>
   </HydrationBoundary>
  )
}

