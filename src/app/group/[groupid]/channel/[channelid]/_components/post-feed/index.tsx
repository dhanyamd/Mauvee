'use client'
import { useChannelPage } from '@/hooks/channels'
import React from 'react'
import {PostCard} from './post-card'
import InfiteScrollBar from '@/app/globals/infinite-scroll'
import PaginatePosts from '../paginated-posts'
type PostFeedProps = {
    channelid: string 
    userid: string
}
const PostFeed = ({channelid, userid} : PostFeedProps) => {
    const { data}  = useChannelPage(channelid)
    const { posts } = data as unknown as {
        posts : ({
            likes: {
                id: string
                userId : string
            }[]  
            channel: {
                name: string
            }
            _count: {
                likes: number 
                comments: number
            }
            author: {
                firstname: string
                lastname: string
                image: string
            }
        } & {
            id : string 
            createdAt: Date
            title: string | null 
            htmlContent: string | null 
            jsonContent: string| null 
            content: string 
            authorId: string 
            channelId: string
        })[]
    }
  return posts && posts.length > 0 ? (
    <>
    {posts.map((post) => (
        <PostCard 
        key={post.id}
        channelname={post.channel.name}
        title={post.title!}
         html={post.htmlContent!}
         username={post.author.firstname + (" ") + post.author.lastname}
         userimage={post.author.image!}
         likes={post._count.likes}
         comments={post._count.comments}
         postid={post.id}
         likedUser={post.likes.length > 0 ? post.likes[0].userId : undefined}
         userid={userid}
        likeid={post.likes.length > 0 ? post.likes[0].id : undefined}
        />
    ))}
    <InfiteScrollBar 
    action='POSTS'
    loading='POST'
    identifier={channelid}
    paginate={posts.length}
    >
        <PaginatePosts userid={userid}/>
        </InfiteScrollBar>
    </>
  ) : (
    <></>
  )
}

export default PostFeed
