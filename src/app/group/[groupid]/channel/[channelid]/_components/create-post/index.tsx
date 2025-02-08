'use client'
import { useChannelPage } from '@/hooks/channels';
import React from 'react'

type Props = { userImage : string; channelid : string; username: string}

const CreateNewPost = ({userImage, channelid, username}: Props) => {
    const {data, mutation} = useChannelPage(channelid)
    const {name} = data as {name : string}
  return (
    <div>
      
    </div>
  )
}

export default CreateNewPost
