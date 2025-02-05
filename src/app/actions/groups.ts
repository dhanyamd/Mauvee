'use server'
import { CreateGroupSchema } from "@/hooks/schema"
import { client } from "@/lib/prisma"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"
import { onAuthenticatedUser } from "./auth"
import { revalidatePath } from "next/cache"
import { useQuery } from "@tanstack/react-query"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { useEffect, useLayoutEffect, useState } from "react"
import { onClearList, onInfiniteScroll } from "@/redux/slices/infinite-scroll-slice"
import { GroupStateProps } from "@/redux/slices/search-slice"

export const onGetAffiliateInfo = async(id : string) => {
    try {
      const affiliateInfo = await client.affiliate.findUnique({
        where : {
            id,
        },
        select : {
            Group : {
                select : {
                    User : {
                        select : {
                            firstname : true,
                            lastname : true,
                            image : true,
                            id : true,
                            //TODO: later comment this below
                            stripeId : true
                        }
                    }
                }
            }
        }
      })
      if(affiliateInfo){
        return {status : 200, user : affiliateInfo}
      }
      return { status : 400, }
    }catch(error){
        return {status : 400}
    }
}

export const onCreateNewGroup = async (
    userId: string,
    data: z.infer<typeof CreateGroupSchema>,
  ) => {
    try {
      const created = await client.user.update({
        where: {
          id: userId,
        },
        data: {
            group: {
              create: {
                ...data,
               
              member: {
                create: {
                  userId: userId,
                }
              },
              channel: {
                create: [
                  {
                    id: uuidv4(),
                    name: "general",
                    icon: "general",
                  },
                  {
                    id: uuidv4(),
                    name: "announcements",
                    icon: "announcement",
                  },
                ]
              }
            }
          }
        },
        select: {
          id: true,
          group: {
            select: {
              id: true,
              channel: {
                select: {
                  id: true,
                },
                take: 1,
                orderBy: {
                  createdAt: "asc",
                }
              }
            }
          }
        }
      })
  
      if (created) {
        return {
          status: 200,
          data: created,
          message: "Group created successfully",
        }
      }
    } catch (error) {
      return {
        status: 400,
        message: "Oops! group creation failed, try again later",
      }
    }
  }

  export const onGetGroupInfo = async (groupid : string) => {
    try{
      const user = await onAuthenticatedUser()
      const group = await client.group.findUnique({
        where : {
          id : groupid
        }
      })
      if(group)
        return {
           status : 200, 
           group : group,
           groupOwner : group.id == user.id ? true : false
        }
      return {status : 404}
      
    }catch(error){
        return {status : 400}
    }
  }

  export const onGetUserGroups = async(id : string) => {
    try{
     const groups = await client.user.findUnique({
      where : {
        id : id
      },
      select : {
        group : {
          select : {
             id : true,
             name : true,
             icon : true,
             channel : {
              where : {
                name : "general"
              },
              select : {
                id : true,
              }
             },
          }
        },
        membership : {
          select : {
            Group : {
             select : {
              id : true,
              name : true,
              icon : true,
              channel : {
                where : {
                  name : "general"
                },
                select : {
                  id : true,
                }
             }
            }
          }
        },
      },
    },
    })
    if (groups && (groups.group.length > 0 || groups.membership.length > 0)) {
      return {
        status: 200,
        groups: groups.group,
        members: groups.membership,
      }
    }

    return {
      status: 404,
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const onGetGroupChannels = async (groupid : string) => {
  try{
    const channels = await client.channel.findMany({
      where : {
        groupId : groupid
      },
      orderBy : {
        createdAt : 'asc'
      }
    })
    if(channels){
      return {
        status : 200,
        channels : channels
      }
    }
    return {status : 404}
  }catch(error){
    return {status : 400}
  }
}

export const onGetGroupSubscriptions = async (groupid: string) => {
  try {
    const subscriptions = await client.subscription.findMany({
      where: {
        groupId: groupid,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const count = await client.members.count({
      where: {
        groupId: groupid,
      },
    })

    if (subscriptions) {
      return { status: 200, subscriptions, count }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const onGetAllGroupMembers = async(groupid : string) => {
  try {
   const user = await onAuthenticatedUser()
   const memebers = await client.members.findMany({
    where : {
      groupId : groupid,
      NOT : {
        userId : user.id
      }
    },
    include : {
      User : true
    }
   })
   if(memebers && memebers.length > 0){
     return {
       status : 200,
       members : memebers
     }
   }
  }catch(error) {
    return { status: 400 }
  }
}

export const onSearchGroups = async (
  mode: "GROUPS" | "POSTS",
  query : string,
  paginate?: number
) => {
try{
  if(mode === "GROUPS"){
    const fetchedGroups = await client.group.findMany({
      where : {
        name : {
          contains: query,
          mode: "insensitive"
        }
      },
      take : 6,
      skip: paginate || 0,
    })
    if(fetchedGroups){
      if(fetchedGroups.length > 0){
        return {
          status : 200,
          groups : fetchedGroups
        }
      }
      return {status : 404}
    }
  }
  if(mode === "POSTS"){

  }
}catch(error){
  return {status : 400}
}
}

export const onUpDateGroupSettings = async (
  groupid : string,
  type : 
  | "IMAGE"
  | "ICON"
  | "NAME"
  | "DESCRIPTION"
  | "JSONDESCRIPTION"
  | "HTMLDESCRIPTION",
  content : string,
  path : string
) => {
  try{
   if(type === "IMAGE"){
     const updated = await client.group.update({
       where : {
         id : groupid
       },
       data : {
         thumbnail : content
       }
     })
   }
   if(type === "ICON"){
    const updated = await client.group.update({
      where : {
        id : groupid
      },
      data : {
        icon : content
      }
    })
   }
   if(type === "DESCRIPTION"){
    const updated = await client.group.update({
      where : {
        id : groupid
      },
      data : {
        description : content
      }
    })
   }
   if(type === "JSONDESCRIPTION"){
    const updated = await client.group.update({
      where : {
        id : groupid
      },
      data : {
        jsonDescription : content
      }
    })
   }
   if(type === "HTMLDESCRIPTION"){
    const updated = await client.group.update({
      where : {
        id : groupid
      },
      data : {
        htmlDescription : content
      }
    })
   }

   if(type === "NAME"){
    const updated = await client.group.update({
      where : {
        id : groupid
      },
      data : {
        name : content
      }
    })
   }
   revalidatePath(path)
   return {status : 200}

  }catch(error){
    return {status : 400}
  }
}

export const useGroupList = (query: string) => {
  const { data } = useQuery({
    queryKey: [query],
  })

  const dispatch: AppDispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(onClearList({ data: [] }))
  }, [])

  const { groups, status } = data as {
    groups: GroupStateProps[]
    status: number
  }

  return { groups, status }
}

export const onGetExploreGroup = async(category : string, paginate : number) => {
  try{
   const groups = await client.group.findMany({
    where : {
      category,
      NOT : {
        description : null,
        thumbnail : null 
      }
    },
    take : 6,
    skip : paginate 
   })
   if(groups && groups.length > 0){
    return {
      status : 200,
      groups
    }
   }

   return {status : 400, message : "No groups found in this category!"}
  }catch(error){
    return {
      status : 400,
      message : "Something went wrong!"
    }
  }
}

export const onGetPaginatedPosts = async(
  identifier: string,
  paginate: number
) => {
  try {
    const user = await onAuthenticatedUser()
    const posts = await client.post.findMany({
      where : {
        channelId : identifier
      },
      skip : paginate,
      take : 2,
       orderBy : {
        createdAt : "desc"
       },
       include : {
        channel: {
          select : {
            name : true
          }
        },
        author: {
          select : {
            firstname : true,
            lastname:true,
            image: true
          }
        },
        _count: {
          select : {
            likes : true,
            comments : true
          }
        },
        likes : {
          where : {
            userId: user.id
          },
          select : {
            userId: true,
            id : true
          }
        }
       }
    })
    if(posts && posts.length > 0){
      return {status : 200, posts}
    }
    return {status : 400, message : "OnGetPaginated posts gone wrong"}
  } catch (error) {
    return {status : 400}
  }
}

export const useExploreSlider = (query: string, paginate: number) => {
  const [onLoadSlider, setOnLoadSlider] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()
  const {data, refetch, isFetched, isFetching} = useQuery({
    queryKey : ["fetch-group-slides"],
    queryFn: () => onGetExploreGroup(query, paginate|0),
    enabled : false
  })
  if(isFetched && data?.status === 200 && data.groups){
    dispatch(onInfiniteScroll({data: data.groups}))
  }
  useEffect(() => {
    setOnLoadSlider(true)
    return () => {
      onLoadSlider
    }
  },[])

  return {refetch, isFetched, data, onLoadSlider, isFetching}
  }
