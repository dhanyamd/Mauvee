import { Empty } from "@/icons/empty"

const GroupMessagesPage = async() => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-y-3">
    <Empty />
    <p className="text-themeTextGray">No chat selected</p>
    </div>
  )
}

export default GroupMessagesPage