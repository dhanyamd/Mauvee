import { onUpdateChannelInfo, onDeleteChannel, onGetChannelInfo, onCreateChannelPost, onLikeChannelPost, onCreateNewComment } from "@/app/actions/channel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient, useMutation, useQuery, useMutationState } from "@tanstack/react-query"
import { JSONContent } from "novel"
import { useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { CreateChannelPost } from "./schema"
import { v4 as uuidv4, v4 } from "uuid"
import { onGetCommentReplies, onGetPostComments, onGetPostInfo } from "@/app/actions/groups"
import { CreateCommentSchema } from "@/app/globals/post-comment/schema"

   
  export const useChannelInfo = () => {
    const channelRef = useRef<HTMLAnchorElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)
    const [channel, setChannel] = useState<string | undefined>(undefined)
    const [edit, setEdit] = useState<boolean>(false)
    const [icon, setIcon] = useState<string | undefined>(undefined)
    const client = useQueryClient()
  
    const onEditChannel = (id: string | undefined) => {
      setChannel(id)
      setEdit(true)
    }
  
    const onSetIcon = (icon: string | undefined) => setIcon(icon)
  
    const { isPending, mutate, variables } = useMutation({
      mutationFn: (data: { name?: string; icon?: string }) =>
        onUpdateChannelInfo(channel!, data.name, data.icon),
      onMutate: () => {
        setEdit(false)
        onSetIcon(undefined)
      },
      onSuccess: (data) => {
        return toast(data.status !== 200 ? "Error" : "Success", {
          description: data.message,
        })
      },
      onSettled: async () => {
        return await client.invalidateQueries({
          queryKey: ["group-channels"],
        })
      },
    })
    const { variables: deleteVariables, mutate: deleteMutation } = useMutation({
      mutationFn: (data: { id: string }) => onDeleteChannel(data.id),
      onSuccess: (data) => {
        return toast(data.status !== 200 ? "Error" : "Success", {
          description: data.message,
        })
      },
      onSettled: async () => {
        return await client.invalidateQueries({
          queryKey: ["group-channels"],
        })
      },
    })
  
    const onEndChannelEdit = (event: Event) => {
      if (inputRef.current && channelRef.current && triggerRef.current) {
        //checks if click is done outside the ref! if so, it will update the channel name
        if (
          !inputRef.current.contains(event.target as Node | null) &&
          !channelRef.current.contains(event.target as Node | null) &&
          !triggerRef.current.contains(event.target as Node | null) &&
          !document.getElementById("icon-list")
        ) {
          if (inputRef.current.value) {
            mutate({
              name: inputRef.current.value,
            })
          }
          if (icon) {
            mutate({ icon })
          } else {
            setEdit(false)
          }
        }
      }
    }
  
    useEffect(() => {
      document.addEventListener("click", onEndChannelEdit, false)
      return () => {
        document.removeEventListener("click", onEndChannelEdit, false)
      }
    }, [icon])
  
    const onChannelDetele = (id: string) => deleteMutation({ id })
  
    return {
      channel,
      onEditChannel,
      channelRef,
      edit,
      inputRef,
      variables,
      isPending,
      triggerRef,
      onSetIcon,
      icon,
      onChannelDetele,
      deleteVariables,
    }
  }

  export const useChannelPage = (channelid : string) => {
    const {data} = useQuery({
      queryKey: ["channel-info"],
      queryFn: () => onGetChannelInfo(channelid)
    })

    const mutation = useMutationState({
      filters: {mutationKey: ["create-post"], status: "pending"},
      select: (mutation) => {
        return {
          state: mutation.state.variables as any,
          status: mutation.state.status
        }
      }
    })
    return {data, mutation}
  }
  
  export const useCreateChannelPost = (channelid : string) => {
    const [onJsonDescription, setJsonDescription] = useState<JSONContent | undefined>(undefined)
    const [onDescription, setOnDescription] = useState<string | undefined>(undefined)
    const [onHtmlDescription, setOnHtmlDescription] = useState<string | undefined>(undefined)

    const {
      formState: {errors},
      register,
      handleSubmit,
      setValue,

    } = useForm<z.infer<typeof CreateChannelPost>>({
      resolver: zodResolver(CreateChannelPost)
    })
    const onSetDescription = () => {
      const JsonContent = JSON.stringify(onJsonDescription)
      setValue("jsoncontent", JsonContent)
      setValue("content", onDescription)
      setValue("htmlcontent", onHtmlDescription)
    }

    useEffect(() => {
      onSetDescription()
     return () => {
      onSetDescription()
     }
    },[onJsonDescription, onDescription])

    const client = useQueryClient()
    const {mutate, variables, isPending} = useMutation({
      mutationKey: ["create-post"],
      mutationFn: (data: {
        title: string 
        content: string 
        htmlContent: string 
        jsoncontent: string
        postid: string
      }) => onCreateChannelPost(channelid, data.title, data.content, data.htmlContent, data.jsoncontent,data.postid),
      onSuccess: (data) => {
        setJsonDescription(undefined)
        setOnHtmlDescription(undefined)
        setOnDescription(undefined)
        toast(data.status === 200 ? "Success" : "Error", {
          description: data.message
        })
      },
      onSettled: async() => {
        return await client.invalidateQueries({
          queryKey: ["channel-info"]
        })
      }
    })
    const onCreatePost = handleSubmit(async (values) => 
    mutate({
      title: values.title,
      content: values.content!,
      htmlContent: values.htmlcontent!,
      jsoncontent: values.jsoncontent!,
      postid: v4()
    })
    )

    return {
      onJsonDescription,
      onDescription,
      onHtmlDescription,
      setOnDescription,
      setOnHtmlDescription,
      setJsonDescription,
      register,
      onCreatePost,
     errors,
     setValue,
        
    }
  }


 export const useLikeChannelPost = (postid : string) => {
  const client = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationFn: (data: {likeid: string}) => onLikeChannelPost(postid, data.likeid),
    onSuccess: (data) => {
      toast(data.status === 200 ? "Success" : "Error", {
        description: data.message
      })
    },
    onSettled: async () => {
      await client.invalidateQueries({
        queryKey: ["unique-post"]
      })
      return await client.invalidateQueries({
        queryKey: ["channel-info"]
      })
    }
  })
  return {mutate, isPending}
 }

 export const useGetPost = (postid: string) => {
  const {data} = useQuery({
    queryKey: ["unique-post"],
    queryFn: () => onGetPostInfo(postid)
  })
  return {data}
 }
 
 export const usePostComment = (postid: string) => {
  const {
    formState: {errors},
    register,
    handleSubmit,
    setValue,
    reset
  } = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema)
  })
  const client = useQueryClient()

  const {mutate, variables, isPending} = useMutation({
    mutationFn: (data: {content: string; commentid: string}) => 
      onCreateNewComment(postid, data.content, data.commentid),
    onMutate: () => reset(),
    onSuccess: (data) => 
      toast(data?.status === 200 ? "Success" : "Error", {
        description: data?.message
      }),
      onSettled: async () => {
        return await client.invalidateQueries({
          queryKey: ["post-comments"]
        })
      }
  })
const onCreateComment = handleSubmit(async (values) => 
  mutate({
    content: values.comment,
    commentid: uuidv4()
  })
)
return {register, errors, isPending, onCreateComment, variables}
 }

 export const useComments = (postid: string) => {
  const {data} = useQuery({
    queryKey: ["post-comments"],
    queryFn: () => onGetPostComments(postid)
  })
  return {data}
 }

 export const useReply = () => {
  const [onReply, setOnReply] = useState<{
    comment?: string 
    reply: boolean
  }>({comment: undefined, reply: false})

  const [activeComment, setActiveComment] = useState<string | undefined>(undefined)
  const onSetReply = (commentid: string) => 
    setOnReply((prev) => ({...prev, comment: commentid, reply: true}))

  const onSetActiveComment = (id: string) => setActiveComment(id)
  return {onReply, onSetReply, onSetActiveComment, activeComment}
 }

 export const useGetReplies = (commentid: string) => {
  const {isFetching, data} = useQuery({
    queryKey: ["comment-replies", commentid],
    queryFn: () => onGetCommentReplies(commentid),
    enabled: Boolean(commentid)
  })
  return {isFetching, data}
 }