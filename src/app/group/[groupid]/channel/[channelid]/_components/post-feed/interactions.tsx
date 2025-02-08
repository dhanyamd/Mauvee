'use client'
import { Like } from '@/icons/like'
import { Unlike } from '@/icons/unlike'
import { cn } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'
import { v4 as uuidv4 } from "uuid"
import React from 'react'
import { useLikeChannelPost } from '@/hooks/channels'

type InteractionProps = {
    id : string 
    optimistic? : boolean 
    userid? : string 
    likedUser? : string
    likes: number 
    comments: number
    likeid? : string
    page?: boolean
}

const Interactions = ({
    id,
  comments, 
  likes, 
  likedUser,
  likeid, 
  optimistic,
  page,
  userid
} : InteractionProps) => {
    const {mutate, isPending} = useLikeChannelPost(id)
  return (
    <div className={cn("flex items-center justify-between py-2", page ? "" : "px-6")}>
      <div className='flex gap-5 text-[#757272] text-sm'>
      <span className='flex gap-1 justify-center items-center'>
        {optimistic ? (
            <Unlike />
        ) : isPending ? (
            <span className='cursor-pointer'>
                {userid === likedUser ? <Unlike /> : <Like />} 
                </span>
        ) : likedUser === userid ?(
            <span onClick={() => mutate({likeid: likeid!})}
            className='cursor-pointer'
            >
                <Like/>
                </span>
        ) : (
            <span onClick={() => mutate({likeid: uuidv4()})} className='cursor-pointer'>
                
                </span>
        )}
        {isPending ? likedUser === userid ? likes-1 : likes+1 : likes}
      </span>
      <span className='flex gap-1 justify-center items-center'>
      <MessageCircle size={16}/>
      {comments}
      </span>
      </div>
    </div>
  )
}

export default Interactions
