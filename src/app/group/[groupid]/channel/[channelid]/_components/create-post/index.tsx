'use client'
import { SimpleModal } from '@/app/globals/simple-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { useChannelPage } from '@/hooks/channels';
import React from 'react'

type Props = { userImage : string; channelid : string; username: string}

const CreateNewPost = ({userImage, channelid, username}: Props) => {
    const {data, mutation} = useChannelPage(channelid)
    const {name} = data as {name : string}
  return (
   <>
      <SimpleModal trigger={
        <span>
            <Card className='border-themeGray cursor-pointer first-letter:rounded-2xl overflow-hidden'>
             <CardContent className='p-3 bg-[#1A1A1D] flex gap-x-6 items-center'>
              <Avatar className='cursor-pointer'>
                <AvatarImage src={userImage} alt='user' />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <CardDescription className='text-themeTextGray'>
                   Type / to add elements to your post... 
              </CardDescription>
             </CardContent>
            </Card>
        </span>
      }>
         <div className='flex gap-x-3'>
        <Avatar className='cursor-pointer'>
            <AvatarImage src={userImage} alt='user'/>
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
       <p className='text-themeTextGray text-sm capitalize'>{username}</p>
       <p className='text-sm capitalize text-themeTextGray'>Posting in{" "}</p>
       <span className='font-bold capitalize text-themeTextWhite '>{name}</span>
        </div>
         </div>
      </SimpleModal>
   
   </>
  )
}

export default CreateNewPost
