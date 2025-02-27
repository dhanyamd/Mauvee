import { onAuthenticatedUser } from '@/app/actions/auth'
import { onGetGroupInfo } from '@/app/actions/groups'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import GroupSideWidget from '@/app/globals/group-side-widget'
import AboutGroup from '../_components/about'
//@ts-ignore
type GroupidProps = {
    params : {
        groupid : string
    }
}
const Page = async({ params } : GroupidProps) => {
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(params.groupid)
    })

    const userid = await onAuthenticatedUser()
  return (
    <HydrationBoundary state={dehydrate(query)}>
   <div className='pt-36 pb-10 container grid grid-cols-1 lg:grid-cols-3 gap-x-10'>
   <div className='col-span-1 lg:col-span-2'>
   <AboutGroup userid={userid.id!} groupid={params.groupid}/>
   </div>
   <div className='col-span-1 relative'>
   <GroupSideWidget groupid={params.groupid} userid={userid.id}/>
   </div>
   </div>
    </HydrationBoundary>
  )
}

export default Page
