import { onAuthenticatedUser } from '@/app/actions/auth'
import { onGetAllGroupMembers, onGetGroupChannels, onGetGroupInfo, onGetGroupSubscriptions, onGetUserGroups } from '@/app/actions/groups'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'

type Props =  {
    children: React.ReactNode,
    params : {
         groupid: string
    }
}

const GroupLayout = async({children, params} : Props) => {
    const query = new QueryClient()

    const user = await onAuthenticatedUser()
    if(!user.id) return redirect('/sign-in')

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
        <div className='flex h-screen md:pt-5'></div>
    </HydrationBoundary>
  )
}

export default GroupLayout
