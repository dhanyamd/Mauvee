import LeaderBoard from '@/app/(discover)/_components/leaderboard'
import { onAuthenticatedUser } from '@/app/actions/auth'
import { onGetChannelInfo } from '@/app/actions/channel'
import { onGetGroupInfo } from '@/app/actions/groups'
import { currentUser } from '@clerk/nextjs/server'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
    params : {channelid : string, groupid: string}
 }

const GroupChannelPage = async({params } : Props) => {
const client = new QueryClient()
const user = await currentUser()
const authUser = await onAuthenticatedUser()

await client.prefetchQuery({
    queryKey : ["channel-info"],
    queryFn : () => onGetChannelInfo(params?.channelid)
})

await client.prefetchQuery({
    queryKey : ["about-group-info"],
    queryFn : () => onGetGroupInfo(params?.groupid)
})
  return (
   <HydrationBoundary state={dehydrate(client)}>
   <div className='grid lg:grid-cols-4 grid-cols-1 w-full flex-1 h-0 gap-x-5 px-5'>
<div className='col-span-1 lg:inline relative hidden py-5'>
<LeaderBoard light/>
</div>
   </div>
   </HydrationBoundary>
  )
}

export default GroupChannelPage
