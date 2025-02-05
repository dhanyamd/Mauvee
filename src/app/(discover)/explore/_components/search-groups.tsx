import { Loader } from '@/components/loader'
import { GroupStateProps } from '@/redux/slices/search-slice'
import React from 'react'
import GroupCard from './group-card'
import { NoResult } from '@/app/globals/search/no-result'
import InfiteScrollBar from '@/app/globals/infinite-scroll'
import PaginatedGroups from './paginated-comp'

type Props = {
    searching : boolean
    data : GroupStateProps[]
    query? : string
}

export const SearchGroups = ({searching, data, query} : Props) => {
  return (
    <div className='container grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 mt-36'>
    <Loader loading={searching} className='lg:col-span-3 md:col-span-2' >
        {data.length > 0 ? (
            data.map((group:any) => <GroupCard key={group.id} {...group}/> )
        ) : (
        <NoResult />
        )}
        </Loader>
        {data.length > 5 && (
            <InfiteScrollBar 
            action='GROUPS'
            identifier={query as string}
            paginate={data.length}
            search
            >
                <PaginatedGroups />
                </InfiteScrollBar>
        )}
    </div>
  )
}

