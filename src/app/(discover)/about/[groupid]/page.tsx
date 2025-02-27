{/**@ts-ignore */}
import { onAuthenticatedUser } from '@/app/actions/auth'
import { onGetGroupInfo } from '@/app/actions/groups'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import GroupSideWidget from '@/app/globals/group-side-widget'
import AboutGroup from '../_components/about'
//@ts-ignore
type GroupidProps = {
  groupid : string
}
export const GroupIdPage = async({ groupid } : GroupidProps) => {
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ["about-group-info"],
        queryFn: () => onGetGroupInfo(groupid)
    })

    const userid = await onAuthenticatedUser()
  return (
    <HydrationBoundary state={dehydrate(query)}>
   <div className='pt-36 pb-10 container grid grid-cols-1 lg:grid-cols-3 gap-x-10'>
   <div className='col-span-1 lg:col-span-2'>
   <AboutGroup userid={userid.id!} groupid={groupid}/>
   </div>
   <div className='col-span-1 relative'>
   <GroupSideWidget groupid={groupid} userid={userid.id}/>
   </div>
   </div>
    </HydrationBoundary>
  )
}


