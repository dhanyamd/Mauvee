'use client'
import { HtmlParser } from '@/app/globals/html-parser'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import PostAuthor from './post-author'
import Interactions from './interactions'

type Props = {
    userimage? : string 
    username? : string 
    html: string 
    channelname: string 
    title: string 
    likes: number 
    comments: number
    postid: string
    likedUser? : string
    userid? : string
    likeid? : string
    optimistic? : boolean
}

export const PostCard = ({
    userid,
    userimage,
    username,
    likes,
    html,
    channelname,
    comments,
    postid,
    title,
    likedUser,
    likeid,
    optimistic
}: Props) => {
    const pathname = usePathname()
  return (
    <Card className='border-themeGray bg-[#1A1A1D] first-letter:rounded-2xl overflow-hidden'>
   <CardContent className='p-3 flex flex-col gap-y-6 items-start'>
   <PostAuthor 
   image={userimage}
   username={username}
   channel={channelname}
   />
   <Link href={`${pathname}/${postid}`} className='w-full'>
   <div className='flex flex-col gap-y-3'>
   <h2 className='text-2xl'>{title}</h2>
   <HtmlParser html={html}/>
   </div>
   </Link>
   </CardContent>
   <Separator orientation='horizontal' className='bg-themeGray mt-3'/>
   <Interactions 
   id={postid} 
   userid={userid} 
   likes={likes}
   comments={comments}
   likedUser={likedUser}
   likeid={likeid}
    optimistic={optimistic}
   />
    </Card>
  )
}

