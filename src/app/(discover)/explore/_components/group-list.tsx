
import InfiteScrollBar from "@/app/globals/infinite-scroll"
import GroupCard from "./group-card"
import PaginatedGroups from "./paginated-comp"
import { NoResult } from "@/app/globals/search/no-result"
import { useGroupList } from "@/hooks/groups"

type Props = {
  category: string
}

const GroupList = ({ category }: Props) => {
  const { groups, status } = useGroupList("groups")

  return (
    <div className="container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
      {status === 200 ? (
        groups.map((group : any) => <GroupCard key={group.id} {...group} />)
      ) : (
        <NoResult />
      )}
      {groups && groups.length > 5 && (
        <InfiteScrollBar
          action="GROUPS"
          identifier={category}
          paginate={groups.length}
        >
          <PaginatedGroups />
        </InfiteScrollBar>
      )}
    </div>
  )
}

export default GroupList