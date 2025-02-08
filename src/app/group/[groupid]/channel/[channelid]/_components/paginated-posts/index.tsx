'use client'
import { useAppSelector } from '@/redux/store'
import React from 'react'
import {PostCard} from '../post-feed/post-card'
type Props = {
    userid: string
}
const PaginatePosts = ({userid} : Props) => {
    const {data} = useAppSelector((state) => state.infiniteScrollReducer)
  return data.map((data: any) => (
    <PostCard 
    key={data.id}
    {...data}
    html={data.htmlContent}
    likedUser={data.likes.length > 0 ? data.likes[0].userId : undefined}
    likeid={data.likes.length > 0? data.likes[0].id : undefined}
    channelname={data.channel.name!}
    username={data.author.firstname + data.author.lastname}
    userimage={data.author.image!}
    likes={data._count.likes}
    comments={data._count.comments}
    postid={data.id}
    userid={userid}
    />
  ))
}

export default PaginatePosts
