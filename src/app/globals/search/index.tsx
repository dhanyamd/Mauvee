'use client'
import { Input } from '@/components/ui/input'
import { useSearch } from '@/hooks/groups'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {
className? : string,
inputstyle? : string,
placeholder? : string,
searchType : "GROUPS" | "POSTS"
iconStye? : string,
glass? : boolean
}

const Search = ({className, searchType, glass,iconStye,inputstyle,placeholder} : Props) => {
    const {onSearchQuery, query} = useSearch(searchType)
  
    return (
        <div
          className={cn(
            "border-2 flex gap-2 items-center",
            className,
            glass &&
              "bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-20",
          )}
        >
          <SearchIcon className={cn(iconStye || "text-themeTextGray")} />
          <Input
            onChange={onSearchQuery}
            value={query}
            className={cn("bg-transparent border-0", inputstyle)}
            placeholder={placeholder}
            type="text"
          />
        </div>
      )
    }

export default Search
