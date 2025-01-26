import { onAuthenticatedUser } from '@/app/actions/auth'
import { onGetChannelInfo } from '@/app/actions/channel'
import { onGetGroupInfo } from '@/app/actions/groups'
import { currentUser } from '@clerk/nextjs/server'
import { QueryClient } from '@tanstack/react-query'
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
    <div>
      
    </div>
  )
}

export default GroupChannelPage
