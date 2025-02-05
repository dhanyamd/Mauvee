import { Message } from '@/icons/messages'
import Link from 'next/link'
import React from 'react'
import { UserAvatar } from './user'
import { Notification } from './notification'

type UserWidgetProps = {
    image : string
    groupid? : string 
    userid? : string
}

const UserWidget = ({image,groupid,userid} : UserWidgetProps) => {
  return (
    <div className='gap-5 items-center hidden md:flex'>
     <Notification />
     <Link href={`/group/${groupid}/messages`}>
    <Message/>
     </Link>
      <UserAvatar userid={userid} image={image} groupid={groupid}/>
    </div>
  )
}

export default UserWidget
