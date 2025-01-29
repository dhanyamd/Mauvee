import { onAuthenticatedUser } from '@/app/actions/auth'
import { onGetAllGroupMembers, onGetGroupChannels, onGetGroupInfo, onGetGroupSubscriptions, onGetUserGroups } from '@/app/actions/groups'
import Sidebar from '@/components/sidebar'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'
import { Navbar } from '../_components/navbar'

type Props =  {
    children: React.ReactNode,
    params : {
         groupid: string
    }
}

const GroupLayout = async({children, params} : Props) => {
    const query = new QueryClient()

    const user = await onAuthenticatedUser()
    if(!user?.id) return redirect('/sign-in')

    //group-info
   await query.prefetchQuery({
    queryKey : ["group-info"],
    queryFn : () => onGetGroupInfo(params?.groupid)
   })
  
   await query.prefetchQuery({
    queryKey : ["user-groups"],
    queryFn : () => onGetUserGroups(user?.id)
   })

   await query.prefetchQuery({
    queryKey : ["group-channels"],
    queryFn : () => onGetGroupChannels(params?.groupid)
   })

   await query.prefetchQuery({
    queryKey : ["group-subscriptions"],
    queryFn : () => onGetGroupSubscriptions(params?.groupid)
   })
 
   await query.prefetchQuery({
    queryKey : ["member-chats"],
    queryFn : () => onGetAllGroupMembers(params?.groupid)
   })

 
  return (
    <HydrationBoundary state={dehydrate(query)}> 
        <div className='flex h-screen md:pt-5'>
            <Sidebar groupid={params.groupid} userid={user.id} />
            <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
            <Navbar groupid={params.groupid} userid={user.id} />
            {children}
        </div>
        </div>
    </HydrationBoundary>
  )
}

export default GroupLayout
