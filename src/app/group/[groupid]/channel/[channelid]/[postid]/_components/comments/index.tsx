'use client'
import { useComments, useReply } from '@/hooks/channels'
import React from 'react'
type PostCommentsProps = {
    postid: string
}
const PostComments = ({postid} : PostCommentsProps) => {
    const {data} = useComments(postid)
    const {onReply, onSetActiveComment, activeComment, onSetReply} = useReply()
    
  return (
    <div>
      
    </div>
  )
}

export default PostComments
