import { onGetSectionInfo } from '@/app/actions/courses'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import SectionNavBar from './_components/section-navbar'
//    params: Promise<{sectionid : string; groupid: string}>

type CourseContentPageLayoutProps = {
    children: React.ReactNode 
    params: Promise<{sectionid : string}>

}

export default async function CourseContentPageLayout ({
 children,
 params
} : CourseContentPageLayoutProps)  {
    const { sectionid } = await params;
    const client = new QueryClient()

    await client.prefetchQuery({
        queryKey: ["section-info"],
        queryFn: () => onGetSectionInfo(sectionid)
    })
  return (
    <HydrationBoundary state={dehydrate(client)}>
        <SectionNavBar sectionid={sectionid}/>
        {children}
    </HydrationBoundary>
  )
}

