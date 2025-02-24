"use client"

import { useAppSelector } from "@/redux/store"
import { useChatWindow } from "@/hooks/groups/groupcreate"
import { ChatBubble } from "../ChatBubble"

type ChatWindowProps = {
    receiverid: string 
    userid: string
}
export const ChatWindow = ({receiverid, userid} : ChatWindowProps) => {
   const {messageWindowRef} = useChatWindow(receiverid)
   const {chat} = useAppSelector((state) => state.chatReducer)

   return (
    <div className="flex-1 flex py-5 flex-col gap-y-3 h-0 overflow-auto"
    ref={messageWindowRef}
    >
   {chat.map((c) => (
    <ChatBubble  key={c.id} {...c} userid={userid} />
   ))}
    </div>
   )
}