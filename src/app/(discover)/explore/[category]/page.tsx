import { onGetExploreGroup } from "@/app/actions/groups"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import ExplorePageContent from "../_components/explore-content"

type CategoryProps = { 
    params: Promise<{ category: string; }>; 
  };

export default async function CategoryPage ({params} : CategoryProps ){
    const { category } = await params;
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ["groups"],
        queryFn: () => onGetExploreGroup(category, 0)
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
        <ExplorePageContent layout="LIST" category={category}/>
        </HydrationBoundary>
    )
}

