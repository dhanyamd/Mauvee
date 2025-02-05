import { onGetExploreGroup } from '@/app/actions/groups'
import { QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {}

const ExplorePage = async(props : Props) => {
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey : ["fitness"],
        queryFn:() => onGetExploreGroup("fitness", 0)
    })

    await query.prefetchQuery({
        queryKey : ["music"],
        queryFn:() => onGetExploreGroup("music", 0)
    })

    await query.prefetchQuery({
        queryKey : ["lifestyle"],
        queryFn:() => onGetExploreGroup("lifestyle", 0)
    })
  return (
    <div>

    </div>
  )
}

export default ExplorePage
