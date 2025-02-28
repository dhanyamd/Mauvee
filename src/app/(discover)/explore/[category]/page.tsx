import { onGetExploreGroup } from "@/app/actions/groups"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import ExplorePageContent from "../_components/explore-content"


export default async function CategoryPage ({
    params,
} : {
    params : {category : string}
}){
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ["groups"],
        queryFn: () => onGetExploreGroup(params.category, 0)
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
        <ExplorePageContent layout="LIST" category={params.category}/>
        </HydrationBoundary>
    )
}

